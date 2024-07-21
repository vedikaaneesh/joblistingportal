<?php
// Set headers for debugging and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? '';
$title = $data['title'] ?? '';
$company = $data['company'] ?? '';
$location = $data['location'] ?? '';
$type = $data['type'] ?? '';
$description = $data['description'] ?? '';

// Prepare and bind
$stmt = $conn->prepare("UPDATE jobs SET title=?, company=?, location=?, type=?, description=? WHERE id=?");
$stmt->bind_param("sssssi", $title, $company, $location, $type, $description, $id);

// Execute the query
if ($stmt->execute()) {
    $response = array('success' => true);
} else {
    $response = array('success' => false, 'error' => $stmt->error);
}

// Close connections
$stmt->close();
$conn->close();

// Send response back to the client
echo json_encode($response);
?>
