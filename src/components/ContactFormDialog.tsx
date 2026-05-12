import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const faturamentoOptions = [
  "Ainda não faturo, estou começando",
  "Até R$ 10 mil",
  "De R$ 10 mil a R$ 30 mil",
  "De R$ 80 mil a R$ 150 mil",
  "De R$ 150 mil a R$ 300 mil",
  "De R$ 300 mil a R$ 600 mil",
  "De R$ 600 mil a R$ 1 milhão",
  "Acima de R$ 1 milhão",
];

const objetivoOptions = [
  "Gerar mais leads",
  "Aumentar vendas",
  "Fortalecer marca",
  "Lançar produto/serviço",
  "Escalar negócio",
];

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    whatsapp: "",
    faturamento: "",
    objetivo: "",
    outroObjetivo: "",
    consentimento: false,
    website: "", // Honeypot field
  });
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam: Honeypot check
    if (form.website) {
      console.warn("Spam detected via honeypot.");
      onOpenChange(false);
      return;
    }

    // Anti-spam: Rate limiting (min 5 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      toast({ 
        title: "Calma aí! 🛑", 
        description: "Você está enviando solicitações muito rápido. Aguarde alguns segundos para tentar novamente.", 
        variant: "destructive" 
      });
      return;
    }

    if (!form.nome || !form.empresa || !form.email || !form.whatsapp || !form.faturamento || !form.objetivo) {
      toast({ 
        title: "Campos obrigatórios 📋", 
        description: "Para um diagnóstico preciso, precisamos que todos os campos marcados com * sejam preenchidos.", 
        variant: "destructive" 
      });
      return;
    }

    if (!form.consentimento) {
      toast({ 
        title: "Política de Privacidade 🛡️", 
        description: "Precisamos do seu aceite nos termos para processar seu diagnóstico com segurança.", 
        variant: "destructive" 
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({ title: "E-mail inválido", description: "Por favor, insira um e-mail válido.", variant: "destructive" });
      return;
    }

    const whatsappDigits = form.whatsapp.replace(/\D/g, "");
    const ddd = parseInt(whatsappDigits.slice(0, 2));
    const isValidDDD = ddd >= 11 && ddd <= 99;
    const isMobile = whatsappDigits.length === 11 && whatsappDigits[2] === "9";
    const isLandline = whatsappDigits.length === 10;
    const isInternational = whatsappDigits.length >= 8 && whatsappDigits.length <= 15;

    if (!isInternational) {
      toast({ 
        title: "Número inválido", 
        description: "Por favor, insira um número de contato válido.", 
        variant: "destructive" 
      });
      return;
    }

    // Fallback/Warning for Brazilian numbers that don't match strict rules
    if (whatsappDigits.startsWith("55") === false && (whatsappDigits.length === 10 || whatsappDigits.length === 11)) {
      if (!isValidDDD || (!isMobile && !isLandline)) {
        console.warn("Número brasileiro detectado com formato possivelmente inválido, mas permitindo envio.");
      }
    }

    setLoading(true);
    try {
      setLastSubmitTime(Date.now());
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: form.nome,
          empresa: form.empresa,
          email: form.email,
          whatsapp: form.whatsapp,
          faturamento: form.faturamento,
          objetivo: form.objetivo === "Outro" ? form.outroObjetivo : form.objetivo,
        },
      });

      if (error) throw error;

      toast({ 
        title: "Solicitação recebida com sucesso! 🎉", 
        description: "Em instantes você será redirecionado para a página de confirmação." 
      });
      
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "form_submission",
          form_name: "contato_diagnostico",
          faturamento: form.faturamento,
          objetivo: form.objetivo
        });
      }

      if (typeof window.gtag === "function") {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-XXXXXXXXX/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'BRL'
        });
      }

      setForm({ nome: "", empresa: "", email: "", whatsapp: "", faturamento: "", objetivo: "", outroObjetivo: "", consentimento: false, website: "" });
      onOpenChange(false);
      navigate("/obrigado");
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente ou fale conosco pelo WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[95vh] overflow-y-auto bg-primary border-accent/20 mx-3 sm:mx-auto rounded-xl sm:rounded-[2.5rem] p-4 sm:p-8" data-lenis-prevent>
        <DialogHeader className="mb-4 sm:mb-6">
          <DialogTitle className="text-2xl sm:text-4xl font-black text-primary-foreground leading-tight">
            Agendar Diagnóstico <span className="text-gradient">Gratuito.</span>
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/60 text-sm sm:text-base mt-2">
            Preencha os campos abaixo e escolha um horário para conversarmos sobre o crescimento do seu negócio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <div className="hidden" aria-hidden="true">
            <Input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-primary-foreground/80 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">Nome completo *</Label>
              <Input
                id="nome"
                placeholder="Ex: João Silva"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent/50 transition-all h-12 sm:h-14 rounded-xl sm:rounded-2xl"
                required
                minLength={3}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground/80 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">E-mail corporativo *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: joao@empresa.com.br"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent/50 transition-all h-12 sm:h-14 rounded-xl sm:rounded-2xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="empresa" className="text-primary-foreground/80 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">Nome da empresa *</Label>
              <Input
                id="empresa"
                placeholder="Ex: Minha Empresa Ltda"
                value={form.empresa}
                onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                className="bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent/50 transition-all h-12 sm:h-14 rounded-xl sm:rounded-2xl"
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-primary-foreground/80 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">Seu WhatsApp *</Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(00) 00000-0000"
                value={form.whatsapp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  let formatted = "";
                  if (val.length > 0) formatted = `(${val.slice(0, 2)}`;
                  if (val.length > 2) formatted += `) ${val.slice(2, 7)}`;
                  if (val.length > 7) {
                    if (val.length === 11) {
                      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7, 11)}`;
                    } else {
                      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6, 10)}`;
                    }
                  }
                  setForm({ ...form, whatsapp: formatted });
                }}
                className="bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent/50 transition-all h-12 sm:h-14 rounded-xl sm:rounded-2xl"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-primary-foreground/80 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">Média de faturamento mensal *</Label>
            <Select value={form.faturamento} onValueChange={(val) => setForm({ ...form, faturamento: val })}>
              <SelectTrigger className="bg-white/5 border-white/10 text-primary-foreground h-12 sm:h-14 rounded-xl sm:rounded-2xl">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {faturamentoOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-primary-foreground/80 font-bold text-[10px] uppercase tracking-[0.2em] ml-1">Qual o seu objetivo principal? *</Label>
            <RadioGroup
              value={form.objetivo}
              onValueChange={(val) => setForm({ ...form, objetivo: val })}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {objetivoOptions.map((opt) => (
                <div key={opt} className="flex items-center space-x-3 bg-white/5 p-3 sm:p-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all cursor-pointer group">
                  <RadioGroupItem value={opt} id={opt} className="border-primary-foreground/30 text-accent" />
                  <Label htmlFor={opt} className="text-primary-foreground/70 font-medium text-xs sm:text-sm cursor-pointer flex-grow">{opt}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-3 bg-white/5 p-3 sm:p-4 rounded-xl border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
                <RadioGroupItem value="Outro" id="outro" className="border-primary-foreground/30 text-accent" />
                <Label htmlFor="outro" className="text-primary-foreground/70 font-medium text-xs sm:text-sm cursor-pointer flex-grow">Outro</Label>
              </div>
            </RadioGroup>

            {form.objetivo === "Outro" && (
              <Textarea
                placeholder="Descreva seu objetivo específico..."
                value={form.outroObjetivo}
                onChange={(e) => setForm({ ...form, outroObjetivo: e.target.value })}
                className="bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent/50 transition-all rounded-xl sm:rounded-2xl mt-3 min-h-[100px]"
                maxLength={500}
              />
            )}
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex items-start space-x-3 bg-white/5 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10">
              <Checkbox
                id="consentimento"
                checked={form.consentimento}
                onCheckedChange={(checked) => setForm({ ...form, consentimento: checked === true })}
                className="mt-1 border-primary-foreground/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="consentimento"
                  className="text-[11px] sm:text-xs text-primary-foreground/50 cursor-pointer select-none leading-relaxed"
                >
                  Concordo em receber contatos comerciais da TGT Marketing e aceito a <span className="text-accent hover:underline font-bold">Política de Privacidade</span>.
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[9px] text-primary-foreground/30 uppercase tracking-[0.2em] justify-center font-bold">
                <ShieldCheck size={12} className="text-accent/50" />
                Seus dados estão 100% seguros
              </div>
              
              <p className="text-[9px] text-primary-foreground/20 text-center leading-relaxed max-w-sm mx-auto">
                Base Legal: O tratamento dos seus dados é realizado com base no seu <strong>Consentimento</strong> e no <strong>Legítimo Interesse</strong> (Art. 7º, LGPD) para fornecer o diagnóstico solicitado.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-black text-base sm:text-xl py-7 sm:py-8 rounded-xl sm:rounded-2xl shadow-[0_15px_30px_-10px_hsl(var(--accent)/0.5)] hover:-translate-y-1 transition-all shine-effect"
            >
              {loading ? (
                <><Loader2 className="animate-spin mr-2" size={24} /> Processando...</>
              ) : (
                <><Send className="mr-2" size={24} /> Agendar agora</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
