import React, { useEffect, useState } from "react";
import config from "../config";
const Api_url = config.Api_url;

function FilterAgain({ handleClick }) {
  const [data, setData] = useState([]);
  const [filterSizeFilter, setFilterSize] = useState([]);

  // const [categoriess, setcategories] = useState([]);

  useEffect(() => {
    filter();
    filterSizeMore();
    // categories();
  }, []);
  const filter = async (item, i) => {
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllItemByFilter",
      {}
    );
    res = await res.json();
    if (item) {
      let result = res.data.filter((k) => k.subcategory_id == item);
      setData(result);
      console.log("result1", result);
    } else {
      setData(res.data);
    }
  };

  const filterSizeMore = async (i) => {
    let itemValue = localStorage.getItem("itemvalue");
    console.log("itemValue", itemValue);
    console.log("iiiiiiiiii", i);
    if (i) {
      let result2 = data.filter(
        (size) => size.size_id == i || size.subcategory_id == itemValue
      );
      console.log("result2", result2);
      setFilterSize(result2);
    } else {
      setFilterSize(data);
    }
  };
  //  console.log(filterSizeFilter)
  const filterData = async (e) => {
    filter(e.target.value, "");
    localStorage.setItem("itemvalue", e.target.value);
  };

  const filterSize = function (e) {
    filter("", e.target.value);
    filterSizeMore(e.target.value);
    // console.log(e.target.value)
  };
  // const categories = async () => {
  //   let res = await fetch(
  //     "https://espsofttech.org:6019/api/getAllSubcategories",
  //     {}
  //   );
  //   res = await res.json();
  //   console.log("res", res.data);
  //   setcategories(res.data);
  // };
  //  console.log(categoriess.length)
  //  {categoriess.length>0 && categoriess.map((item,i)=>{
  return (
    <>
 
      <select
        name="category"
        id="categoryId"
        onChange={(e) => filterData(e)}>
           <option value="4"> Tshirt</option>
              <option value="6">Shirt</option>
              <option value="8">Jeans</option>
              <option value="9 ">Trousers</option>
              <option value="13">Shoes</option>
              <option value="12">formal Shoes</option> 
      </select>
      <select name="Size" id="sizeId" onChange={(e) => filterSize(e)}>
        <option value="1">small</option>
        <option value="2">medium</option>
        <option value="8">large</option>
        <option value="9 ">extra large</option>
        <option value="13">extra extra large</option>
        <option value="12">extra extra extra large</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {filterSizeFilter.length > 0 &&
            filterSizeFilter.map((item, i) => {
              return (
                <tr>
                  <td>
                    <a>
                      <img
                        src={`${Api_url + item.image}`}
                        style={{ width: "100px" }}
                      ></img>
                      <button onClick={() => handleClick(item)}>
                        add to cart
                      </button>
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
    // })}
  );
}

export default FilterAgain;
