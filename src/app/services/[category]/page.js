import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { findCategory, getAllCategoryPaths } from "@/lib/navHelpers";

export function generateStaticParams() {
  return getAllCategoryPaths();
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const cat = findCategory(categorySlug);
  if (!cat) return {};
  return {
    title:       `${cat.label} | AgencyName`,
    description: `${cat.label} services.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const cat = findCategory(categorySlug);
  if (!cat) notFound();

  return (
    <>
      <PageBanner
        title={cat.label}
        breadcrumbs={[
          { label: "Home",     href: "/"         },
          { label: "Services", href: "/services" },
          { label: cat.label },
        ]}
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
        {/* Page content coming soon */}
      </main>
    </>
  );
}
