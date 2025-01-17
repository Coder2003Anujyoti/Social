import React,{useState} from "react";
import Post from './Post.jsx'
import Write from './Write.jsx'
const Profile = ({setDisable,names,imp,secret,setSecret}) => {
  const [state,setState]=useState("posts");
  const [text,setText]=useState("")
  const [disabled,setDisabled]=useState(false);
  const check=async(i)=>{
    const res=await fetch("https://high-darlleen-apisjdjjd-83875e9e.koyeb.app/check", {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(i)
});
  const data=await res.json();
  setDisabled(data.response);
  }
  const add=(i)=>{
    check(i);
      setText("")
  }
  return (
    <>
 <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 flex flex-row items-center ">
   <img src="images/Profile.webp" className="h-16 w-16"></img>
   <p className=" bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold text-lg drop-shadow-xl gap-8 lg:p-2">{names}</p>
   <div className="w-full flex justify-end">
     <button className="px-2 py-2 rounded-xl text-lg  text-white font-bold" onClick={()=>{setDisable(false)
        setSecret("")
     }}>Logout</button>
   </div>
 </div>
   {disabled==false && <div className="flex justify-center my-4">
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write the Generated OTP..." className=" px-2 py-2 rounded-l-lg font-bold  text-lg text-black focus:outline-none"></input>
 <button className="px-2 py-2 rounded-r-lg text-lg bg-sky-400 text-white font-bold" onClick={()=>add({name:names,password:imp,key:text})}>Send</button>
 </div>
   }
 {disabled==true && 
 <>
 <div className="w-full p-4  flex flex-row justify-center gap-x-16">
   <button onClick={()=>setState("posts")} className="focus:border-b-2 focus:border-b-white font-extrabold text-lg text-white drop-shadow-xl ">Posts</button>
   <button onClick={()=>setState("write")} className="focus:border-b-2 focus:border-b-white font-extrabold text-lg text-white drop-shadow-xl ">Uploads</button>
 </div>
 {state=="posts" && <Post names={names} imp={imp}/>}
 {state=="write" && <Write names={names} imp={imp}/>}
  </>
 }
 </>
  );
};

export default Profile;
