import express from "express";
import {
  createProduk,
  getProduk,
  getProdukById,
  updateProduk,
  deleteProduk
} from "../controller/ProdukController.js";

const router = express.Router();

router.get("/produks", getProduk);
router.get("/produks/:id", getProdukById);
router.patch("/produks/:id", updateProduk);
router.post("/produks", createProduk);
router.delete("/produks/:id", deleteProduk);

export default router;
