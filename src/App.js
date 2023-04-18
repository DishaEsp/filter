// import logo from './logo.svg';
// import './App.css';
import { useState , useEffect } from 'react';
import Filter from './Components/Filter';
import FilterAgain from './Components/FilterAgain';
import config from './config';
import Cart from './Components/Cart';
const Api_url = config.Api_url

function App() {
//   const cartFromLocalStorage= JSON.parse(localStorage.getItem("cart"))
// console.log("cartFromLocalStorage " , cartFromLocalStorage) 
// if(cartFromLocalStorage.length>0){
// cartFromLocalStorage.map((cartItems)=>{
//   console.log(cartItems.id)
//   var icc = cartItems.id
// })
// }else{
//   console.log("err")
// }

let arr=[]
  // const [cart, setCart] = useState(cartFromLocalStorage)
  const [cart, setCart] = useState([])
  const handleClick =(item)=>{
arr.push(...cart, item)
setCart(arr)
console.log(arr.length)
   
  }
  useEffect(() => {
    localStorage.setItem("cart" , JSON.stringify(cart))
   }, [cart])



  return (
    <div className="App"  style ={{"width":"1000px"}}>
   {/* <Filter/> */}
   <div>
    <table>
      <thead>
        <tr>
          cart
        </tr>
      </thead>
      <tbody>
        {console.log("'sfd",cart)}
        {cart.length > 0 && cart.map((item)=>{
return(
  <tr>
    <td>
      <img 
      src ={`${Api_url+ item.image}`} style={{"height":"100px","width":"100px"}}></img>
    </td>
  </tr>
) 
        })}
      </tbody>
    </table>
   </div>
   <Cart handleClick ={handleClick}/>
   {/* <FilterAgain handleClick ={handleClick}/> */}
    </div>
  );
}
export default App;




// function App() {
//   const cartFromCookie = parseCookies().cart ? JSON.parse(parseCookies().cart) : []
//   const [cart, setCart] = useState(cartFromCookie)

//   const handleClick = (item) => {
//     const newCart = [...cart, item]
//     setCart(newCart)
//     setCookie('cart', JSON.stringify(newCart), { path: '/' }) // Set the cookie with the new cart items
//   }

//   useEffect(() => {
//     setCookie('cart', JSON.stringify(cart), { path: '/' }) // Update the cookie whenever the cart changes
//   }, [cart])

//   return (
//     <div className="App" style={{ "width": "1000px" }}>
//       <div>
//         <table>
//           <thead>
//             <tr>
//               cart
//             </tr>
//           </thead>
//           <tbody>
//             {cart.length > 0 && cart.map((item, index) => (
//               <tr key={index}>
//                 <td>
//                   <img
//                     src={`${Api_url + item.image}`}
//                     style={{ "height": "100px", "width": "100px" }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Cart handleClick={handleClick} />
//       {/* <FilterAgain handleClick ={handleClick}/> */}
//     </div>
//   );
// }
// export default App;