import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { findCategory, findSubcategory, getAllServicePaths } from "@/lib/navHelpers";

export function generateStaticParams() {
  return getAllServicePaths();
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const child = findSubcategory(categorySlug, slug);
  if (!child) return {};
  const cat = findCategory(categorySlug);
  return {
    title:       `${child.label} | AgencyName`,
    description: `${child.label} services.`,
  };
}

export default async function SubcategoryPage({ params }) {
  const { category: categorySlug, slug } = await params;

  const cat   = findCategory(categorySlug);
  if (!cat) notFound();

  const child = findSubcategory(categorySlug, slug);
  if (!child) notFound();

  return (
    <>
      <PageBanner
        title={child.label}
        breadcrumbs={[
          { label: "Home",     href: "/"                           },
          { label: "Services", href: "/services"                   },
          { label: cat.label,  href: `/services/${cat.slug}`       },
          { label: child.label },
        ]}
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
        {/* Page content coming soon */}
      </main>
    </>
  );
}
