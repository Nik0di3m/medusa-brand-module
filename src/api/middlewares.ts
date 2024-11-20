import { defineMiddlewares } from "@medusajs/medusa";
import { z } from "zod";

// This is the middleware for the products module that validates the brand_id
// This allow pass the brand_id as a query parameter in the request
// More info: https://docs.medusajs.com/learn/customization/extend-models/extend-create-product#1-allow-passing-the-brand-id-in-additional-data

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        // @ts-ignore
        brand_id: z.string().optional(),
      },
    },
  ],
});
