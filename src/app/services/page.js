import ServicesGrid from "@/components/ServicesGrid";
import PageBanner from "@/components/PageBanner";
import { servicesList } from "@/data/servicesList";

export const metadata = {
  title: "Our Services | AgencyName",
  description:
    "Web development, SEO, Google Ads, digital marketing and video editing services to help your business get found and get customers.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Our Services"
        breadcrumbs={[
          { label: "Home",     href: "/" },
          { label: "Services" },
        ]}
        subtitle="Everything you need to get found, get clicks and get customers, from one team."
      />
      <ServicesGrid
        services={servicesList}
        title="Our Services"
        subtitle="Everything you need to get found, get clicks and get customers, from one team."
        headingLevel="h2"
      />
    </>
  );
}
