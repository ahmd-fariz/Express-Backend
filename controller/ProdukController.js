import { json } from "sequelize";
import Produk from "../models/Produk.js";

export const getProduk = async (req, res) => {
  try {
    const response = await Produk.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.messagge);
  }
};

export const createProduk = async (req, res) => {
  try {
    await Produk.create(req.body);
    res.status(201).json({ msg: "Produk Created" });
  } catch (error) {
    console.log(error.messagge);
  }
};

export const getProdukById = async (req, res) => {
  try {
    const response = await Produk.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.messagge);
  }
};

export const updateProduk = async (req, res) => {
  try {
    await Produk.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.messagge);
  }
};
