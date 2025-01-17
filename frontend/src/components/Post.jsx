
import React, {useState,useEffect} from "react";
const Post = ({names,imp}) => {
  const [items,setItems]=useState([]);
   const [loads,setLoads]=useState(false);
   const [offset,setOffset]=useState(0);
   const [load,setLoad]=useState(true);
   const [imageslength,setImageslength]=useState(1);
   const [likeDisable,setLikeDisable]=useState([]);
   const [commentid,setCommentid]=useState([]);
   const [commentdata,setCommentdata]=useState([]);
   const [commentoffset,setCommentoffset]=useState(0);
   const [commentlength,setCommentlength]=useState(1);
   const [text,setText]=useState("")
  const getaliens=async()=>{
     const res=await fetch(`https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/api/values?offset=${offset}&limit=5`);
     const data =await res.json();
         setLoad(false);
         setLoads(false);
         setItems([...items,data.datas]);
         setImageslength(data.length);
   }
   const getlike=async(it)=>{
     const res=await fetch("https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/likes", {
    method:"PUT",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(it)
});
 const val=await res.json();
  const foundlikes=likeDisable.find((i)=>i.id===it.id)
  if(foundlikes!=undefined){
   const likes=likeDisable.map((i)=>{
     if(i.id==it.id){
       i.like=val.like;
       i.dislike=val.dislike;
     }
     return {...i};
   })
   setLikeDisable(likes)
  }
  else{
    const likedata={
     id:it.id,
     like:val.like,
     dislike:val.dislike,
   }
   setLikeDisable([...likeDisable,likedata])
  }
   }
   useEffect(()=>{
     if(offset<imageslength){
       getaliens()
     }},[offset])
    const inc=()=>{
      setLoads(true);
      setOffset(offset+5);
    }
  const reply=(i,k)=>{
    if(!commentid.includes(i)){
      view(k);
      setCommentid([i]);
      setText("")
    }
    if(commentid.includes(i)){
      let k=commentid.filter((it)=>it!=i)
      setCommentid(k)
      setCommentoffset(0);
    }
  }
  const addc=async(i)=>{
    if(i.comment.trim()!=''){
    const res=await fetch(`https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/comments?offset=${commentoffset}&limit=3`, {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(i)
});
const data=await res.json();
setCommentdata(data.data);
 setCommentlength(data.length)
}
}
const view=async(i)=>{
  const res=await fetch(`https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/comments?offset=${i.offset}&limit=3`, {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(i)
});
 const data=await res.json();
 setCommentdata(data.data);
 setCommentlength(data.length)
}
const addcomm=(i)=>{
  addc(i);
  setText("");
}
const inccomment=(i)=>{
  view(i);
  setCommentoffset(commentoffset+3)
}
const deccomment=(i)=>{
  view(i);
  setCommentoffset(commentoffset-3)
}

  return (
    <>
 <div>
 <h1 className="bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold  flex flex-col items-center justify-evenly text-2xl drop-shadow-xl">Looking For Posts </h1>
 </div>

{load===true && <> <div><h4 className="bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold  flex flex-col items-center justify-evenly text-sm drop-shadow-xl p-8">Page is Loading....</h4></div>  </>}
<div className="my-4 flex justify-around flex-wrap gap-y-4 md:flex md:flex-row md:flex-wrap  md:justify-start md:mx-16 md:gap-x-2">
  {load===false && imageslength===0 &&
    <div>
      <h4 className="bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold  flex flex-col items-center justify-evenly text-sm drop-shadow-xl p-8">No Data found</h4>
    </div>
  }
  {load===false && items.map((i,ind)=>{
  
    return(<>
      {i.map((item)=>{return(<>
              <div className="bg-white rounded-lg text-center p-1 gap-y-2 border shadow-lg shadow-indigo-500/30  font-bold " >
 <div className="w-full  flex flex-row items-center gap-x-2 text-white text-base ">
   <img src="images/Profile.webp" className="h-8 w-8"></img>
   <p className="text-black font-extrabold text-base drop-shadow-xl gap-8 lg:p-2">{item.name}</p>
      {commentid.includes(item.id) &&  <div className="w-full flex justify-end">
      <button onClick={()=>setCommentid([])}className=" text-xl text-black font-bold">X</button>
      </div>
      }
   </div>
    {!commentid.includes(item.id) && <>  <div className="w-full  my-2 text-start flex justify-start"><p className="text-black text-base">{item.description}</p></div>
      <div className="w-full  my-2 text-start flex justify-center">  <img src={item.image} className="my-2 lg:p-8" /></div>
      <div className="flex flex-row justify-around">
      <div className="flex flex-row gap-x-1">
        <img src="images/heart.png" onClick={()=>getlike({id:item.id,type:"like",name:names})} className="h-8 w-8"></img>
        <p>{(likeDisable.map((i)=>{
        if(i.id===item.id){
          return(<p>{i.like}</p>)
        }
        }))}</p>
      </div>
            <div className="flex flex-row gap-x-1.5">
        <img src="images/broken-heart.png"className="h-8 w-8" onClick={()=>getlike({id:item.id,type:"dislike",name:names})}></img>
        <p>{(likeDisable.map((i)=>{
        if(i.id===item.id){
          return(<p>{i.dislike}</p>)
        }
        }))}</p>
        
      </div>
      <div className="flex flex-row gap-x-1.5">
        <img className="h-8 w-8" onClick={()=>reply(item.id,{id:item.id,comment:'',name:'',offset:commentoffset})}src="images/chat-bubble.png"></img>
      </div>
      </div>
      </>}
    {commentid.includes(item.id) && <>
      <div className="flex justify-center my-4">
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Add Comments..." className="bg-black px-2 py-2 rounded-l-lg font-bold  text-lg text-white focus:outline-none"></input>
 <button onClick={()=>addcomm({id:item.id,comment:text,name:names})} className="px-2 py-2 rounded-r-lg text-lg bg-sky-400 text-white font-bold">Add</button>
 </div>

    <div className="flex justify-around flex-col gap-y-2">
    {commentdata.map((i)=>{
      return(<>
        <div className="flex flex-col border-2
      gap-y-2 border-t-transparent border-r-transparent border-l-transparent border-b-indigo-400 gap-y-2">
        <div className="w-full  flex flex-row items-center text-black ">
        <img src="images/Profile.webp" className="h-8 w-8"></img>
        <p className="text-xs">{i.name}</p>
        </div>
      <div className="w-full text-start px-1">
        <p>{i.comment}</p>
      </div>
      </div>
      </>)
    })}
    </div>
    <div className="w-full  flex flex-row p-2 justify-evenly">
   {commentoffset>0 && <img src="images/minus.png" className="w-8 h-8" onClick={()=>deccomment({id:item.id,comment:'',name:'',offset:commentoffset-3})}></img>}
      {commentoffset<commentlength-3 &&  <img src="images/plus.png" onClick={()=>inccomment({id:item.id,comment:'',name:'',offset:commentoffset+3})} className="w-8 h-8"></img>}
        </div>
    </>}
      </div>
      </>)})}
      {ind==items.length-1 && imageslength!=0 && offset<imageslength-5&& <div className="w-full flex justify-center">
        {loads==false &&<button onClick={inc} className="my-2 px-8 py-2 rounded-lg text-lg bg-sky-400 text-white font-bold">More Pages</button>}
        {loads===true && <h4 className="text-white font-extrabold text-sm p-2 ">Page is Loading...</h4>}
        </div>
      }
    </>)
  }) }
</div>
 </>
  );
};

export default Post;
