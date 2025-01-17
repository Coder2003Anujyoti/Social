const express = require('express');
const fs=require('fs');
const router = express.Router();
const data=require('./data.json');
const images=require('./images.json')
const cors=require('cors');
const app = express();
app.use(cors({
  origin:"*"
}));
router.post('/check',(req,res)=>{
  const fil=data.filter((i)=>i.name===req.body.name&&i.password===req.body.password&& i.secret===req.body.key);
  if(fil.length==1){
    return res.json({response:true})
  }
  else{
    return res.json({response:false})
  }
})
router.post('/signup', (req, res) => {
  const details={
    id:data.length+1,
    name:req.body.name,
    password:req.body.password,
    post:[],
    secret:new Date().getTime().toString()
  }
  const filter=data.find((i)=>i.password===details.password && i.name===details.name)
  if (filter=== undefined) {
    data.push(details);
      fs.writeFile("./data.json",JSON.stringify(data),(err)=>{
        if(err)
        console.log(err)
      });
      return res.status(201).json({otp:"Successful SignUp",
      key:details.secret
      });
  }
  if(filter!= undefined){
    return res.status(201).json({otp:"Credentials are already in use Please change it"});
  }
});
router.post('/login', (req, res) => {
  const filter=data.find((i)=>i.password===req.body.password && i.name===req.body.name)
  if (filter=== undefined) {
      return res.status(201).json({otp:"Please SignUp first or check your credentials"});
  }
  if(filter!= undefined){
    return res.status(201).json({otp:"Success",key:filter.secret});
  }
});
module.exports = router;