import { supabase } from "../lib/supabase";

type WhatsappLinkRow = {
  link: string;
};

export async function getWhatsappLink(): Promise<string | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("whatsapp_link")
    .select("link")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle<WhatsappLinkRow>();

  if (error) {
    console.warn("No se pudo leer whatsapp_link:", error.message);
    return null;
  }

  return data?.link ?? null;
}
