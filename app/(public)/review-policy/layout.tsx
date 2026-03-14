import { getMetadata } from "@/components/homeowners/MetadataConfig";
import { ReactNode } from "react";

export const metadata = getMetadata("review-policy");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
