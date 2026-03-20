import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    whatsapp: "",
    faturamento: "",
    objetivo: "",
    outroObjetivo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome || !form.empresa || !form.whatsapp || !form.faturamento || !form.objetivo) {
      toast({ title: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: form.nome,
          empresa: form.empresa,
          whatsapp: form.whatsapp,
          faturamento: form.faturamento,
          objetivo: form.objetivo === "Outro" ? form.outroObjetivo : form.objetivo,
        },
      });

      if (error) throw error;

      toast({ title: "Enviado com sucesso!", description: "Entraremos em contato em breve." });
      setForm({ nome: "", empresa: "", whatsapp: "", faturamento: "", objetivo: "", outroObjetivo: "" });
      onOpenChange(false);
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente ou fale conosco pelo WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-primary border-accent/20 mx-3 sm:mx-auto rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-primary-foreground">
            Diagnóstico <span className="text-accent">Gratuito</span>
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/60">
            Preencha o formulário e receba um diagnóstico personalizado para o seu negócio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-primary-foreground/80">Nome completo *</Label>
            <Input
              id="nome"
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa" className="text-primary-foreground/80">Nome da empresa *</Label>
            <Input
              id="empresa"
              placeholder="Nome da sua empresa"
              value={form.empresa}
              onChange={(e) => setForm({ ...form, empresa: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-primary-foreground/80">Contato WhatsApp *</Label>
            <Input
              id="whatsapp"
              placeholder="(00) 00000-0000"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              maxLength={20}
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

          <div className="space-y-3">
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
              <><Loader2 className="animate-spin" size={20} /> Enviando...</>
            ) : (
              <><Send size={20} /> Enviar diagnóstico</>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
