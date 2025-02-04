// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import ProductList from "@/components/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrival" limit={4} />
    </>
  );
};

export default Homepage;
