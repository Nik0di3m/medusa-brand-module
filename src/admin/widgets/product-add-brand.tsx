import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useEffect, useState } from "react";
import { Container, Heading, Text } from "@medusajs/ui";
import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { DrawerBrands } from "../components/Brands/DrawerBrands";
const ProductAddBrand = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const [brand, setBrand] = useState<Record<string, string> | undefined>();
  const [isBrandChanged, setIsBrandChanged] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/admin/products/${data.id}/brand`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setBrand(res.brand);
        setLoading(false);
      });
  }, [loading, isBrandChanged]);
  return (
    <Container className="divide-y px-0 py-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading className="" level="h2">
          Brand
        </Heading>
        <DrawerBrands
          brandId={brand?.id ? brand.id : "0"}
          productId={data.id}
          onSucces={() => setIsBrandChanged(!isBrandChanged)}
        />
      </div>
      {loading && <span>Loading...</span>}
      {brand && (
        <div className="flex items-center justify-between px-6 py-4">
          <Text className="">{brand.name}</Text>
          <Text>{brand.id}</Text>
        </div>
      )}
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
});

export default ProductAddBrand;
