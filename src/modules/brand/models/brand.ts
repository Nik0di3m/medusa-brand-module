import { model } from "@medusajs/framework/utils";

// This is Brand model that will be used to create a table in the database
// More information about the model can be found here: https://docs.medusajs.com/resources/references/data-model

export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
  description: model.text(),
});
