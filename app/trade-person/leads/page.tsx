import { redirect } from "next/navigation";
import { leadsMock } from "@/lib/trade-person/mock";

export default function LeadsIndexPage() {
  const firstLeadId = leadsMock[0]?.id;
  if (firstLeadId) {
    redirect(`/trade-person/leads/${firstLeadId}`);
  }
  return null;
}
