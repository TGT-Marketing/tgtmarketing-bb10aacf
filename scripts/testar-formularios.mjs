// Teste dos formulários como um visitante real: abre o site no navegador, preenche e envia.
// Cada teste manda um lead marcado "TESTE TGT" para contato@tgtmarketing.com.br.
import { chromium } from "playwright";

const SITE = "https://www.tgtmarketing.com.br";
const quando = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
const nota = (m) => console.log(`::notice::${m.replace(/\s+/g, " ").slice(0, 900)}`);
const limpo = (t) => t.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
let falhou = false;

// Usa o Google Chrome que já vem instalado no servidor do GitHub (mais rápido e igual ao de um visitante)
const navegador = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());

async function abrir(largura) {
  const ctx = await navegador.newContext({ viewport: { width: largura, height: 900 }, locale: "pt-BR" });
  const pagina = await ctx.newPage();
  const errosJs = [];
  pagina.on("pageerror", (e) => errosJs.push(e.message));
  pagina.on("console", (m) => m.type() === "error" && errosJs.push(m.text()));
  return { pagina, errosJs };
}

async function siteprincipal(largura) {
  const { pagina, errosJs } = await abrir(largura);
  try {
    await pagina.goto(SITE + "/", { waitUntil: "networkidle", timeout: 60000 });
    await pagina.getByRole("button", { name: /Agendar diagnóstico gratuito/i }).first().click();
    const d = pagina.getByRole("dialog");
    await d.waitFor({ timeout: 20000 });
    await d.locator("#nome").fill(`TESTE TGT navegador ${largura}px (site principal)`);
    await d.locator("#email").fill("contato@tgtmarketing.com.br");
    await d.locator("#empresa").fill("Teste do formulário");
    await d.locator("#whatsapp").fill("19992795271");
    await d.getByRole("combobox").click();
    await pagina.getByRole("option", { name: "Até R$ 10 mil" }).click();
    await d.locator('label[for="Gerar mais leads"]').click();
    await d.locator("#consentimento").click();
    const resposta = pagina.waitForResponse((r) => r.url().includes("enviar-contato.php"), { timeout: 60000 });
    await d.getByRole("button", { name: /Agendar agora/i }).click();
    const r = await resposta;
    const corpo = limpo(await r.text());
    await pagina.waitForTimeout(3500);
    const avisos = limpo((await pagina.locator("[role=status], li[data-state=open], ol li").allInnerTexts().catch(() => [])).join(" | "));
    const ok = pagina.url().includes("/obrigado");
    if (!ok) falhou = true;
    nota(`Site principal (${largura}px): ${ok ? "OK, foi para /obrigado" : "FALHOU"} | HTTP ${r.status()} | resposta: ${corpo} | aviso na tela: ${avisos || "nenhum"} | erros JS: ${errosJs.slice(0, 3).join(" ; ") || "nenhum"}`);
  } catch (e) {
    falhou = true;
    nota(`Site principal (${largura}px): ERRO NO TESTE ${e.message} | erros JS: ${errosJs.slice(0, 3).join(" ; ") || "nenhum"}`);
  }
  await pagina.screenshot({ path: `principal-${largura}.png` }).catch(() => {});
}

