import { getMetadata } from "@/components/homeowners/MetadataConfig";
import { ReactNode } from "react";

export const metadata = getMetadata("how-tradeperson-works");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
