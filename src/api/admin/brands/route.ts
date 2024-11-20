import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { skip } from "node:test";
import { BRAND_MODULE } from "src/modules/brand";
import BrandModuleService from "src/modules/brand/service";
import {
  CreateBrandInput,
  createBrandWorkflow,
} from "src/workflows/create-brand";

// This is the router for the brand module
// is in the path src/api/admin/brands/route.ts
// /admin/* is the path for the admin routes and need to be authenticated to access

// This is the route for creating a brand if is POST request
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { name, description } = req.body as CreateBrandInput;
  // We use the createBrandWorkflow to create a brand
  const result = await createBrandWorkflow(req.scope).run({
    input: {
      name: name,
      description: description,
    },
  });

  res.json({
    brand: result,
  });
};

// This is the route for getting a brand if is GET request
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const brandModuleService: BrandModuleService =
    req.scope.resolve(BRAND_MODULE);

  const limit = req.query.limit || 15;
  const offset = req.query.offset || 0;

  const [brands, count] = await brandModuleService.listAndCountBrands(
    {},
    {
      skip: offset as number,
      take: limit as number,
    }
  );

  res.json({
    brands,
    count,
    limit,
    offset,
  });
};
