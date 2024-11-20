import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteBrandStep } from "./steps/delete-brand";

export type DeleteBrandInput = {
  id: string;
};
// This is the workflow for delete a brand in the admin panel
// We used it in the route src/api/admin/brands/route.ts
export const deleteBrandWorkflow = createWorkflow(
  "delete-brand",
  (input: DeleteBrandInput) => {
    const brand = deleteBrandStep(input);
    return new WorkflowResponse(brand);
  }
);
