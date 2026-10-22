<?php
// Diagnóstico temporário do envio de e-mail (será removido na próxima publicação)
header('Content-Type: application/json; charset=UTF-8');
$tmp = sys_get_temp_dir();
echo json_encode(array(
  'php' => PHP_VERSION,
  'sapi' => php_sapi_name(),
  'mbstring' => extension_loaded('mbstring'),
  'mb_substr' => function_exists('mb_substr'),
  'mail' => function_exists('mail'),
  'disable_functions' => ini_get('disable_functions'),
  'sendmail_path' => ini_get('sendmail_path'),
  'display_errors' => ini_get('display_errors'),
  'error_reporting' => error_reporting(),
  'open_basedir' => ini_get('open_basedir'),
  'temp_dir' => $tmp,
  'temp_existe' => @is_dir($tmp),
  'temp_gravavel' => @is_writable($tmp),
  'dir_script_gravavel' => @is_writable(__DIR__),
  'upload_tmp_dir' => ini_get('upload_tmp_dir'),
  'session_save_path' => ini_get('session.save_path'),
  'json' => function_exists('json_encode'),
  'filter' => function_exists('filter_var'),
), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
