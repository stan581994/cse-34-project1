const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contact) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  });
};

const getById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((contact) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  });
};

const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(newContact);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while creating the contact");
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .updateOne({ _id: userId }, { $set: updatedContact });

  if (result.modifiedCount === 1) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while updating the contact");
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId });

  if (result.deletedCount === 1) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while deleting the contact");
  }
};

module.exports = {
  getAll,
  getById,
  createContact,
  updateContact,
  deleteContact,
};
