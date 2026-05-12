import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let { nome, empresa, email, whatsapp, faturamento, objetivo } = await req.json();

    // Normalize WhatsApp (remove all non-digits)
    const whatsappNormalized = whatsapp.replace(/\D/g, "");
    
    // Server-side validation for WhatsApp
    if (whatsappNormalized.length < 8 || whatsappNormalized.length > 15) {
      return new Response(
        JSON.stringify({ error: "Número de WhatsApp inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Add 55 prefix if it's a Brazilian number (10 or 11 digits) and doesn't have it
    let whatsappWithCountry = whatsappNormalized;
    if ((whatsappNormalized.length === 10 || whatsappNormalized.length === 11) && !whatsappNormalized.startsWith("55")) {
      whatsappWithCountry = "55" + whatsappNormalized;
    }
    
    const message = encodeURIComponent(`Olá ${nome}, tudo bem? Sou da TGT Marketing. Recebi sua solicitação de diagnóstico para a ${empresa} e gostaria de agendar nossa conversa.`);
    const whatsappLink = `https://wa.me/${whatsappWithCountry}?text=${message}`;

    // Validate inputs
    if (!nome || !empresa || !email || !whatsapp || !faturamento || !objetivo) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const emailHtmlAdmin = `
      <h2>Novo pedido de diagnóstico gratuito</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Nome completo</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(nome)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Empresa</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(empresa)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-mail</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">WhatsApp</td><td style="padding:8px;border:1px solid #ddd;"><a href="${whatsappLink}">${escapeHtml(whatsapp)}</a></td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Faturamento</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(faturamento)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Objetivo</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(objetivo)}</td></tr>
      </table>
    `;

    const emailHtmlUser = `
      <div style="font-family: sans-serif; color: #333; line-height: 1.6; max-width: 600px;">
        <h2 style="color: #df1a1a;">Recebemos sua solicitação, ${escapeHtml(nome.split(' ')[0])}!</h2>
        <p>Obrigado pelo seu interesse em realizar um diagnóstico com a <strong>TGT Marketing</strong>.</p>
        <p>Nossa equipe já foi notificada e em breve entraremos em contato para agendar nossa conversa estratégica.</p>
        <p>Para agilizar o processo, você pode nos chamar agora mesmo no WhatsApp clicando no botão abaixo:</p>
        <div style="margin: 30px 0;">
          <a href="${whatsappLink}" style="background-color: #25D366; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Falar no WhatsApp agora
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 12px; color: #777;">TGT Marketing & Comunicação<br />Americana - SP</p>
      </div>
    `;

    // Send email to Admin
    const resAdmin = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TGT Marketing <onboarding@resend.dev>",
        to: ["contato@tgtmarketing.com.br"],
        subject: `Novo diagnóstico - ${nome} | ${empresa}`,
        html: emailHtmlAdmin,
      }),
    });

    // Send confirmation email to User
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TGT Marketing <onboarding@resend.dev>",
        to: [email],
        subject: `Recebemos sua solicitação de diagnóstico - TGT Marketing`,
        html: emailHtmlUser,
      }),
    });

    const data = await resAdmin.json();

    if (!resAdmin.ok) {
      throw new Error(`Resend API error [${resAdmin.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
