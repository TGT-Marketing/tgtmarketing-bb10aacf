<?php
// Formulário de diagnóstico da TGT Marketing.
// Envia o lead para contato@tgtmarketing.com.br e uma confirmação para quem preencheu.
// Requisito da Locaweb (Linux): From e Return-Path com e-mail do domínio e parâmetro -r no mail().

header('Content-Type: application/json; charset=UTF-8');

const EMAIL_DESTINO   = 'contato@tgtmarketing.com.br';
const EMAIL_REMETENTE = 'contato@tgtmarketing.com.br';
const NOME_REMETENTE  = 'TGT Marketing';
const WHATSAPP_TGT    = '5519992795271';

function responder($status, $dados) {
    http_response_code($status);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function limpar($valor, $max) {
    $valor = is_string($valor) ? trim($valor) : '';
    $valor = str_replace(array("\r", "\n", "%0a", "%0d"), ' ', $valor);
    return mb_substr($valor, 0, $max, 'UTF-8');
}

function h($valor) {
    return htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
}

function assunto($texto) {
    return '=?UTF-8?B?' . base64_encode($texto) . '?=';
}

function enviar($para, $assuntoTexto, $html, $replyTo = '') {
    $headers  = "MIME-Version: 1.1\n";
    $headers .= "Content-type: text/html; charset=UTF-8\n";
    $headers .= "From: " . assunto(NOME_REMETENTE) . " <" . EMAIL_REMETENTE . ">\n";
    $headers .= "Return-Path: " . EMAIL_REMETENTE . "\n";
    if ($replyTo !== '') {
        $headers .= "Reply-To: " . $replyTo . "\n";
    }
    return mail($para, assunto($assuntoTexto), $html, $headers, '-r' . EMAIL_REMETENTE);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, array('error' => 'Método não permitido.'));
}

$dados = json_decode(file_get_contents('php://input'), true);
if (!is_array($dados)) {
    $dados = $_POST;
}

// Anti-spam: campo escondido que só robôs preenchem
if (!empty($dados['website'])) {
    responder(200, array('success' => true));
}

// Anti-spam: no máximo 1 envio a cada 20 segundos por IP
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'desconhecido';
$trava = sys_get_temp_dir() . '/tgt_form_' . md5($ip);
if (file_exists($trava) && (time() - filemtime($trava)) < 20) {
    responder(429, array('error' => 'Aguarde alguns segundos antes de enviar novamente.'));
}

$nome        = limpar(isset($dados['nome']) ? $dados['nome'] : '', 120);
$empresa     = limpar(isset($dados['empresa']) ? $dados['empresa'] : '', 160);
$email       = limpar(isset($dados['email']) ? $dados['email'] : '', 160);
$whatsapp    = limpar(isset($dados['whatsapp']) ? $dados['whatsapp'] : '', 40);
$faturamento = limpar(isset($dados['faturamento']) ? $dados['faturamento'] : '', 120);
$objetivo    = limpar(isset($dados['objetivo']) ? $dados['objetivo'] : '', 300);

if ($nome === '' || $empresa === '' || $email === '' || $whatsapp === '' || $faturamento === '' || $objetivo === '') {
    responder(400, array('error' => 'Todos os campos são obrigatórios.'));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(400, array('error' => 'E-mail inválido.'));
}

$whatsDigitos = preg_replace('/\D/', '', $whatsapp);
if (strlen($whatsDigitos) < 8 || strlen($whatsDigitos) > 15) {
    responder(400, array('error' => 'Número de WhatsApp inválido.'));
}
if ((strlen($whatsDigitos) === 10 || strlen($whatsDigitos) === 11) && strpos($whatsDigitos, '55') !== 0) {
    $whatsDigitos = '55' . $whatsDigitos;
}

$primeiroNome = explode(' ', $nome)[0];
$mensagemWhats = rawurlencode("Olá {$nome}, tudo bem? Sou da TGT Marketing. Recebi sua solicitação de diagnóstico para a {$empresa} e gostaria de agendar nossa conversa.");
$linkLead = "https://wa.me/{$whatsDigitos}?text={$mensagemWhats}";
$linkTgt  = 'https://wa.me/' . WHATSAPP_TGT;

$linha = function ($rotulo, $valor) {
    return '<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">' . $rotulo . '</td>'
         . '<td style="padding:8px;border:1px solid #ddd;">' . $valor . '</td></tr>';
};

$htmlAdmin = '<h2>Novo pedido de diagnóstico gratuito</h2>'
    . '<table style="border-collapse:collapse;width:100%;max-width:600px;">'
    . $linha('Nome completo', h($nome))
    . $linha('Empresa', h($empresa))
    . $linha('E-mail', h($email))
    . $linha('WhatsApp', '<a href="' . h($linkLead) . '">' . h($whatsapp) . '</a>')
    . $linha('Faturamento', h($faturamento))
    . $linha('Objetivo', h($objetivo))
    . '</table>'
    . '<p style="font-size:12px;color:#777;">Responda este e-mail para falar direto com o lead.</p>';

$htmlLead = '<div style="font-family:sans-serif;color:#333;line-height:1.6;max-width:600px;">'
    . '<h2 style="color:#df1a1a;">Recebemos sua solicitação, ' . h($primeiroNome) . '!</h2>'
    . '<p>Obrigado pelo seu interesse em realizar um diagnóstico com a <strong>TGT Marketing</strong>.</p>'
    . '<p>Nossa equipe já foi notificada e em breve entraremos em contato para agendar nossa conversa estratégica.</p>'
    . '<p>Para agilizar o processo, você pode nos chamar agora mesmo no WhatsApp clicando no botão abaixo:</p>'
    . '<div style="margin:30px 0;"><a href="' . h($linkTgt) . '" style="background-color:#25D366;color:white;padding:15px 25px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">Falar no WhatsApp agora</a></div>'
    . '<hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />'
    . '<p style="font-size:12px;color:#777;">TGT Marketing &amp; Comunicação<br />Americana - SP</p>'
    . '</div>';

$okAdmin = enviar(EMAIL_DESTINO, "Novo diagnóstico - {$nome} | {$empresa}", $htmlAdmin, $email);

if (!$okAdmin) {
    responder(500, array('error' => 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.'));
}

@touch($trava);
enviar($email, 'Recebemos sua solicitação de diagnóstico - TGT Marketing', $htmlLead);

responder(200, array('success' => true));
