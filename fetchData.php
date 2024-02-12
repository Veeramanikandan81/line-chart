<?php
header("content-type: application/json");

try {
    $conn = mysqli_connect("localhost", "root", "", "data");

    if (!$conn) {
        throw new Exception("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM mw";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        throw new Exception("Query failed: " . mysqli_error($conn));
    }

    $data = array();
    foreach ($result as $row) {
        $data[] = $row;
    }

    echo json_encode($data);

    mysqli_close($conn);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
