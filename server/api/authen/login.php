<?php
include_once('../../db/config.php');
include_once('../../utils/jwt_utils.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$email = "";
$pass = "";

if($_SERVER['REQUEST_METHOD'] === "POST")
{
    $database = new Database();
    $connect = $database->connect();

    //$data = json_decode(file_get_contents("php://input"),true);

    $email = $_POST['email'];
    $password = $_POST['pass'];
    
    // $result = new Login($connect);
    // $re = $result->checkLogin($email, $password);

    $sql = "SELECT * FROM students.users WHERE email = '" . $email . "' AND password = '" . mysqli_real_escape_string($connect, $password) . "' LIMIT 1";

    $result = mysqli_query($connect, $sql);

    if ($result->num_rows < 1) {
        http_response_code(404);
        echo json_encode(array('error' => 'Invalid User'));
    } else {
        $row = $result->fetch_assoc();

        $name = $row['name'];

        $headers = array('alg' => 'HS256', 'typ' => 'JWT');
        $payload = array('name' => $name, 'exp' => (time() + 3600), 'iat' => time());

        $jwt = generate_jwt($headers, $payload);

        http_response_code(200);
        echo json_encode(array('token' => $jwt));
    }
}
    


// include_once('../../db/db.php');
// include_once('../../utils/jwt_utils.php');

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // get posted data
//     $data = json_decode(file_get_contents("php://input", true));

//     $sql = "SELECT * FROM students.users WHERE email = '" . mysqli_real_escape_string($dbConn, $data->email) . "' AND password = '" . mysqli_real_escape_string($dbConn, $data->password) . "' LIMIT 1";

//     $result = dbQuery($sql);

//     if (dbNumRows($result) < 1) {
//         echo json_encode(array('error' => 'Invalid User'));
//     } else {
//         $row = dbFetchAssoc($result);

//         $name = $row['name'];

//         $headers = array('alg' => 'HS256', 'typ' => 'JWT');
//         $payload = array('name' => $name, 'exp' => (time() + 120));

//         $jwt = generate_jwt($headers, $payload);

//         echo json_encode(array('token' => $jwt));
//     }
// }
