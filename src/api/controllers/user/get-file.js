import { User } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";
import path from "path";
import fs from "fs";

export default async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).catch((err) => {
    return res.status(500).json(errorHelper("00088", req, err.message));
  });

  if (!user) {
    console.log(user);
    return res.status(500).json(errorHelper("00088", req, err.message));
  }
  console.log(user?.photoPath);

  const imagePath = path.join("/image", user?.photoPath);
  console.log(imagePath);
  // fs.readFile(imagePath, null, function (err, data) {
  //   if (!err) {
  //     res.writeHead(200, {
  //       "Content-Type": "image/png",
  //     });
  //     res.end(data);
  //   } else {
  //     console.log(err);
  //   }
  // });
};
