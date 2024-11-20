import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateBrandInput } from "..";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";

// This is the workflow for creating a brand in the admin panel
// We can add more steps to the workflow

export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandInput, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.createBrands(input);

    return new StepResponse(brand, brand.id);
  }
);
