import { sanityfetch } from "@/sanity/lib/fetch";
import { allproducts } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  tags: string;
  isNew: boolean;
  productImages: { url: string; description: string }[];
  slug: string;
};

export default async function Home() {
  const products: Product[] = await sanityfetch({ query: allproducts });

  return (
    <>
      <h1 className="text-3xl font-extrabold text-center my-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-16">
        {products.map((product) => (
          <Link href={`/product/${product.slug}`} key={product._id}>
            <div className="border border-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="w-64 h-64 overflow-hidden rounded-lg mb-4">
              <Image
            src={product.productImages[0]?.url || "/default-image.jpg"}
            alt={product.title}
            width={500}
            height={500}
         className="w-full h-auto object-cover"
/>
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                {product.title}
              </h2>

              <p className="text-center text-gray-600">
                <span className="font-bold text-gray-800">Price:</span> {product.price} <span>Rs.</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}