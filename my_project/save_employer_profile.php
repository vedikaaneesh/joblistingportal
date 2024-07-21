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
$company_name = $data['company_name'] ?? '';
$contact = $data['contact'] ?? '';
$description = $data['description'] ?? '';
$website = $data['website'] ?? '';

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO employer_profiles (company_name, contact, description, website) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $company_name, $contact, $description, $website);

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
