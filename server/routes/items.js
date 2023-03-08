import express from "express";
import { createItem } from "../controllers/itemList.js";
import { UpdateItem } from "../controllers/itemList.js";
import { deleteItem } from "../controllers/itemList.js";
import { GetItems } from "../controllers/itemList.js";
import { GetItem } from "../controllers/itemList.js";
const router = express.Router();

//create
router.post("/", createItem);
//update
router.patch("/:id", UpdateItem);
//delete
router.delete("/:id", deleteItem);
//get item
router.get("/", GetItems);

router.get("/find/:id", GetItem);

export default router;
