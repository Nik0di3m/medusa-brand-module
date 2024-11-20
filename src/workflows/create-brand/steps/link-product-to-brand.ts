import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "../../../modules/brand";

type LinkProductToBrandStepInput = {
  productId: string;
  brandId: string;
};

// This is the step for linking a product to a brand
// We use it in the workflow createBrandWorkflow
// We use it in the route src/api/admin/products/%5Bid%5D/brand/route.ts

export const linkProductToBrandStep = createStep(
  "link-product-to-brand",
  async (
    { productId, brandId }: LinkProductToBrandStepInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.create({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [BRAND_MODULE]: {
        brand_id: brandId,
      },
    });

    return new StepResponse(undefined, {
      productId,
      brandId,
    });
  }
);
