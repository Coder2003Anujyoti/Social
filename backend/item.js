const express = require('express');
const fs=require('fs');
const router = express.Router();
const data=require('./images.json');
const cors=require('cors');
const app = express();
app.use(cors({
  origin:"*"
}));
router.get('/values',(req,res)=>{
  return res.status(201).json(data);
})
router.post('/comments',(req,res)=>{
  const limit = parseInt(req.query.limit)||1
  const offset = parseInt(req.query.offset)||0
if(isNaN(limit) && limit<=0){
  return res.status(400).json({error:"Limit must be a positive number."})
}
if(isNaN(offset) && offset<0){
  return res.status(400).json({error:"Offset must be a non-negative number."})
}
  for(let i=0;i<data.length;i++){
    if(data[i].id===req.body.id && req.body.comment.trim()!=''){
      data[i].comments.unshift({name:req.body.name,comment:req.body.comment})
    }
  }
  const getcomments=data.find((i)=>i.id===req.body.id);
  fs.writeFile("./images.json",JSON.stringify(data),(err)=>{
        if(err)
        console.log(err)
      });
    console.log(getcomments)
    return res.status(201).json({
      data:getcomments.comments.slice(offset,offset+limit),
      length:getcomments.comments.length
    })
})
router.put('/likes',(req,res)=>{
  var likecount=0;
  var dislikecount=0;
  if(req.body.type=="like"){
    const datas=data.map((i)=>{
      if(i.id===req.body.id){
      if(i.dislike.includes(req.body.name)){
        const k=i.dislike.filter((it)=>it!==req.body.name);
        i.dislike=k
      }
      if(i.like.includes(req.body.name)){
       
      return {...i};
      }
      else{
        i.like.push(req.body.name);
       
        return {...i};
      }
      }
      else{
       
        return {...i};
      }
    })
    const dislikecount=datas.map((i)=>{
          if(i.id===req.body.id){
            return i.dislike.length
          }
  })
  const likecount=datas.map((i)=>{
          if(i.id===req.body.id){
            return i.like.length
          }
  })
  fs.writeFile("./images.json",JSON.stringify(datas),(err)=>{
        if(err)
        console.log(err)
      });
   return res.json({like:likecount,dislike:dislikecount})
  }
  if(req.body.type=="dislike"){
    const datas=data.map((i)=>{
      if(i.id===req.body.id){
      if(i.like.includes(req.body.name)){
        const k=i.like.filter((it)=>it!==req.body.name);
        i.like=k;
      }
      if(i.dislike.includes(req.body.name)){
      return {...i};
      }
      else{
        i.dislike.push(req.body.name);
        return {...i};
      }
      }
      else{
        return {...i};
      }
    })
  const dislikecount=datas.map((i)=>{
          if(i.id===req.body.id){
            return i.dislike.length
          }
  })
  const likecount=datas.map((i)=>{
          if(i.id===req.body.id){
            return i.like.length
          }
  })
  fs.writeFile("./images.json",JSON.stringify(datas),(err)=>{
        if(err)
        console.log(err)
      });

   return res.json({like:likecount,dislike:dislikecount})
  }
})
router.get('/api/values',(req,res)=>{
  const limit = parseInt(req.query.limit)||1
  const offset = parseInt(req.query.offset)||0
if(isNaN(limit) && limit<=0){
  return res.status(400).json({error:"Limit must be a positive number."})
}
if(isNaN(offset) && offset<0){
  return res.status(400).json({error:"Offset must be a non-negative number."})
}
return res.json({
  datas:data.slice(offset,offset+limit),
  length:data.length
})
})
module.exports=router;