<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  http_response_code(400);
  echo json_encode(["error" => "Brak danych wejściowych"]);
  exit;
}

$plik = "dane.json";
$istniejace = [];

if (file_exists($plik)) {
  $zawartosc = file_get_contents($plik);
  $istniejace = json_decode($zawartosc, true);
}

$istniejace[] = $data;

file_put_contents($plik, json_encode($istniejace, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(["status" => "ok"]);
