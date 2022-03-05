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

            $this->conn = mysqli_connect($this->server_name, $this->username, $this->password, $this->db_name);

            if (!$this->conn) {
                die("Connected thất bại: " . $this->conn);
            }
            return $this->conn;
        }
    
    }