<?php
// Formulário de diagnóstico da TGT Marketing.
// Envia o lead para contato@tgtmarketing.com.br e uma confirmação para quem preencheu.
// O envio usa SMTP autenticado da Locaweb (a função mail() do PHP é desativada na hospedagem).

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

// ---- Envio por SMTP autenticado ----
// A hospedagem da Locaweb desativa a função mail() do PHP, então o e-mail sai pela caixa postal
// da TGT (Email Locaweb: email-ssl.com.br, porta 465, SSL). Usuário e senha ficam no arquivo
// tgt-smtp-config.php, gerado na publicação a partir dos "secrets" do GitHub, fora da public_html.

function tgt_smtp_config() {
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }
    $cfg = false;
    $dir = __DIR__;
    for ($i = 0; $i < 5; $i++) {
        $arquivo = $dir . '/tgt-smtp-config.php';
        if (@is_file($arquivo)) {
            $lido = include $arquivo;
            if (is_array($lido) && !empty($lido['usuario']) && !empty($lido['senha'])) {
                $cfg = $lido;
            }
            break;
        }
        $pai = dirname($dir);
        if ($pai === $dir) {
            break;
        }
        $dir = $pai;
    }
    return $cfg;
}

// Lê a resposta do servidor e confere o código esperado (o rótulo evita expor dados no erro)
function tgt_smtp_cmd($conexao, $comando, $esperados, $rotulo) {
    if ($comando !== null) {
        fwrite($conexao, $comando . "\r\n");
    }
    $resposta = '';
    while (($linha = fgets($conexao, 1024)) !== false) {
        $resposta .= $linha;
        if (strlen($linha) < 4 || $linha[3] === ' ') {
            break;
        }
    }
    if (!in_array((int) substr($resposta, 0, 3), (array) $esperados, true)) {
        throw new Exception('SMTP ' . $rotulo . ': ' . trim(preg_replace('/\s+/', ' ', $resposta)));
    }
    return $resposta;
}

// Abre uma única conexão autenticada por requisição (lead + confirmação usam a mesma)
function tgt_smtp_conexao() {
    static $conexao = null;
    if ($conexao !== null) {
        return $conexao;
    }
    $cfg = tgt_smtp_config();
    if (!$cfg) {
        throw new Exception('configuração do SMTP não encontrada');
    }
    $host  = !empty($cfg['host']) ? $cfg['host'] : 'email-ssl.com.br';
    $porta = !empty($cfg['porta']) ? (int) $cfg['porta'] : 465;
    $ctx = stream_context_create(array('ssl' => array('verify_peer' => true, 'verify_peer_name' => true)));
    $con = @stream_socket_client('ssl://' . $host . ':' . $porta, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$con) {
        throw new Exception('conexão com ' . $host . ':' . $porta . ' falhou (' . $errno . ' ' . $errstr . ')');
    }
    stream_set_timeout($con, 20);
    tgt_smtp_cmd($con, null, 220, 'conexão');
    tgt_smtp_cmd($con, 'EHLO www.tgtmarketing.com.br', 250, 'EHLO');
    tgt_smtp_cmd($con, 'AUTH LOGIN', 334, 'AUTH');
    tgt_smtp_cmd($con, base64_encode($cfg['usuario']), 334, 'usuário');
    tgt_smtp_cmd($con, base64_encode($cfg['senha']), 235, 'login');
    register_shutdown_function(function () use ($con) {
        @fwrite($con, "QUIT\r\n");
        @fclose($con);
    });
    $conexao = $con;
    return $conexao;
}

function enviar($para, $assuntoTexto, $html, $replyTo = '') {
    try {
        $con = tgt_smtp_conexao();
        $cfg = tgt_smtp_config();
        // A Locaweb exige que o remetente seja a mesma caixa postal que fez o login
        $remetente = $cfg['usuario'];
        tgt_smtp_cmd($con, 'RSET', 250, 'RSET');
        tgt_smtp_cmd($con, 'MAIL FROM:<' . $remetente . '>', 250, 'remetente');
        tgt_smtp_cmd($con, 'RCPT TO:<' . $para . '>', array(250, 251), 'destinatário');
        tgt_smtp_cmd($con, 'DATA', 354, 'DATA');
        $cabecalhos = array(
            'Date: ' . date('r'),
            'From: ' . assunto(NOME_REMETENTE) . ' <' . $remetente . '>',
            'To: <' . $para . '>',
            'Subject: ' . assunto($assuntoTexto),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@tgtmarketing.com.br>',
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        );
        if ($replyTo !== '') {
            $cabecalhos[] = 'Reply-To: <' . $replyTo . '>';
        }
        // Corpo em base64: nenhuma linha começa com ponto, então a mensagem chega íntegra
        $mensagem = implode("\r\n", $cabecalhos) . "\r\n\r\n"
            . rtrim(chunk_split(base64_encode($html), 76, "\r\n")) . "\r\n.";
        tgt_smtp_cmd($con, $mensagem, 250, 'envio');
        return true;
    } catch (Exception $e) {
        error_log('[TGT formulário] ' . $e->getMessage());
        return false;
    }
}

// Conferência automática feita na publicação: testa o login no SMTP sem enviar e-mail.
// Só responde com detalhes para quem tem a senha (token HMAC do dia).
function verificar_smtp_se_pedido() {
    if (!isset($_SERVER['HTTP_X_TGT_VERIFICAR'])) {
        return;
    }
    $cfg = tgt_smtp_config();
    if (!$cfg) {
        responder(503, array('error' => 'Configuração do SMTP não encontrada.'));
    }
    $token = hash_hmac('sha256', gmdate('Y-m-d'), $cfg['senha']);
    if (!hash_equals($token, (string) $_SERVER['HTTP_X_TGT_VERIFICAR'])) {
        responder(403, array('error' => 'Token inválido.'));
    }
    try {
        tgt_smtp_conexao();
        responder(200, array('success' => true, 'smtp' => 'login ok', 'usuario' => $cfg['usuario']));
    } catch (Exception $e) {
        responder(502, array('error' => $e->getMessage()));
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, array('error' => 'Método não permitido.'));
}

verificar_smtp_se_pedido();

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
