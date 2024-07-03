const catchError = require("../utils/catchError");
const ProductImg = require("../models/ProductImg");
const path = require("path");
const fs = require("fs");
const getAll = catchError(async (req, res) => {
  const results = await ProductImg.findAll();
  return res.json(results);
});
const create = catchError(async (req, res) => {

  const { filename } = req.file;

  const imageDB = await ProductImg.findOne({ where: { filename } });
  if (imageDB) return res.sendStatus(404);
  const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`;
  //console.log(url)
  const result = await ProductImg.create({ filename, url });
  return res.status(201).json(result);

  return res.sendStatus(200);
});
const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await ProductImg.findByPk(id);
  //const result = await ProductImg.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  console.log(__dirname);
  //../public/uploads/archivo
  const imageFilePath = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    result.filename
  );
  //console.log(imageFilePath);
  fs.unlinkSync(imageFilePath);
  await result.destroy();
  return res.sendStatus(204);
});
module.exports = {
  getAll,
  create,
  remove,
};