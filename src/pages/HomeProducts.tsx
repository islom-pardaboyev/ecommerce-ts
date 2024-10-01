import { useEffect, useState } from "react";
import { useAxios } from "../hook/useAxios";
import { ProductTypes } from "../types";
import { Select } from "antd";
import { ProductCart } from "../components/ProductCart";
import { loading } from "../routes";

function HomeProducts() {
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterByBrand, setFilterByBrand] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await useAxios().get("products");
        const fetchedProducts = response.data.products;

        const newBrands = fetchedProducts
          ?.map((item: ProductTypes) => item.brand)
          .filter(
            (brand: string, index: number, self: string[]) =>
              brand && self.indexOf(brand) === index
          ); // Get unique brands

        setBrands(newBrands || []);
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    filterByBrand !== "All"
      ? products.filter(
          (product: ProductTypes) => product.brand === filterByBrand
        )
      : products;
  const options = [
    { label: "All", value: "All" },
    ...brands.map((brand) => ({ label: brand, value: brand })),
  ];

  if (isLoading) {
    return loading;
  }

  return (
    <section className="h-screen container py-10 mx-auto">
      <Select
        showSearch size="large"
        className="w-[30vw] float-end"
        onChange={(e) => setFilterByBrand(e)}
        placeholder="Select a person"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
      />

      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-5 h-10 bg-red-500 rounded"></span>
          <p className="font-bold text-red-500">Products</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.map((product: ProductTypes) => (
            <ProductCart key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeProducts;
