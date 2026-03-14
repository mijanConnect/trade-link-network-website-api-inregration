import { getMetadata } from "@/components/homeowners/MetadataConfig";
import { ReactNode } from "react";

export const metadata = getMetadata("profile");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
