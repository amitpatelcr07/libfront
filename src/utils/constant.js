function Profile(props) {
  console.log("Profile props:", props);
  return <div>
    <h1>Profile Component</h1>
  </div>;
} 

const App=()=>{
  let obj={name:"amit",age:24};
  return <div>
    <Profile name={obj.name} age={obj.age}/>
  </div>;
}


const Bpp=()=>{
   let obj = { name: "amit", age: 24 };
   return (
     <div>
       <Profilee {...obj} />
     </div>
   );
}
function Profilee({name,age}) {   



  console.log("Profilee props:", {name,age});                                             
  return <div>
    <h1>Profilee Component - Name: {name}, Age: {age}</h1>
  </div>

}