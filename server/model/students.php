<?php
    class Students 
    {
        //DB stuff
        private $conn;
        private $table = 'students';

        //student properties
        public $id;
        public $profile_code;
        public $student_code;
        public $firstname;
        public $lastname;
        public $gender;
        public $date_of_birth;
        public $place_of_birth;
        public $race;
        public $religion;
        public $phone;
        public $email;
        public $personal_email;
        public $address;
        public $identity_number;
        public $student_status;
        public $note;

        public function __construct($db)
        {
            $this->conn = $db;
        }

        public function read()
        {
            if ($this->id) {
                $stmt = $this->conn->prepare("SELECT * FROM `student-management-system`." . $this->table . " WHERE id = ?");
                $stmt->bind_param("i", $this->id);
            } else{
                // $stmt = $this->conn->prepare("SELECT * FROM students." . $this->table . " ORDER BY id LIMIT 0, 5");
                $stmt = $this->conn->prepare("SELECT * FROM `student-management-system`." . $this->table . "");
            }
            $stmt->execute();
            $result = $stmt->get_result();
            return $result;
        }

        public function create()
        {
            $stmt = $this->conn->prepare("
            INSERT INTO `student-management-system`." . $this->table . "
                (
                `profile_code`,
                `student_code`,
                `firstname`,
                `lastname`,
                `gender`,
                `date_of_birth`,
                `place_of_birth`,
                `race`,
                `religion`,
                `phone`,
                `email`,
                `personal_email`,
                `address`,
                `identity_number`,
                `student_status`,
                `note`)
                VALUES
                (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

            $this->profile_code = htmlspecialchars(strip_tags($this->profile_code));
            $this->student_code = htmlspecialchars(strip_tags($this->student_code));
            $this->firstname = htmlspecialchars(strip_tags($this->firstname));
            $this->lastname = htmlspecialchars(strip_tags($this->lastname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->date_of_birth = htmlspecialchars(strip_tags($this->date_of_birth));
            $this->place_of_birth = htmlspecialchars(strip_tags($this->place_of_birth));
            $this->race = htmlspecialchars(strip_tags($this->race));
            $this->religion = htmlspecialchars(strip_tags($this->religion));
            $this->phone = htmlspecialchars(strip_tags($this->phone));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->personal_email = htmlspecialchars(strip_tags($this->personal_email));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->identity_number = htmlspecialchars(strip_tags($this->identity_number));
            $this->student_status = htmlspecialchars(strip_tags($this->student_status));
            $this->note = htmlspecialchars(strip_tags($this->note));

            $stmt->bind_param(
                "ssssssssssssssis",
                $this->profile_code,
                $this->student_code,
                $this->firstname,
                $this->lastname,
                $this->gender,
                $this->date_of_birth,
                $this->place_of_birth,
                $this->race,
                $this->religion,
                $this->phone,
                $this->email,
                $this->personal_email,
                $this->address,
                $this->identity_number,
                $this->student_status,
                $this->note
            );

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

        public function update()
        {
            $stmt = $this->conn->prepare("
                    UPDATE `student-management-system`." . $this->table . "
                    SET profile_code= ?, student_code = ?, firstname = ?, lastname = ?, gender = ?,
                    date_of_birth = ?, place_of_birth = ?, race = ?, religion = ?, phone = ?, email = ?, 
                    personal_email = ?, address = ?, identity_number = ?, student_status = ?, note = ? 
                    WHERE id = ?");

            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->profile_code = htmlspecialchars(strip_tags($this->profile_code));
            $this->student_code = htmlspecialchars(strip_tags($this->student_code));
            $this->firstname = htmlspecialchars(strip_tags($this->firstname));
            $this->lastname = htmlspecialchars(strip_tags($this->lastname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->date_of_birth = htmlspecialchars(strip_tags($this->date_of_birth));
            $this->place_of_birth = htmlspecialchars(strip_tags($this->place_of_birth));
            $this->race = htmlspecialchars(strip_tags($this->race));
            $this->religion = htmlspecialchars(strip_tags($this->religion));
            $this->phone = htmlspecialchars(strip_tags($this->phone));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->personal_email = htmlspecialchars(strip_tags($this->personal_email));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->identity_number = htmlspecialchars(strip_tags($this->identity_number));
            $this->student_status = htmlspecialchars(strip_tags($this->student_status));
            $this->note = htmlspecialchars(strip_tags($this->note));

            $stmt->bind_param(
                "ssssssssssssssisi",
                $this->profile_code,
                $this->student_code,
                $this->firstname,
                $this->lastname,
                $this->gender,
                $this->date_of_birth,
                $this->place_of_birth,
                $this->race,
                $this->religion,
                $this->phone,
                $this->email,
                $this->personal_email,
                $this->address,
                $this->identity_number,
                $this->student_status,
                $this->note,
                $this->id
            );

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }

        public function delete()
        {
            $stmt = $this->conn->prepare("
                    DELETE FROM `student-management-system`." . $this->table . " WHERE id = ?");

            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bind_param("i", $this->id);

            if ($stmt->execute()) {
                return true;
            }

            return false;
        }
    }

?>