async function marcas(largura) {
  const { pagina, errosJs } = await abrir(largura);
  try {
    await pagina.goto(SITE + "/marcas/", { waitUntil: "networkidle", timeout: 60000 });
    const f = pagina.locator("#diagnostico form").first();
    await f.scrollIntoViewIfNeeded();
    await f.getByPlaceholder("Seu nome completo").fill(`TESTE TGT navegador ${largura}px (branding)`);
    await f.getByPlaceholder("Seu melhor e-mail").fill("contato@tgtmarketing.com.br");
    await f.getByPlaceholder("WhatsApp com DDD").fill("(19) 99279-5271");
    await f.getByPlaceholder("Nome da empresa / marca").fill("Teste do formulário");
    await f.getByLabel("Segmento de atuação").selectOption("servicos");
    await f.getByLabel("Estágio da marca").selectOption("reposicionar");
    await f.getByLabel("Principal objetivo").selectOption("posicionamento");
    await f.getByLabel("Investimento previsto").selectOption("avaliar");
    await f.locator("textarea").fill(`Teste automático em ${quando} (pode apagar)`);
    const resposta = pagina.waitForResponse((r) => r.url().includes("enviar-diagnostico.php"), { timeout: 60000 });
    await f.getByRole("button", { name: /Receber diagnóstico gratuito/i }).click();
    const r = await resposta;
    const corpo = limpo(await r.text());
    await pagina.waitForTimeout(2500);
    const sucesso = await pagina.getByText("Recebemos seu pedido de diagnóstico!").first().isVisible().catch(() => false);
    const alerta = limpo((await pagina.locator("#diagnostico [role=alert]").allInnerTexts().catch(() => [])).join(" | "));
    if (!sucesso) falhou = true;
    nota(`/marcas (${largura}px): ${sucesso ? "OK, mostrou a confirmação" : "FALHOU"} | HTTP ${r.status()} | resposta: ${corpo} | alerta na tela: ${alerta || "nenhum"} | erros JS: ${errosJs.slice(0, 3).join(" ; ") || "nenhum"}`);
  } catch (e) {
    falhou = true;
    nota(`/marcas (${largura}px): ERRO NO TESTE ${e.message} | erros JS: ${errosJs.slice(0, 3).join(" ; ") || "nenhum"}`);
  }
  await pagina.screenshot({ path: `marcas-${largura}.png` }).catch(() => {});
}

async function midias(largura) {
  const caminho = process.env.MIDIAS_PATH || "/gestaodemidias/";
  const { pagina, errosJs } = await abrir(largura);
  try {
    await pagina.goto(SITE + caminho, { waitUntil: "networkidle", timeout: 60000 });
    const f = pagina.locator("#contato form").first();
    await f.scrollIntoViewIfNeeded();
    await f.getByPlaceholder("Seu nome").fill(`TESTE TGT navegador ${largura}px (gestão de mídias)`);
    await f.getByPlaceholder("WhatsApp com DDD").fill("(19) 99279-5271");
    await f.getByPlaceholder("Seu melhor e-mail").fill("contato@tgtmarketing.com.br");
    await f.getByPlaceholder("Empresa ou @ do Instagram").fill("Teste do formulário");
    await f.getByLabel("Objetivo principal").selectOption("Gerar leads e orçamentos");
    await f.locator("textarea").fill(`Teste automático em ${quando} (pode apagar)`);
    const resposta = pagina.waitForResponse((r) => r.url().includes("enviar-lead.php"), { timeout: 60000 });
    await f.getByRole("button", { name: /Quero meu diagnóstico/i }).click();
    const r = await resposta;
    const corpo = limpo(await r.text());
    await pagina.waitForTimeout(2500);
    const sucesso = await pagina.getByText("Recebemos seu pedido!").first().isVisible().catch(() => false);
    if (!sucesso) falhou = true;
    nota(`Gestão de mídias ${caminho} (${largura}px): ${sucesso ? "OK, mostrou a confirmação" : "FALHOU"} | HTTP ${r.status()} | resposta: ${corpo} | erros JS: ${errosJs.slice(0, 3).join(" ; ") || "nenhum"}`);
  } catch (e) {
    falhou = true;
    nota(`Gestão de mídias (${largura}px): ERRO NO TESTE ${e.message} | erros JS: ${errosJs.slice(0, 3).join(" ; ") || "nenhum"}`);
  }
  await pagina.screenshot({ path: `midias-${largura}.png` }).catch(() => {});
}

nota(`IP deste teste: ${await (await fetch("https://api.ipify.org")).text().catch(() => "?")}`);
// Quais formulários testar: "principal,marcas,midias" (padrão: todos)
const testar = (process.env.TESTAR || "principal,marcas,midias").split(",").map((t) => t.trim());
if (testar.includes("principal")) await siteprincipal(1366);
if (testar.includes("marcas")) await marcas(1366);
if (testar.includes("midias")) await midias(1366);
await navegador.close();
process.exit(falhou ? 1 : 0);
