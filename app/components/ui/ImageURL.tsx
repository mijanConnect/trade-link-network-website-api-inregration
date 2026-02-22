export const getImageUrl = (path: string | null | undefined): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://10.10.7.23:3000";
  // const apiUrl =
    // process.env.NEXT_PUBLIC_API_URL || "https://api.tradelinknetwork.co.uk";

  // Remove /api/v1 from the URL if it exists
  const baseUrl = apiUrl.replace(/\/api\/v1\/?$/, "");

  if (!path || typeof path !== "string") {
    return "/images/default-avatar.png";
  }
  if (path.startsWith("blob:") || path.startsWith("data:")) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/")) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
};
