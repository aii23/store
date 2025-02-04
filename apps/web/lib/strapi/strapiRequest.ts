"use server";

export async function strapiRequest({
  pluralApi,
  populate,
  fetchConfig,
}: {
  pluralApi: string;
  populate?: boolean;
  fetchConfig?: NextFetchRequestConfig;
}) {
  const response = await fetch(
    `${process.env.STRAPI_URL}${pluralApi}${populate ? "?populate=*" : ""}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_KEY}`,
        "User-Agent": `${process.env.USER_AGENT}`,
      },
      next: fetchConfig,
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}
