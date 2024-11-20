
<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Brand Module for Medusa.js
</h1>

## Module Description

The **brand** module extends the functionality of the Medusa.js platform by enabling the management of brands and their associations with products. Additionally, the module adds a new UI view to the admin panel, utilizing animations from `framer-motion` for modal components.

## Features

- Manage brands.
- Associate brands with products.
- Enhance the admin panel with a new UI view.
- Use animated modal components powered by `framer-motion`.

## Requirements

Before installation, ensure the following dependencies are installed in your project:

- `framer-motion`
- `zod`
- `react-hook-form`
- Resolver `zod` for `react-hook-form`

Install the required dependencies with:

```bash
npm install framer-motion zod react-hook-form @hookform/resolvers
```

## Installation

1. Copy the **brand** module into the `src/modules` directory of your Medusa.js project.
2. Configure the module in the `medusa-config.js` file.

## Configuration

Add the **brand** module to your Medusa.js configuration:

```javascript
{
  resolve: "./src/modules/brand",
},
```

## How to Use

1. Once installed and configured, a new section for managing brands will appear in the admin panel.
2. Use the interface to create, edit, and delete brands and associate them with products.
3. The animated modal component ensures a smooth and intuitive user experience for editing elements.

## Example Integration

Associating brands with products in the backend:

```javascript
// Example of adding a brand to a product
const productService = medusaContainer.resolve("productService");

await productService.update(productId, {
  brand_id: brandId,
});
```

## UI Development with Animated Modal

Using `framer-motion` for the modal:

```jsx
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="modal">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  </motion.div>
);
```

## Contributing

If you find issues or have suggestions for improving the module, feel free to open an issue or create a pull request.
