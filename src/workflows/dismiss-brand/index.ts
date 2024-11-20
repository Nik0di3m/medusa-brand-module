import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { dismissProductFromBrandStep } from "./steps/dismiss-brand";
import { logger } from "@medusajs/framework";

export type DismissProductFromBrandInput = {
  productIds: string[];
  brandId: string;
};
// This is the workflow for creating a brand in the admin panel
// We used it in the route src/api/admin/brands/route.ts
export const dissMissProductFromBrandWorkflow = createWorkflow(
  "dismiss-product-from-brand",
  (input: DismissProductFromBrandInput) => {
    console.log("Dismissing products", input);
    const brand = dismissProductFromBrandStep(input);
    return new WorkflowResponse(brand);
  }
);
