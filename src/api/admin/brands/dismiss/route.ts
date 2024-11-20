import { logger, MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  DismissProductFromBrandInput,
  dissMissProductFromBrandWorkflow,
} from "src/workflows/dismiss-brand";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { productIds, brandId } = req.body as DismissProductFromBrandInput;

  logger.info("Dismissing products");

  const results = await dissMissProductFromBrandWorkflow(req.scope).run({
    input: {
      productIds,
      brandId,
    },
  });

  res.json(results);
};
