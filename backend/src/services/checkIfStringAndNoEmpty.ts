import { unlink } from "superagent";

export const removeUploadedFile = async (file: ) => {
  try {
    if (file !== undefined) await unlink(`./public/user/${file.filename}`);
  } catch (error) {}
};
