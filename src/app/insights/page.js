import PageBanner from "@/components/PageBanner";
import { humanize } from "@/lib/navHelpers";

const title = humanize("insights");

export const metadata = {
  title:       `${title} | AgencyName`,
  description: `${title} services.`,
};

export default function InsightsPage() {
  return (
    <>
      <PageBanner
        title={title}
        breadcrumbs={[
          { label: "Home",  href: "/" },
          { label: title },
        ]}
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
        {/* Page content coming soon */}
      </main>
    </>
  );
}
