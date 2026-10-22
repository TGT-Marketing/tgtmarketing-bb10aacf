<?php
// Formulários da landing www.tgtmarketing.com.br/sites
// Envia cada lead para contato@tgtmarketing.com.br e uma confirmação para quem preencheu.
// Requisito da Locaweb (Linux): From e Return-Path com e-mail do domínio e parâmetro -r no mail().

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

const EMAIL_DESTINO   = 'contato@tgtmarketing.com.br';
const EMAIL_REMETENTE = 'contato@tgtmarketing.com.br';
const NOME_REMETENTE  = 'TGT Marketing';
const WHATSAPP_TGT    = '5519992795271';

function responder($status, $dados) {
    http_response_code($status);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function limpar($valor, $max, $multilinha = false) {
    $valor = is_string($valor) ? trim($valor) : '';
    if (!$multilinha) {
        $valor = str_replace(array("\r", "\n", "%0a", "%0d"), ' ', $valor);
    }
    return mb_substr($valor, 0, $max, 'UTF-8');
}

function h($valor) {
    return nl2br(htmlspecialchars($valor, ENT_QUOTES, 'UTF-8'));
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
$trava = sys_get_temp_dir() . '/tgt_sites_' . md5($ip);
if (file_exists($trava) && (time() - filemtime($trava)) < 20) {
    responder(429, array('error' => 'Aguarde alguns segundos antes de enviar novamente.'));
}

$campo = function ($nome, $max, $multilinha = false) use ($dados) {
    return limpar(isset($dados[$nome]) ? $dados[$nome] : '', $max, $multilinha);
};

$tipo      = $campo('tipo', 20) === 'rapido' ? 'rapido' : 'briefing';
$nome      = $campo('nome', 100);
$email     = $campo('email', 150);
$whatsapp  = $campo('whatsapp', 30);
$empresa   = $campo('empresa', 100);
$projeto   = $campo('projeto', 60);
$nicho     = $campo('nicho', 100);
$orcamento = $campo('orcamento', 60);
$prazo     = $campo('prazo', 60);
$mensagem  = $campo('mensagem', 1000, true);

if ($nome === '' || $email === '' || $whatsapp === '') {
    responder(400, array('error' => 'Preencha nome, e-mail e WhatsApp.'));
}
if ($tipo === 'rapido' && $mensagem === '') {
    responder(400, array('error' => 'Escreva como podemos ajudar.'));
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

$primeiroNome  = explode(' ', $nome)[0];
$mensagemWhats = rawurlencode("Olá {$primeiroNome}, tudo bem? Aqui é da TGT Marketing. Recebi sua solicitação pelo nosso site e quero entender melhor o seu projeto.");
$linkLead = "https://wa.me/{$whatsDigitos}?text={$mensagemWhats}";
$linkTgt  = 'https://wa.me/' . WHATSAPP_TGT;

$linha = function ($rotulo, $valor) {
    if ($valor === '') {
        return '';
    }
    return '<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;white-space:nowrap;">' . $rotulo . '</td>'
         . '<td style="padding:8px;border:1px solid #ddd;">' . $valor . '</td></tr>';
};

$origem = $tipo === 'rapido'
    ? 'Landing /sites: mensagem rápida (fim da página)'
    : 'Landing /sites: pedido de proposta (formulário principal)';

$htmlAdmin = '<h2 style="font-family:sans-serif;">' . ($tipo === 'rapido' ? 'Nova mensagem rápida' : 'Novo pedido de proposta') . '</h2>'
    . '<table style="border-collapse:collapse;width:100%;max-width:640px;font-family:sans-serif;font-size:14px;">'
    . $linha('Nome', h($nome))
    . $linha('E-mail', h($email))
    . $linha('WhatsApp', '<a href="' . htmlspecialchars($linkLead, ENT_QUOTES, 'UTF-8') . '">' . h($whatsapp) . '</a>')
    . $linha('Empresa / segmento', h($empresa))
    . $linha('Tipo de projeto', h($projeto))
    . $linha('Nicho', h($nicho))
    . $linha('Investimento', h($orcamento))
    . $linha('Prazo', h($prazo))
    . $linha('Mensagem', h($mensagem))
    . $linha('Origem', h($origem))
    . '</table>'
    . '<p style="font-family:sans-serif;font-size:12px;color:#777;">Responda este e-mail para falar direto com o lead, ou clique no WhatsApp dele acima.</p>';

$htmlLead = '<div style="font-family:sans-serif;color:#333;line-height:1.6;max-width:600px;">'
    . '<h2 style="color:#df1a1a;">Recebemos sua solicitação, ' . h($primeiroNome) . '!</h2>'
    . '<p>Obrigado pelo interesse em criar seu site com a <strong>TGT Marketing</strong>.</p>'
    . '<p>Nossa equipe já recebeu seus dados e entra em contato em até 24h úteis.</p>'
    . '<p>Se preferir adiantar, fale com a gente agora mesmo no WhatsApp:</p>'
    . '<div style="margin:30px 0;"><a href="' . $linkTgt . '" style="background-color:#25D366;color:white;padding:15px 25px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">Falar no WhatsApp agora</a></div>'
    . '<hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />'
    . '<p style="font-size:12px;color:#777;">TGT Marketing &amp; Comunicação<br />Americana - SP</p>'
    . '</div>';

$assuntoAdmin = $tipo === 'rapido' ? "Mensagem Rápida: {$nome}" : "NOVO LEAD PREMIUM: {$nome}";
$okAdmin = enviar(EMAIL_DESTINO, $assuntoAdmin, $htmlAdmin, $email);

if (!$okAdmin) {
    responder(500, array('error' => 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.'));
}

@touch($trava);
enviar($email, 'Recebemos sua solicitação - TGT Marketing', $htmlLead);

responder(200, array('success' => true));
