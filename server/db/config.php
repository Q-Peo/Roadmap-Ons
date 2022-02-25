<?php
    class Database 
    {
        private $server_name = "localhost";
        private $username = "root";
        private $password = "123456";
        private $db_name = "students";
        private $conn;

        public function connect()
        {
            $this->conn = null;

            // tao connection
            $this->conn = new mysqli($this->server_name, $this->username, $this->password, $this->db_name);

            // kiem tra connection
            if ($this->conn->connect_error) {
                die("Connected thất bại: " . $this->conn->connect_error);
            }
            echo "Connected thành công";

            return $this->conn;
        }
    
    }