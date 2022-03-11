<?php
include_once('../../db/config.php');
include_once('../../utils/jwt_utils.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$database = new Database();
$connect = $database->connect();

$bearer_token = get_bearer_token();

$is_jwt_valid = is_jwt_valid($bearer_token);

if ($is_jwt_valid) {
    $fullname = (isset($_GET['fullname']) && $_GET['fullname']) ? htmlspecialchars(strip_tags($_GET['fullname']))  : '';
    $profile_code = (isset($_GET['profile_code']) && $_GET['profile_code']) ? htmlspecialchars(strip_tags($_GET['profile_code'])) : '';
    $student_code = (isset($_GET['student_code']) && $_GET['student_code']) ? htmlspecialchars(strip_tags($_GET['student_code'])) : '';

    $query = "SELECT * from `student-management-system`.students  
                WHERE ( CONCAT(firstname, ' ',lastname)  LIKE '%{$fullname}%')
                AND profile_code LIKE '%{$profile_code}%'
                AND student_code LIKE '%{$student_code}%'";

    $result = mysqli_query($connect, $query);

    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    $response =  array();

    if ($result->num_rows > 0) {
        $response['status'] = 200;
        $response['rows'] = count($data);
        $response['students'] = $data;
    } else {
        $response['status'] = 400;
        $response['rows'] = count($data);
        $response['msg'] = "No result!";
    }

    echo json_encode($response);
} else {
    echo json_encode(array('error' => 'Access denied'));
}
