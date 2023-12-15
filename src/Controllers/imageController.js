const { getFile, uploadNewFile } = require("../Services/imageService");
const path = require("path");
const fs = require("fs");

const imageController = {
  uploadImage: async (req, res) => {
    try {
      console.log("call upload");
      const data = await uploadNewFile(req.file);
      if (!data) throw Error;
      else {
        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/657c16646aaed10725cc/files/${data?.$id}/view?project=657c162ac890feaa8c5a&mode=admin`;
        return res.status(200).json({ url: fileUrl });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getImageUrl: async (req, res) => {
    try {
      const file = await getFile(req.params.id);
      console.log(file);
      return res.status(200).json(file);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = imageController;
