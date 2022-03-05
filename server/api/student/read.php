<?php
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once('../../db/config.php');
include_once('../../model/students.php');
include_once('../../utils/jwt_utils.php');

$database = new Database();
$connect = $database->connect();

$bearer_token = get_bearer_token();

$is_jwt_valid = is_jwt_valid($bearer_token);

if ($is_jwt_valid) {
    $students = new Students($connect);

    $students->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : '0';

    $result = $students->read();

    if ($result->num_rows > 0) {
        $students_array = array();
        $students_array["students"] = array();
        while ($students = $result->fetch_assoc()) {
            extract($students);
            $students_item = array(
                'id' => $id,
                'profile_code' => $profile_code,
                'student_code' => $student_code,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'gender' => $gender,
                'date_of_birth' => $date_of_birth,
                'place_of_birth' => $place_of_birth,
                'race' => $race,
                'religion' => $religion,
                'phone' => $phone,
                'email' => $email,
                'personal_email' => $personal_email,
                'address' => $address,
                'identity_number' => $identity_number,
                'student_status' => $student_status,
                'note' => $note,
            );
            array_push($students_array["students"], $students_item);
        }
        http_response_code(200);
        echo json_encode($students_array);
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "No item found.")
        );
    }
} else {
    echo json_encode(array('error' => 'Access denied'));
}
