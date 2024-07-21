<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Receive and process POST data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Decode JSON data
    $request = json_decode($postdata, true);

    // Sanitize and escape inputs
    $company_name = $conn->real_escape_string(trim($request['companyName']));
    $contact = $conn->real_escape_string(trim($request['contact']));
    $description = $conn->real_escape_string(trim($request['description']));
    $website = $conn->real_escape_string(trim($request['website']));

    // Prepare SQL statement
    $sql = "INSERT INTO employer_profiles (company_name, contact, description, website) VALUES ('$company_name', '$contact', '$description', '$website')";

    // Execute SQL query
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
