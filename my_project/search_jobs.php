<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password
$dbname = "job";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$keyword = $_GET['keyword'] ?? '';
$location = $_GET['location'] ?? '';
$type = $_GET['type'] ?? '';

$sql = "SELECT * FROM jobs WHERE 1=1";

if ($keyword) {
  $sql .= " AND (title LIKE '%$keyword%' OR description LIKE '%$keyword%')";
}

if ($location) {
  $sql .= " AND location LIKE '%$location%'";
}

if ($type) {
  $sql .= " AND type='$type'";
}

$result = $conn->query($sql);

$jobs = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $jobs[] = $row;
  }
}

header('Content-Type: application/json');
echo json_encode($jobs);

$conn->close();
?>
