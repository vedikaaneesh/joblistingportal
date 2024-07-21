<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    $response = array('success' => false, 'error' => "Connection failed: " . $conn->connect_error);
    echo json_encode($response);
    exit();
}

// Fetch data from job_applications table
$sql = "SELECT * FROM job_applications";
$result = $conn->query($sql);

$applications = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
}

// Close connection
$conn->close();

// Send response back to the client
echo json_encode(array('success' => true, 'data' => $applications));
?>
