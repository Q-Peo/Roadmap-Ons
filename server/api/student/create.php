<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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

    //$data = json_decode(file_get_contents("php://input"), true);

    // $students->id = (isset($_POST['id']) && $_POST['id']) ? $_POST['id'] : '0';

    if (
        !empty($_POST['profile_code']) && !empty($_POST['student_code']) &&
        !empty($_POST['firstname']) && !empty($_POST['lastname']) &&
        !empty($_POST['gender']) && !empty($_POST['date_of_birth']) &&
        !empty($_POST['place_of_birth']) && !empty($_POST['email'])
    ) {

        $students->profile_code = $_POST['profile_code'];
        $students->student_code = $_POST['student_code'];
        $students->firstname = $_POST['firstname'];
        $students->lastname = $_POST['lastname'];
        $students->date_of_birth = $_POST['date_of_birth'];
        $students->gender = $_POST['gender'];
        $students->place_of_birth = $_POST['place_of_birth'];
        $students->race = $_POST['race'];
        $students->religion = $_POST['religion'];
        $students->phone = $_POST['phone'];
        $students->email = $_POST['email'];
        $students->personal_email = $_POST['personal_email'];
        $students->address = $_POST['address'];
        $students->identity_number = $_POST['identity_number'];
        $students->student_status = $_POST['student_status'];
        $students->note = $_POST['note'];

        if ($students->create()) {
            http_response_code(201);
            echo json_encode(array("message" => "Created"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create, incomplete"));
    }
} else {
    echo json_encode(array('error' => 'Access denied'));
}
