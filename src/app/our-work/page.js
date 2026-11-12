import OurWork from "@/components/OurWork";
import PageBanner from "@/components/PageBanner";
import { ourWork } from "@/data/ourWork";
import { humanize } from "@/lib/navHelpers";

const title = humanize("our-work");

export const metadata = {
  title:       `${title} | AgencyName`,
  description: "Portfolio of web development, SEO, Google Ads and digital marketing projects.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageBanner
        title={title}
        breadcrumbs={[
          { label: "Home",   href: "/" },
          { label: title },
        ]}
      />
      <OurWork projects={ourWork} />
    </>
  );
}
