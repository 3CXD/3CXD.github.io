<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $player = $_POST['player'];
    $score = intval($_POST['score']); // Convertimos a entero
    $game = $_POST['game'];

    $apiUrl = "http://primosoft.com.mx/games/api/addscore.php";

    $postData = http_build_query([
        'player' => $player,
        'score' => $score,
        'game' => $game
    ]);

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded",
            'method'  => 'POST',
            'content' => $postData
        ]
    ];

    $context  = stream_context_create($options);
    $response = file_get_contents($apiUrl, false, $context);

    if ($response === FALSE) {
        echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar el puntaje.']);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Puntaje guardado exitosamente.']);
    }
}
