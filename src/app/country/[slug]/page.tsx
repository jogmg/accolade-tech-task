import CountryDetails from "@/app/components/CountryDetails";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the `params` promise and extract the `slug` value.
  const slug = (await params).slug;

  return (
    <main className="countries-details-container">
      {/* Render the `CountryDetails` component, with `slug` as a prop. */}
      <CountryDetails slug={slug} />
    </main>
  );
}
