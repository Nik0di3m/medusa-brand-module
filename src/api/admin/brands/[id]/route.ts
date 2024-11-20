import { logger, MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const brandModuleService: BrandModuleService =
    req.scope.resolve(BRAND_MODULE);

  const brand = await brandModuleService.retrieveBrand(req.params.id);

  logger.info(`Retrieved brand ${brand.id}`);

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "brand",
    fields: ["product_link.*", "product_link.product.*"],
    filters: {
      id: req.params.id,
    },
  });

  res.json({
    brand: brand,
    products: data,
  });
};
