<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once('../../db/config.php');
include_once('../../model/students.php');
include_once('../../utils/jwt_utils.php');

$database = new Database();
$connect = $database->connect();

$bearer_token = get_bearer_token();

#echo $bearer_token;

$is_jwt_valid = is_jwt_valid($bearer_token);

if ($is_jwt_valid) {
    $students = new Students($connect);

    // $data = json_decode(file_get_contents("php://input"), true); 

    $students->id = $_REQUEST['id']; //dung param

    if (!empty($students->id)) {
        // $students->id = $data->id;
        if ($students->delete()) {
            http_response_code(200);
            echo json_encode(array("message" => "Deleted"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to delete"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete, incomplete."));
    }
} else {
    echo json_encode(array('error' => 'Access denied'));
}
