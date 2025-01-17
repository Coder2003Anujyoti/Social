import React,{useState,useEffect} from "react";
import Profile from './Profile.jsx';
const Login = () => {
  const [data,setData]=useState("");
  const [disable,setDisable]=useState(false);
  const [names,setNames]=useState("");
  const [imp,setImp]=useState("");
  const [number,setNumber]=useState("");
  const [secret,setSecret]=useState("");
  const [type,setType]=useState("password");
  const adds=async(item)=>{
    const res=await fetch("http://localhost:8000/signup", {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(item)
});
 const mes=await res.json();
 alert(mes.otp)
 if(mes.otp=="Successful SignUp"){
 setSecret(mes.key);
 }
  };
  const addl=async(item)=>{
    const res=await fetch("http://localhost:8000/login", {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(item)
});
 const mes=await res.json();
 if(mes.otp==='Success'){
   setType("password");
   setNames(data);
   setImp(number);
   setDisable(true);
   setNumber("");
   setData("");
   setSecret(mes.key)
 }
 else{
   alert(mes.otp);
 }
  };
  const add=()=>{
    if(data.trim()!='' && number.trim()!=''){
    adds({name:data,password:number})
    }
    else{
      alert("Input is required")
    }
  }
  const access=()=>{
    if(data.trim()!='' && number.trim()!=''){
    addl({name:data,password:number})
    }
    else{
      alert("Input is required")
    }
  }
  return (
    <>
      {disable==false && <>
<div className="w-full p-16 bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold  flex flex-col items-center gap-y-4 justify-evenly text-2xl drop-shadow-xl text-center xl:p-4">
  <h1>Welcome to Social</h1>
<p className="text-sm">Please SignUp if you are new User else Login if you are existing user.</p>
   <div className="flex justify-center text-lg"><h4>Enter Username</h4></div>
  <input type="text" value={data} onChange={(e)=>setData(e.target.value)}placeholder="Enter your Name..." className="font-bold rounded-lg text-lg text-slate-800 focus:outline-none p-2"></input>
     <div className="flex justify-center text-lg"><h4>Enter Password</h4></div>
  <input type={type} value={number} onChange={(e)=>setNumber(e.target.value)}placeholder="Enter your Password..." className="font-bold rounded-lg text-lg text-slate-800 focus:outline-none p-2"></input>
  {type=="password"?<button className="px-8 py-2 rounded-xl text-lg bg-sky-400 text-white" onClick={()=>setType("text")}>Show Password</button>:<button className="px-8 py-2 rounded-xl text-lg bg-sky-400 text-white"onClick={()=>setType("password")}>Hide Password</button>}
  <div className="flex flex-row gap-x-4">
<button className="px-8 py-2 rounded-xl text-lg bg-indigo-400 text-white" onClick={add}>SignUp</button>
<button className="px-8 py-2 rounded-xl text-lg bg-indigo-400 text-white" onClick={access}>Login</button>
  </div>
{secret!="" && <h5 className="text-sm">Generated OTP-:{secret}</h5>}
</div>
</>}
{disable==true && <Profile setDisable={setDisable} names={names} imp={imp} secret={secret} setSecret={setSecret} /> }
</>
  );
};

export default Login;
