import { getMetadata } from "@/components/homeowners/MetadataConfig";
import { ReactNode } from "react";

export const metadata = getMetadata("provider-profile");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
