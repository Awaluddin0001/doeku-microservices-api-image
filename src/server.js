import multer from "multer";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 60001;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/nomorizinusaha"); // Set your desired folder path here
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop(); //nama untuk filenya
    cb(null, Date.now() + "." + ext);
  },
});
// const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/nomorizinusaha", upload.single("image"), (req, res) => {
  const image = req.file;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  // Here you can process the image (e.g., save to disk, perform manipulations)
  // For example, you can use a library like 'sharp' to process the image.

  // Respond to the client indicating success
  res.status(200).json({ message: "Image uploaded successfully" });
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
