import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const categories = ["job", "internship", "scholarship", "fellowship", "grant", "event", "competition", "conference"];
const workModes = ["remote", "onsite", "hybrid"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editOpp: any | null;
  canPost: boolean;
  onSaved: () => void;
}

interface FormState {
  title: string;
  type: string;
  work_mode: string;
  location: string;
  company: string;
  description: string;
  requirements: string;
  deadline: string;
  external_link: string;
  stipend_min: string;
  stipend_max: string;
  currency: string;
}

const emptyForm: FormState = {
  title: "", type: "job", work_mode: "onsite", location: "", company: "",
  description: "", requirements: "", deadline: "", external_link: "",
  stipend_min: "", stipend_max: "", currency: "USD",
};

export default function OpportunityFormDialog({ open, onOpenChange, editOpp, canPost, onSaved }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editOpp) {
      setForm({
        title: editOpp.title || "",
        type: editOpp.type || "job",
        work_mode: editOpp.work_mode || "onsite",
        location: editOpp.location || "",
        company: editOpp.company || "",
        description: editOpp.description || "",
        requirements: editOpp.requirements || "",
        deadline: editOpp.deadline ? editOpp.deadline.split("T")[0] : "",
        external_link: editOpp.external_link || "",
        stipend_min: editOpp.stipend_min?.toString() || "",
        stipend_max: editOpp.stipend_max?.toString() || "",
        currency: editOpp.currency || "USD",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editOpp, open]);

  const set = (key: keyof FormState, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        type: form.type,
        work_mode: form.work_mode,
        location: form.location || null,
        company: form.company || null,
        description: form.description || null,
        requirements: form.requirements || null,
        deadline: form.deadline || null,
        external_link: form.external_link || null,
        stipend_min: form.stipend_min ? Number(form.stipend_min) : null,
        stipend_max: form.stipend_max ? Number(form.stipend_max) : null,
        currency: form.currency || "USD",
      };

      if (editOpp) {
        const { error } = await supabase.from("opportunities").update(payload).eq("id", editOpp.id);
        if (error) throw error;
        toast({ title: "Opportunity updated" });
      } else {
        if (!canPost) {
          toast({ title: "Posting limit reached", description: "Upgrade your plan to post more.", variant: "destructive" });
          setSaving(false);
          return;
        }
        const { error } = await supabase.from("opportunities").insert({
          ...payload,
          provider_id: user!.id,
          status: "pending",
          views_count: 0,
        });
        if (error) throw error;
        toast({ title: "Opportunity submitted", description: "Your opportunity is awaiting approval." });
      }
      onSaved();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editOpp ? "Edit" : "Create"} Opportunity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Field label="Title *">
            <Input value={form.title} onChange={e => set("title", e.target.value)} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <Select value={form.type} onValueChange={v => set("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Work Mode">
              <Select value={form.work_mode} onValueChange={v => set("work_mode", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {workModes.map(m => <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Organization">
              <Input value={form.company} onChange={e => set("company", e.target.value)} />
            </Field>
            <Field label="Location">
              <Input value={form.location} onChange={e => set("location", e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Min Stipend">
              <Input type="number" value={form.stipend_min} onChange={e => set("stipend_min", e.target.value)} placeholder="0" />
            </Field>
            <Field label="Max Stipend">
              <Input type="number" value={form.stipend_max} onChange={e => set("stipend_max", e.target.value)} placeholder="0" />
            </Field>
            <Field label="Currency">
              <Input value={form.currency} onChange={e => set("currency", e.target.value)} />
            </Field>
          </div>

          <Field label="Deadline">
            <Input type="date" value={form.deadline} onChange={e => set("deadline", e.target.value)} />
          </Field>

          <Field label="Description">
            <Textarea rows={4} value={form.description} onChange={e => set("description", e.target.value)} />
          </Field>

          <Field label="Requirements">
            <Textarea rows={3} value={form.requirements} onChange={e => set("requirements", e.target.value)} />
          </Field>

          <Field label="Application URL">
            <Input value={form.external_link} onChange={e => set("external_link", e.target.value)} placeholder="https://..." />
          </Field>

          <Button onClick={handleSave} disabled={saving} className="btn-gradient w-full rounded-lg font-semibold">
            {saving ? "Saving…" : editOpp ? "Update" : "Submit for Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
