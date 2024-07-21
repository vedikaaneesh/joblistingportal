<?php
// apply_for_job.php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

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
    error_log("Connection failed: " . $conn->connect_error);
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata, true);

    // Validate inputs
    if (!isset($request['job_id'], $request['job_seeker_id'], $request['cover_letter'])) {
        echo json_encode(["message" => "Incomplete data received"]);
        exit;
    }

    // Sanitize input (consider using prepared statements for better security)
    $job_id = $conn->real_escape_string(trim($request['job_id']));
    $job_seeker_id = $conn->real_escape_string(trim($request['job_seeker_id']));
    $cover_letter = $conn->real_escape_string(trim($request['cover_letter']));

    // Insert into job_applications table
    $sql = "INSERT INTO job_applications (job_id, job_seeker_id, application_date, cover_letter)
            VALUES ('$job_id', '$job_seeker_id', NOW(), '$cover_letter')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Application submitted successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $sql . " " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "No data received"]);
}

$conn->close();
?>
