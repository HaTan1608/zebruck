import Feed from "@/components/Feed";
import Product from "@/components/Product";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
export default async function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-16">
      <section className="flex flex-col space-y-12 pb-44">
        <Feed />
      </section>
    </main>
  );
}
