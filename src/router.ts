import { Router } from "express";
import { body } from "express-validator";
import { handleInputError } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";

const router = Router();

/**
 * Products
 */

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Updates
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),

  () => {}
);
router.put(
  "/update/:id",
  body("title").isString(),
  body("body").isString(),
  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update Point
 */

/**
 * Updates
 */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updatedId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
