import BrandModule from "../modules/brand";
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";

// This code is responsible for linking products to brands.

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand
);
