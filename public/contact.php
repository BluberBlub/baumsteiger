<?php
header('Content-Type: application/json');

// Allow CORS if needed, or stick to same-origin
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Keine Daten empfangen']);
    exit;
}

$name = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($data['phone'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Bitte alle Pflichtfelder ausfüllen.']);
    exit;
}

// Recipient Email - CHANGE THIS TO THE CLIENT'S EMAIL
$to = 'info@baumsteiger-allgaeu.de'; 
$subject = "Neue Anfrage von $name (Webseite)";

$email_content = "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Telefon: $phone\n\n";
$email_content .= "Nachricht:\n$message\n";

$headers = "From: noreply@baumsteiger-allgaeu.de\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Ihre Nachricht wurde erfolgreich gesendet!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Fehler beim Senden der Email.']);
}
?>
