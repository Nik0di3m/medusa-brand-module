import { MedusaService } from "@medusajs/framework/utils";
import { Brand } from "./models/brand";

// This class is used to define the service methods for the Brand module
// Class have default methods like create, delete, list... and you can add custom methods
// You can also override the default methods
// The service class is used in the controller to access the database
// More info: https://docs.medusajs.com/resources/service-factory-reference

class BrandModuleService extends MedusaService({
  Brand,
}) {}

export default BrandModuleService;
