import { getMetadata } from "@/components/homeowners/MetadataConfig";
import { ReactNode } from "react";

export const metadata = getMetadata("post-service");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
