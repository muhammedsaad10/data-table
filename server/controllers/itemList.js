import Item from "../models/Item.js";

//create

export const createItem = async (req, res, next) => {
  const newItem = new Item(req.body);
  console.log("Request", req);
  console.log("RequestBODY", req.body);

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update
export const UpdateItem = async (req, res, next) => {
  console.log("requested changes are ,", req.body);
  try {
    const updateItem = await Item.findByIdAndUpdate(
      req.params.id,

      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateItem);
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete
export const deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json("item is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
//getALLitems

// export const GetItems = async (req, res, next) => {
//   console.log("req.params", req.query);
//   try {
//     const users = await Item.find();

//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export const GetItems = async (req, res, next) => {
  console.log("req.params", req.query);
  try {
    let { page, size, sort } = req.query;

    // If the page is not applied in query
    if (!page) {
      // Make the Default value one
      page = 1;
    }

    if (!size) {
      size = 8;
    }

    //  We have to make it integer because
    // the query parameter passed is string
    const limit = parseInt(size);

    const items = await Item.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Item.countDocuments();
    res.json({
      items,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get one items
export const GetItem = async (req, res, next) => {
  console.log("req.params", req.params.id);
  try {
    const itemData = await Item.findById(req.params.id);
    console.log("item", itemData);
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
};
