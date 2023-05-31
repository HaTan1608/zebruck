import Feed from "@/components/Feed";
import Product from "@/components/Product";

export default async function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-48">
      <section className="flex flex-col space-y-12 pb-44">
        <Feed />
      </section>
    </main>
  );
}
