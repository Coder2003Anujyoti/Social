const express = require('express');
const fs=require('fs');
const multer=require('multer');
const router = express.Router();
const data=require('./data.json');
const img=require('./images.json');
const path = require("path");
const cors=require('cors');
const app = express();
app.use(cors({
  origin:"*"
}));
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/; // Allowed file types
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});
router.post("/items", upload.single("image"), (req, res) => {
  const details={
    image: `https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/uploads/${req.file.filename}`,
    description:req.body.description,
    like:[],
    dislike:[],
    comments:[],
  }
  const items={
    id:img.length+1,
    name:req.body.name,
    password:req.body.password,
    image: `https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/uploads/${req.file.filename}`,
    description:req.body.description,
    like:[],
    dislike:[],
    comments:[],
  }
  img.unshift(items);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  for(let i=0;i<data.length;i++){
    if(data[i].name===req.body.name && data[i].password===req.body.password){
      data[i].post.push(details);
    }
  }
  fs.writeFile("./data.json",JSON.stringify(data),(err)=>{
        if(err)
        console.log(err)
      });
      fs.writeFile("./images.json",JSON.stringify(img),(err)=>{
        if(err)
        console.log(err)
      });
  return res.status(200).json({msg:"Uploaded Successfully"})

});
module.exports = router;