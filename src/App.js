
/* import { useState , useEffect } from 'react';
// import Filter from './Components/Filter';
// import FilterAgain from './Components/FilterAgain';
// import config from './config';
// import Cart from './Components/Cart';
// import Cookies from 'js-cookie';

// const Api_url = config.Api_url

// function App() {
//   const cartFromCookie = Cookies.getJSON('cart') || [];
//   const [cart, setCart] = useState(cartFromCookie)

//   const handleClick =(item)=>{
//     const newCart = [...cart, item];
//     setCart(newCart);
//     Cookies.set('cart', JSON.stringify(newCart));
//   }
  
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
//       {/ <FilterAgain handleClick ={handleClick}/> /}
//     </div>
//   );
// }
// export default App;*/ 

import { useState , useEffect } from 'react';
import Filter from './Components/Filter';
import FilterAgain from './Components/FilterAgain';
import config from './config';
import Cart from './Components/FilterData';
import FilterData from './Components/FilterData';
const Api_url = config.Api_url

function App() {
  var cartFromLocalStorage= JSON.parse(localStorage.getItem("cart"))
  console.log("cartFromLocalStorage " , cartFromLocalStorage) 

  let arr=[]
  const [cart, setCart] = useState(cartFromLocalStorage || []) // set cart to empty array if cartFromLocalStorage is null

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
      <div>
        <table>
          <thead>
            <tr>
              cart
            </tr>
          </thead>
          <tbody>
            {console.log("'sfd",cart)}
            {cart && cart.length > 0 && cart.map((item)=>{
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
      <FilterData handleClick ={handleClick}/>
    </div>
  );
}

export default App;