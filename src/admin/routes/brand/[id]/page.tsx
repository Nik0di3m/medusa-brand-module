import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Checkbox, Container, Heading, Table } from "@medusajs/ui";

const BrandPage = () => {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<Record<string, string> | undefined>();
  const [products, setProducts] = useState<
    Record<string, unknown> | undefined
  >();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleCheckboxChange = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleDismissProducts = async () => {
    console.log("Dismissed products", selectedProducts);
    const res = await fetch("/admin/brands/dismiss", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productIds: selectedProducts,
        brandId: id,
      }),
    }).then((res) => res);

    if (res.ok) {
      console.log("Dismissed products", selectedProducts);
      setSelectedProducts([]);
      setIsDismissed(!isDismissed);
    }
  };

  useEffect(() => {
    fetch(`/admin/brands/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBrand(data.brand);
        console.log("Retrieved products", data.products[0].product_link);
        setProducts(data.products[0].product_link);
      });
  }, [id, isDismissed]);

  useEffect(() => {
    console.log("Selected products", selectedProducts);
  }, [selectedProducts]);

  return (
    <>
      <Container className="divide-y">
        <Heading className="pb-2" level="h1">
          Brand: {brand?.name}
        </Heading>
        <div className="flex justify-between py-6">
          <Heading level="h2">Products:</Heading>
          <Button
            disabled={selectedProducts.length <= 0}
            variant="danger"
            onClick={() => handleDismissProducts()}
          >
            Dismiss selected products
          </Button>
        </div>
        <div className="flex h-full flex-col overflow-hidden !border-t-0">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="w-48">Check</Table.HeaderCell>
                <Table.HeaderCell className="w-20">ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products?.map(({ product }: { product: any }) => (
                <Table.Row key={product.id}>
                  <Table.Cell className="w-48">
                    <Checkbox
                      onCheckedChange={
                        // @ts-ignore
                        (checked) => handleCheckboxChange(product.id)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell className="w-48">
                    <img
                      className="size-20 object-contain rounded-xl overflow-hidden"
                      src={product.thumbnail}
                      alt=""
                    />
                  </Table.Cell>

                  <Table.Cell>{product.title}</Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default BrandPage;
