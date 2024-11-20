import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "../../../modules/brand";
import { logger } from "@medusajs/framework";
import { LinkProductToBrandStepInput } from "..";
import BrandModuleService from "src/modules/brand/service";

// This is the step for linking a product to a brand
// We use it in the workflow createBrandWorkflow
// We use it in the route src/api/admin/products/%5Bid%5D/brand/route.ts

export const linkProductToBrandStep = createStep(
  "link-product-to-brand-step",
  async (
    { productIds, brandId }: LinkProductToBrandStepInput,
    { container }
  ) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.retrieveBrand(brandId);

    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    // Get the brand and the products data with links
    const { data } = await query.graph({
      entity: "product",
      fields: ["brand.*"],
      filters: {
        id: {
          $in: productIds,
        },
      },
    });

    // check if the another brand is already linked to the products
    // if product has another brand linked, we dismiss the link
    // if data[0].brand is undefined, we don't have to dismiss any links because the product doesn't have any brand linked

    if (typeof data[0].brand !== "undefined") {
      const productIdsWithBrand = data.map((d: any) => {
        const brandIds = Array.isArray(d.brand)
          ? d.brand.map((b) => b.id) // Jeśli d.brand jest tablicą, mapujemy po jej elementach
          : [d.brand.id]; // Jeśli to obiekt, tworzymy tablicę z jednym elementem

        return {
          product_id: d.id as string,
          brand_id: brandIds as string[],
        };
      });
      logger.info("Dismissing links to other brands");

      // We create an array of links to dismiss
      const linksToDismiss = [];
      for (const product of productIdsWithBrand) {
        if (product.brand_id.length > 0) {
          for (const brandId of product.brand_id) {
            linksToDismiss.push({
              [Modules.PRODUCT]: {
                product_id: product.product_id,
              },
              [BRAND_MODULE]: {
                brand_id: brandId,
              },
            });
          }
        }
      }

      // Dismiss the links
      if (linksToDismiss.length > 0) {
        await remoteLink.dismiss(linksToDismiss);
      }
    }

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
      logger.info(`Linking product ${id} to brand ${brandId}`);
    }

    await remoteLink.create(links);

    logger.info("Linked brand to products");

    return new StepResponse(links, links);
  }
);
