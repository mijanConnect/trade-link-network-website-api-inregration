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
  const data = await fetchDisclaimer("cookie-policy");

  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <div className="">
          <h2 className="text-[24px] lg:text-[48px] font-semibold text-primaryTextmb-4 lg:mb-15 text-center">
            Cookies Policy
          </h2>

          {data?.content ? (
            <div
              className="text-primaryText text-[14px] lg:text-[18px]"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <div className="text-gray-600 text-center py-10">
              Cookies policy content not available.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
