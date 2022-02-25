<?php
    class Students 
    {
        //DB stuff
        private $conn;
        private $table = 'students';

        //student properties
        private $id;
        private $profile_code;
        private $student_code;
        private $first_name;
        private $last_name;
        private $gender;
        private $date_of_birth;
        private $place_of_birth;
        private $race;
        private $religion;
        private $phone;
        private $email;
        private $personal_email;
        private $address;
        private $identity_number;
        private $student_status;
        private $note;

        public function __construct($db)
        {
            $this->conn = $db;
        }

        public function read()
        {
            $query = "SELECT * FROM students.students ORDER BY students.id ASC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        
    }

            // $query = 'SELECT s.id, s.profile_code, s.student_code, s.firstname, s.lastname, s.gender, s.date_of_birth, s.place_of_birth,
            //                 s.race, s.religion, s.phone, s.email, s.personal_email, s.address, s.identity_number, s.student_code, s.note
            //                 FROM `student-management-system`.' . $this->table . ' s; ';

            // //prepare and bind
            // $stmt = $this->conn->prepare($query);
            // $stmt->bind_param("i", $this->id);

            // //execute query
            // $stmt->execute();

            // $result  = $stmt->get_result(); //get mysql result
            // $row = $result->fetch_assoc(); // fetch data   

            // // Set properties
            // $this->id = $row['id'];
            // $this->profile_code = $row['profile_code'];
            // $this->student_code = $row['student_code'];
            // $this->first_name = $row['firstname'];
            // $this->last_name = $row['lastname'];
            // $this->gender = $row['gender'];
            // $this->date_of_birth = $row['date_of_birth'];
            // $this->place_of_birth = $row['place_of_birth'];
            // $this->race = $row['race'];
            // $this->religion = $row['religion'];
            // $this->phone = $row['phone'];
            // $this->email = $row['email'];
            // $this->personal_email = $row['personal_email'];
            // $this->address = $row['address'];
            // $this->identity_number = $row['identity_number'];
            // $this->student_code = $row['student_code'];
            // $this->note = $row['note'];

?>

