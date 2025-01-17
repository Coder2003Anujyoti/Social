import React,{useState,useRef} from "react";

const Write = ({names,imp}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description,setDescription]=useState("");
  const fileInput=useRef(null);
  const addData=async()=>{
    if (!selectedFile && !description) {
      alert("Input required");
    }
    if(selectedFile && description){
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("description",description);
    formData.append("name",names);
    formData.append("password",imp);
    const response = await fetch("http://localhost:8000/items", {
        method:"POST",
        body:formData,
        
      });
     const data=await response.json();
     alert("Uploaded Successfully");
       setSelectedFile(null);
       setDescription("");
       fileInput.current.value="";
    }
  }
  return (
    <>
 <div className="bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold  flex flex-col items-center justify-evenly text-2xl drop-shadow-xl">
   <h1>Want to add new Post</h1>
 </div>
 <div className="p-2 bg-gradient-to-bl from-slate-200 to-white bg-clip-text text-transparent font-extrabold  flex flex-col  items-center text-lg drop-shadow-xl gap-y-4">
   <h2>Choose the image</h2>
     <div className="w-full flex justify-center text-center items-center"><input type="file" ref={fileInput} accept="image/*"  className="text-md outline-none" onChange={(e)=>setSelectedFile(e.target.files[0])}></input></div>
      <h2>Enter the text</h2>
  <div className="w-full flex justify-center"> <textarea value={description} className="text-black focus:outline-none p-8 rounded-lg h-36" placeholder="Enter the description..." onChange={(e)=>setDescription(e.target.value)}></textarea></div>
 <div className=" p-4 font-extrabold  flex flex-col  justify-center text-lg ">
<div className="w-full flex justify-center"><button className="px-8 py-2 rounded-xl text-lg bg-sky-400 text-white font-bold" onClick={addData}>Submit</button></div>
 </div>
 </div>
 </>
  );
};


export default Write;
