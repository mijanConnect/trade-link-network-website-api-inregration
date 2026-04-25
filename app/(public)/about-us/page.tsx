import AboutUs from "@/components/homeowners/AboutUs";

// ISR: Revalidate every 86400 seconds (24 hours)
export const revalidate = 86400;

async function fetchDisclaimer(disclaimerKey: string) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/disclaimers/${disclaimerKey}`, {
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result?.data ?? null;
  } catch {
    return null;
  }
}

export default async function Page() {
  const data = await fetchDisclaimer("about-us");

  return (
    <>
      <AboutUs content={data?.content} />
    </>
  );
}
