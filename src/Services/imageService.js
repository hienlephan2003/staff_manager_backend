const {
  ID,
  InputFile,
  Client,
  Storage,
  Role,
  Permission,
} = require("node-appwrite");
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("657c162ac890feaa8c5a")
  .setKey(
    "16938839ad6e4166b96e2a6a900ef6162d4065f2ff3ed78670953cfcc945ab4f345468f843c962ea340b2dffa6b28be114e9a92bf35a73df1a5b5caedf07b241c2e08bbe21f8a6bd83f8fe5110d3ac6252c1948fb4c0e432af474a0274176d6f546641eee75933cd94827142581469e9d1322863d223b57d9911ddc7863a4705"
  )
  .setSelfSigned();
const storage = new Storage(client);

const uploadNewFile = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(file);
      const uploadFile = await storage.createFile(
        "657c16646aaed10725cc",
        ID.unique(),
        file,
        [
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );
      resolve(uploadFile);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
const getFile = async (fileId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileUrl = await storage.getFileDownload(
        "657c16646aaed10725cc",
        fileId
      );
      resolve(fileUrl);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
module.exports = { uploadNewFile, getFile };
