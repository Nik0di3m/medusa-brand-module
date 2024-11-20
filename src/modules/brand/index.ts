import { Module } from "@medusajs/framework/utils";
import BrandModuleService from "./service";

export const BRAND_MODULE = "brandModuleService";

export default Module(BRAND_MODULE, {
  service: BrandModuleService,
});
