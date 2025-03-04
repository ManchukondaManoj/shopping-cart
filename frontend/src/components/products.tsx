import Image from "next/image";
import Link from "next/link";
// import Rating from "./Rating";
import Rating from "@/components/Rating";

interface ProductProps {
  product: {
    productId: string;
    _id: string;
    name: string;
    image: string;
    rating: number;
    numReviews: number;
    price: number;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-3 my-3">
      <Link href={`/products/${product.productId}`} className="block">
        <div className="relative w-full h-60">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/products/${product.productId}`} className="block">
          <h2 className="font-semibold text-lg hover:text-blue-500">
            {product.name}
          </h2>
        </Link>
        {/* <div className="flex items-center">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div> */}
        <p className="text-xl font-bold text-gray-800">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
