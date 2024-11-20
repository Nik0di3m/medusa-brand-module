import { Button, Checkbox, Drawer, Table } from "@medusajs/ui";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export function DrawerBrands({
  brandId,
  productId,
  onSucces,
}: {
  brandId: string;
  productId: string;
  onSucces: () => void;
}) {
  const [brands, setBrands] = useState<Record<string, string>[] | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    brandId
  );

  useEffect(() => {
    fetch(`/admin/brands`, {
      credentials: "include",
    })
      .then((res) => res.json())

      .then(({ brands: brandsData }) => {
        setBrands(brandsData);
      });
  }, []);

  const handleSave = async () => {
    console.log("Selected brand", selectedBrand);
    const res = await fetch("/admin/brands/link", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandId: selectedBrand,
        productIds: [productId],
      }),
    }).then((res) => res);

    if (res.ok) {
      console.log("Selected brand", selectedBrand);
      onSucces();
    }
  };

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Edit Brand</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Brand</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Selected</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {brands
                ?.filter((i) => i.id != brandId)
                .map((brand) => (
                  <Table.Row key={brand.id}>
                    <Table.Cell>
                      <Checkbox
                        checked={selectedBrand === brand.id}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrand(brand.id);
                          } else {
                            setSelectedBrand(undefined);
                          }
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>{brand.name}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/brand/${brand.id}`}>{brand.id}</Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button onClick={handleSave}>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
