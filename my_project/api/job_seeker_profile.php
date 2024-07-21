<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

header("Content-Type: application/json; charset=UTF-8");

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata, true);

    // Log received data
    file_put_contents('php://stdout', print_r($request, true));

    // Sanitize input
    $name = $conn->real_escape_string(trim($request['name']));
    $contact = $conn->real_escape_string(trim($request['contact']));
    $resume = $conn->real_escape_string(trim($request['resume']));
    $skills = $conn->real_escape_string(trim($request['skills']));
    $experience = $conn->real_escape_string(trim($request['experience']));

    $sql = "INSERT INTO job_seeker_profiles (name, contact, resume, skills, experience) VALUES ('$name', '$contact', '$resume', '$skills', '$experience')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Profile saved successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $sql . " " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "No data received"]);
}

$conn->close();
?>
