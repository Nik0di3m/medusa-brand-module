import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "../../../modules/brand";
import { logger } from "@medusajs/framework";
import BrandModuleService from "src/modules/brand/service";
import { DismissProductFromBrandInput } from "..";

// This is the step for linking a product to a brand
// We use it in the workflow createBrandWorkflow
// We use it in the route src/api/admin/products/%5Bid%5D/brand/route.ts

export const dismissProductFromBrandStep = createStep(
  "dismiss-product-from-brand-step",
  async (
    { productIds, brandId }: DismissProductFromBrandInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.retrieveBrand(brandId);

    if (!brand) {
      throw new Error("Brand not found");
    }

    logger.info("Linking products to brand");
    logger.info(productIds as any);
    logger.info(brandId);

    const links = [];

    for (const id of productIds) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: id,
        },
        [BRAND_MODULE]: {
          brand_id: brandId,
        },
      });
      logger.info(`Dismissing product ${id} from brand ${brandId}`);
    }

    await remoteLink.dismiss(links);

    logger.info("Dismissed products from brand");

    return new StepResponse(links, links);
  }
);
