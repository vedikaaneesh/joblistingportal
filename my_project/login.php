<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Get the posted data.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Validate input
if (!isset($request->username) || !isset($request->password) || !isset($request->user_type)) {
    echo json_encode(['success' => false, 'message' => 'Please provide username, password, and user type']);
    exit;
}

$username = $request->username;
$password = $request->password;
$user_type = $request->user_type;

// Database connection.
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "job";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Check login credentials.
$sql = "SELECT * FROM login WHERE username = ? AND password = ? AND user_type = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $password, $user_type);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid username, password, or user type']);
}

$stmt->close();
$conn->close();
?>
