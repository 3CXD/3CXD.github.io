<?php

if (isset($_GET['game'])) {
    $game = $_GET['game'];
    $gameEncoded = urlencode($game);

    $urlGetScores = "http://primosoft.com.mx/games/api/getscores.php?game=$gameEncoded&orderAsc=1";

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $urlGetScores,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 30
    ]);

    $responseContent = curl_exec($ch);
    curl_close($ch);

    $scores = json_decode($responseContent, true);

    if (isset($scores['data']) && is_array($scores['data'])) {
        echo "<h1>Puntajes para el juego: " . htmlspecialchars($game) . "</h1>";
        echo "<table border='1'>";
        echo "<tr><th>Jugador</th><th>Puntaje (segundos)</th></tr>";
        foreach ($scores['data'] as $score) {
            $timeInSeconds = $score['score'] / 1000; // Convertir milisegundos a segundos
            echo "<tr><td>" . htmlspecialchars($score['player']) . "</td><td>" . htmlspecialchars($timeInSeconds) . "</td></tr>";
        }
        echo "</table>";
    } else {
        echo "No se encontraron puntajes para el juego: " . htmlspecialchars($game);
    }
} else {
    echo "Juego no especificado.";
}
