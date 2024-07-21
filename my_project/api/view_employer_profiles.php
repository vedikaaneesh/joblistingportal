<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch employer profiles
$sql = "SELECT id, company_name, contact, description, website FROM employer_profiles";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $profiles = array();
    while ($row = $result->fetch_assoc()) {
        $profiles[] = $row;
    }
    echo json_encode($profiles);
} else {
    echo json_encode([]); // Return an empty array if no profiles found
}

$conn->close();
?>
