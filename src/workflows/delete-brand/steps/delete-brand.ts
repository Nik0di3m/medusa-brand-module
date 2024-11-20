import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";
import { DeleteBrandInput } from "..";

// This is the workflow for creating a brand in the admin panel
// We can add more steps to the workflow

export const deleteBrandStep = createStep(
  "delete-brand-step",
  async (input: DeleteBrandInput, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.deleteBrands(input.id);

    return new StepResponse(brand);
  }
);
