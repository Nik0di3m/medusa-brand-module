import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  LinkProductToBrandStepInput,
  linkProductToBrandWorkflow,
} from "src/workflows/create-brand";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { productIds, brandId } = req.body as LinkProductToBrandStepInput;

  console.log("Linking products", productIds, "to brand", brandId);

  const results = await linkProductToBrandWorkflow(req.scope).run({
    input: {
      productIds,
      brandId,
    },
  });

  res.json(results);
};
