<?php
// Diagnóstico temporário: o servidor consegue falar com o SMTP da Locaweb? (sem senha, sem enviar e-mail)
// Será removido na próxima publicação.
header('Content-Type: application/json; charset=UTF-8');
@set_time_limit(80);
$saida = array();

$funcoes = array('stream_socket_client', 'fsockopen', 'stream_socket_enable_crypto', 'dns_get_record', 'getmxrr', 'set_time_limit', 'curl_init');
foreach ($funcoes as $f) {
  $saida['fn_' . $f] = function_exists($f);
}
$saida['openssl'] = extension_loaded('openssl');
$saida['max_execution_time'] = ini_get('max_execution_time');
$saida['allow_url_fopen'] = ini_get('allow_url_fopen');
$df = ini_get('disable_functions');
$saida['disable_functions_fim'] = substr($df, 600);

$mx = function_exists('dns_get_record') ? @dns_get_record('tgtmarketing.com.br', DNS_MX) : false;
$saida['mx'] = $mx ? implode(', ', array_map(function ($r) {
  return $r['target'] . ' (' . $r['pri'] . ')';
}, $mx)) : 'falhou';

$alvos = array(
  'ssl://email-ssl.com.br:465',
  'tcp://email-ssl.com.br:587',
  'tcp://smtplw.com.br:587',
);
foreach ($alvos as $alvo) {
  $inicio = microtime(true);
  $ctx = stream_context_create(array('ssl' => array('verify_peer' => true, 'verify_peer_name' => true)));
  $s = @stream_socket_client($alvo, $errno, $errstr, 7, STREAM_CLIENT_CONNECT, $ctx);
  if (!$s) {
    $saida[$alvo] = 'falhou: ' . $errno . ' ' . $errstr . ' (' . round((microtime(true) - $inicio) * 1000) . 'ms)';
    continue;
  }
  stream_set_timeout($s, 7);
  $banner = trim((string) fgets($s, 512));
  fwrite($s, "EHLO www.tgtmarketing.com.br\r\n");
  $ehlo = array();
  while (($linha = fgets($s, 512)) !== false) {
    $ehlo[] = trim($linha);
    if (strlen($linha) > 3 && $linha[3] === ' ') {
      break;
    }
  }
  $tls = '';
  if (strpos($alvo, 'tcp://') === 0) {
    fwrite($s, "STARTTLS\r\n");
    $resp = trim((string) fgets($s, 512));
    $tls = 'STARTTLS: ' . $resp;
    if (strpos($resp, '220') === 0) {
      $ok = @stream_socket_enable_crypto($s, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
      $tls .= ' / cripto: ' . ($ok ? 'ok' : 'falhou');
    }
  }
  @fwrite($s, "QUIT\r\n");
  fclose($s);
  $saida[$alvo] = round((microtime(true) - $inicio) * 1000) . 'ms | ' . $banner . ' | ' . implode(' ; ', $ehlo) . ($tls ? ' | ' . $tls : '');
}

echo json_encode($saida, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
