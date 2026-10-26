import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import SectionHeader, { SectionFooterLink } from "../components/SectionHeader";
import WhyChoose from "../components/WhyChoose";
import QuoteBanner from "../components/QuoteBanner";
import PromoBanner from "../components/PromoBanner";
import WhyShop from "../components/WhyShop";
import Testimonials from "../components/Testimonials";
import BlogSection from "../components/BlogSection";
import Newsletter from "../components/Newsletter";
import { signatureCollection, getProductBySlug } from "../data/catalog";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const FEATURED = ["savannah-sofa", "matteo-armchair", "willow-sideboard", "harper-bed-frame", "dante-desk", "velora-wardrobe"].map(
  getProductBySlug
);

const SIGNATURE_LINK = { to: "/collections", label: "View All Collection" };
const FEATURED_LINK = { to: "/shop", label: "View All Products" };

export default function Home() {
  useDocumentTitle(null);

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section className="container-page pt-14 md:pt-20">
        <SectionHeader title="Our Signature Collection" intro="Timeless designs. Unmatched quality." link={SIGNATURE_LINK} />
        <ProductGrid products={signatureCollection} columns={4} />
        <SectionFooterLink link={SIGNATURE_LINK} />
      </section>

      <WhyChoose />
      <QuoteBanner />
      <PromoBanner />
      <WhyShop />

      <section className="container-page pt-14 md:pt-20">
        <SectionHeader title="Featured Products" link={FEATURED_LINK} />
        <ProductGrid products={FEATURED} columns={3} />
        <SectionFooterLink link={FEATURED_LINK} />
      </section>

      <Testimonials />
      <BlogSection />
      <Newsletter />
    </>
  );
}
