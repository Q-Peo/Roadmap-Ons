<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
   
    include_once('../../db/config.php');
    include_once('../../model/students.php');

    $db = new Database();
    $connect = $db->connect();

    $students = new Students($connect);
    
    //truy vấn vào students
    $read = $students->read();

    //dem so dong
    $rowCount = $read->num_rows;
    echo $rowCount;

    if($rowCount > 0) {
        $students_array = array();
        //$students_array['data'] = [];

        while($row = mysqli_fetch_assoc($read)) {
            extract($row);
            $students_array[] = $row; 
            $students_item = array(
                'id' => $id,
                'profile_code' => $profile_code,
                'student_code' => $student_code,
                'first_name' => $first_name,
                'last_name' => $last_name,
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
                'student_code' => $student_code,
                'note' => $note,
            );
            array_push($students_array['data'], $students_item);
        }

        echo json_encode($students_array);
    } else {
        //khong co du lieu
        echo json_encode(
            array('message' => 'No student found')
        );
    }

?>