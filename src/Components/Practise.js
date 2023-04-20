import React ,{useState , useEffect} from "react";

function Practise (){
 
const[categories,setcategories] = useState([])
const[catiD ,setCatId]= useState("")
const [form , setForm] = useState({subcategory_id:"",size_id:""})
const filterData = async(e)=>{
console.log(e.target.value)
 }
 useEffect(()=>{
    categoriess()
},[])
  const categoriess = async()=>{
    let res = await fetch("https://espsofttech.org:6019/api/getAllSubcategories",{

    })
res = await  res.json()
setcategories(res.data)
  }
  const inputHandler = (e) => {
    const { name, value, id } = e.target;

    setForm((old) => {
        return { ...old, [name]: value }
    })

    // getAllItem(e.target.value, e.target.name)
}


return (
    <>
    <select  name="category" id = "categoryId" onChange ={(e)=>{inputHandler(e)}}>
        {categories.length>0 && categories.map((item , i)=>(
            <option value={item.id}   >{item.sub_category_name}</option>
        ))}
          </select>
  <select name="size" id = "sizeId">
    <option>
        hii
    </option>
  </select>
  
  
    
    </>
)
}

 
export default  Practise
