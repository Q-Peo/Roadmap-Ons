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
    $response = array();
    // if ($_GET["page"] && $_GET["row_per_page"]) {
    if ($_GET["page"]) {
        $page = htmlspecialchars($_GET["page"]);
        // $row_per_page = $_GET["row_per_page"];
        // số sinh viên hiển thị trên 1 page
        $row_per_page = 4;

        $begin = ($page * $row_per_page) - $row_per_page;

        $sql = "SELECT * FROM `student-management-system`.students LIMIT {$begin}, {$row_per_page}";

        $table_data = mysqli_query($connect, $sql);

        // get tong so sinh vien
        $query = "SELECT * FROM `student-management-system`.students";
        $count = mysqli_query($connect, $query);

        $countRows = $count->num_rows;

        // get tong so page
        $countPages = ceil($countRows / $row_per_page);

        $data = array();
        while ($row = $table_data->fetch_assoc()) {
            $data[] = $row;
        }

        if (count($data) > 0) {
            $response["countRows"] = $countRows;
            $response["countPages"] = $countPages;
            $response["status"] = 200;
            $response["students"] = $data;
        } else {
            $response["msg"] = "data loi";
            $response["status"] = 400;
        }
    }
    echo json_encode($response);
} else {
    echo json_encode(array('error' => 'Access denied'));
}
