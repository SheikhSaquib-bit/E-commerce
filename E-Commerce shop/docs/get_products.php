<?php
header('Content-Type: application/json');
require_once 'config.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'price' => floatval($row['price']),
            'description' => $row['description'],
            'image' => $row['image_url'],
            'stock' => $row['stock']
        );
    }
}

echo json_encode($products);
$conn->close();
?> 