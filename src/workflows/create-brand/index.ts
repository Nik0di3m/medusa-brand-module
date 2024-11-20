import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createBrandStep } from "./steps/create-brand";
export type CreateBrandInput = {
  name: string;
  description: string;
};
// This is the workflow for creating a brand in the admin panel
// We used it in the route src/api/admin/brands/route.ts
export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandInput) => {
    const brand = createBrandStep(input);
    return new WorkflowResponse(brand);
  }
);
