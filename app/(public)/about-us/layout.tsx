import { getMetadata } from "@/components/homeowners/MetadataConfig";
import { ReactNode } from "react";

export const metadata = getMetadata("about-us");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
