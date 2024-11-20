import { Table, Container, Heading } from "@medusajs/ui";
import { useEffect, useState } from "react";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";
import Modal from "../../components/modal";
import AddNewBrandForm from "../../components/Brands/AddNewBrandForm";
import { ActionsDropdown } from "../../components/Brands/ActionsDropdown";
import { Link } from "react-router-dom";
// This route is used in the admin panel
// for generating the brands page
// !!!! Important: The UI route component must be created as an arrow function. !!!!
const BrandsPage = () => {
  const [brands, setBrands] = useState<Record<string, string>[] | undefined>();
  const [isAddNewBrandModalOpen, setIsAddNewBrandModalOpen] = useState(false);
  const [onSuccesfulResponse, setOnSuccesfulResponse] = useState(false);

  useEffect(() => {
    fetch(`/admin/brands`, {
      credentials: "include",
    })
      .then((res) => res.json())

      .then(({ brands: brandsData }) => {
        setBrands(brandsData);
      });
  }, [onSuccesfulResponse]);
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Brands</Heading>
        <div>
          <button
            onClick={() => setIsAddNewBrandModalOpen(true)}
            className="btn"
          >
            Create Brand
          </button>
        </div>
      </div>

      <div className="flex h-full flex-col overflow-hidden !border-t-0">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>

              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {brands?.map((brand) => (
              <Table.Row key={brand.id}>
                <Table.Cell>
                  <Link to={`/brand/${brand.id}`}>{brand.id}</Link>
                </Table.Cell>

                <Table.Cell>{brand.name}</Table.Cell>
                <Table.Cell>{brand.description}</Table.Cell>
                <Table.Cell>
                  <ActionsDropdown
                    brand_id={brand.id}
                    onSucces={() =>
                      setOnSuccesfulResponse(!onSuccesfulResponse)
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {isAddNewBrandModalOpen && (
        <Modal
          isOpen={isAddNewBrandModalOpen}
          onClose={() => setIsAddNewBrandModalOpen(false)}
        >
          <Heading level="h2">Create Brand</Heading>
          <AddNewBrandForm
            onSuccessfulSubmit={() =>
              setOnSuccesfulResponse(!onSuccesfulResponse)
            }
          />
        </Modal>
      )}
    </Container>
  );
};

export default BrandsPage;

// Here is injected the route configuration
// Injected route will be displayed in the sidebar
// The configuration object is created using the defineRouteConfig function imported from @medusajs/admin-sdk. It accepts the following properties:
// label: the sidebar item’s label.
// icon: an optional React component used as an icon in the sidebar.

export const config = defineRouteConfig({
  label: "Brands",

  icon: TagSolid,
});
