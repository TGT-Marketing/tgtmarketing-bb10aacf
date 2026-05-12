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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome || !form.empresa || !form.email || !form.whatsapp || !form.faturamento || !form.objetivo) {
      toast({ title: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }

    if (!form.consentimento) {
      toast({ title: "Consentimento necessário", description: "Você precisa aceitar os termos de privacidade para continuar.", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({ title: "E-mail inválido", description: "Por favor, insira um e-mail válido.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
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

      toast({ title: "Enviado com sucesso!", description: "Entraremos em contato em breve." });
      
      // Analytics Event: Form Submission
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "form_submission",
          form_name: "contato_diagnostico",
          faturamento: form.faturamento,
          objetivo: form.objetivo
        });
      }

      // Google Ads Conversion: Lead
      if (typeof window.gtag === "function") {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-XXXXXXXXX/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'BRL'
        });
      }

      setForm({ nome: "", empresa: "", email: "", whatsapp: "", faturamento: "", objetivo: "", outroObjetivo: "", consentimento: false });
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-primary border-accent/20 mx-3 sm:mx-auto rounded-xl sm:rounded-2xl p-4 sm:p-6" data-lenis-prevent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-primary-foreground">
            Agendar Diagnóstico <span className="text-accent">Gratuito</span>
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/60">
            Escolha um horário para conversarmos sobre o crescimento do seu negócio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-primary-foreground/80">Nome completo *</Label>
            <Input
              id="nome"
              placeholder="Ex: João Silva"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 transition-colors"
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary-foreground/80">E-mail corporativo *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ex: joao@empresa.com.br"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa" className="text-primary-foreground/80">Nome da empresa *</Label>
            <Input
              id="empresa"
              placeholder="Ex: Minha Empresa Ltda"
              value={form.empresa}
              onChange={(e) => setForm({ ...form, empresa: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 transition-colors"
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-primary-foreground/80">Contato WhatsApp *</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              value={form.whatsapp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                let formatted = val;
                if (val.length > 0) formatted = `(${val.slice(0, 2)}`;
                if (val.length > 2) formatted += `) ${val.slice(2, 7)}`;
                if (val.length > 7) formatted += `-${val.slice(7, 11)}`;
                setForm({ ...form, whatsapp: formatted });
              }}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-primary-foreground/80">Média de faturamento *</Label>
            <Select value={form.faturamento} onValueChange={(val) => setForm({ ...form, faturamento: val })}>
              <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                {faturamentoOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-3 bg-primary-foreground/5 p-4 rounded-lg border border-primary-foreground/10">
            <Checkbox
              id="consentimento"
              checked={form.consentimento}
              onCheckedChange={(checked) => setForm({ ...form, consentimento: checked === true })}
              className="mt-1 border-primary-foreground/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="consentimento"
                className="text-xs sm:text-sm text-primary-foreground/70 cursor-pointer select-none"
              >
                Concordo com o processamento dos meus dados para fins de diagnóstico e contato comercial, conforme a <span className="text-accent hover:underline">Política de Privacidade</span>.
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-primary-foreground/40 uppercase tracking-widest justify-center">
            <ShieldCheck size={12} />
            Seus dados estão seguros conosco
          </div>
            <Label className="text-primary-foreground/80">Objetivo principal *</Label>
            <RadioGroup
              value={form.objetivo}
              onValueChange={(val) => setForm({ ...form, objetivo: val })}
              className="space-y-2"
            >
              {objetivoOptions.map((opt) => (
                <div key={opt} className="flex items-center space-x-3">
                  <RadioGroupItem value={opt} id={opt} className="border-primary-foreground/30 text-accent" />
                  <Label htmlFor={opt} className="text-primary-foreground/70 font-normal cursor-pointer">{opt}</Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="Outro" id="outro" className="border-primary-foreground/30 text-accent" />
                <Label htmlFor="outro" className="text-primary-foreground/70 font-normal cursor-pointer">Outro</Label>
              </div>
            </RadioGroup>

            {form.objetivo === "Outro" && (
              <Textarea
                placeholder="Descreva seu objetivo..."
                value={form.outroObjetivo}
                onChange={(e) => setForm({ ...form, outroObjetivo: e.target.value })}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 mt-2"
                maxLength={500}
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6"
          >
            {loading ? (
              <><Loader2 className="animate-spin" size={20} /> Agendando...</>
            ) : (
              <><Send size={20} /> Agendar agora</>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
