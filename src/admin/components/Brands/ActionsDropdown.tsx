import { EllipsisHorizontal, PencilSquare, Plus, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";

export function ActionsDropdown({
  brand_id,
  onSucces,
}: {
  brand_id: string;
  onSucces: () => void;
}) {
  const handleDelete = async ({ brand_id }: { brand_id: string }) => {
    console.log("Delete brand with id: ", brand_id);
    const delResponse = await fetch(`/admin/brands`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: brand_id,
      }),
    });

    if (delResponse.ok) {
      console.log("Brand deleted successfully");
      onSucces();
    } else {
      console.error("Failed to delete brand. Please try again.");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton>
          <EllipsisHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-x-2">
          <PencilSquare className="text-ui-fg-subtle" />
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-x-2">
          <Plus className="text-ui-fg-subtle" />
          Add
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          onClick={() =>
            handleDelete({
              brand_id: brand_id,
            })
          }
          className="gap-x-2"
        >
          <Trash className="text-ui-fg-subtle" />
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
