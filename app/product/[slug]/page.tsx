import { client } from "../../../lib/client";
import { getUsdToJpyRate } from "../../../lib/formatCurrency";
import Show from "../Show.jsx";

type PageProps = {
  params: {
    slug: number;
  };
};

async function getProduct(slug) {
  // QUERY
  const oneProduct = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  // GET SINGLE PRODUCT
  const product = await client.fetch(oneProduct);

  // GET RELATED PRODUCTS
  const products = await client.fetch(productsQuery);

  return { product, products };
}

export default async function SingleProduct({ params: { slug } }: PageProps) {
  const { product, products } = await getProduct(slug);
  const rate = await getUsdToJpyRate();

  const convertedProduct = {
    ...product,
    price: Math.round(product.price * rate),
    oldPrice: Math.round(product.oldPrice * rate),
  };

  const convertedProducts = products.map((p) => ({
    ...p,
    price: Math.round(p.price * rate),
    oldPrice: Math.round(p.oldPrice * rate),
  }));

  return <Show product={convertedProduct} products={convertedProducts} />;
}

export const generateStaticParams = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

  const products = await client.fetch(query);

  return products.map((e) => ({
    slug: e.slug.current,
  }));
};
