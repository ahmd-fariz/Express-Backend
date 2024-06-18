import { json } from "sequelize";
import Produk from "../models/Produk.js";
import path from "path";
import fs from "fs";

export const getProduk = async (req, res) => {
  try {
    const response = await Produk.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.messagge);
  }
};

export const createProduk = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const harga = req.body.title;
  const deskripsi = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Produk.create({
        name: name,
        harga: harga,
        deskripsi: deskripsi,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Produk Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
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
  const Produk = await Produk.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!Produk) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = Produk.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${Produk.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const harga = req.body.title;
  const deskripsi = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Produk.update(
      { name: name, harga: harga, deskripsi: deskripsi, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Produk Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduk = async (req, res) => {
  const Produk = await Produk.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!Produk) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${Produk.image}`;
    fs.unlinkSync(filepath);
    await Produk.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Produk Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
