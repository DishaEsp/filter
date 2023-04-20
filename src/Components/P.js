import react from "react";
import React, { useEffect, useState } from "react";
import config from "../config";
const Api_url = config.Api_url;

function FilterData({ handleClick }) {
  const [data, setData] = useState([]);
  const [alldata, setallData] = useState([]);
  const [filterSizeFilter, setFilterSize] = useState([]);
  const [categoriess, setcategories] = useState([]);
  const [size, setSize] = useState([]);
  const [defaultvalue, setDefault] = useState([]);
  const [selectedCategory , setSelectedCategory] = useState("")
  const [inputData , setInputData] = useState({
    category:"",
    size:""
  })
  const [form, setForm] = useState({subcategory_id:4, size_id:2});
  useEffect(() => {
    allData();
    filterSizeMore();
    categories();
    sizes();
  }, []);

  const allData = async () => {
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllItemByFilter",
      {}
    );
    res = await res.json();
    await setallData(res.data);
    let newArray = await res.data.filter(function (el)
    {
      return el.subcategory_id == form.subcategory_id && el.size_id == form.size_id;
    })
    setData(newArray);
    // console.log(newArray)
  };


  const filter = async (item, i) => {
    console.log("item" , item , "i" , i  )
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllItemByFilter",
      {}
    );
    res = await res.json();
    if (item) {
      let result = res.data.filter((k) => k.subcategory_id == item ) ;
      setData(result);
      console.log(result)
    } else {
      setData(res.data);
    }
  };

  const filterSizeMore = async (i) => {
    let itemValue = localStorage.getItem("itemvalue");
    if (i) {
      let result2 = data.filter(
        (size) => size.size_id == i && size.subcategory_id == itemValue
      );
      setFilterSize(result2);
    } else {
      setFilterSize(data);
    }
  };

  const filterData = async (e) => {

  await  filter(e.target.value);
  console.log(e.target.value)
    localStorage.setItem("itemvalue", e.target.value );
  };

  const filterSize = async function (e) {
   await filter("", e.target.value);
    filterSizeMore(e.target.value);
  };



  const categories = async () => {
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllSubcategories",
      {}
    );
    res = await res.json();
    setcategories(res.data);
  };
  const sizes = async () => {
    let res = await fetch("https://espsofttech.org:6019/api/getsize", {
      method: "post",
    });
    res = await res.json();
    setSize(res.data);
  };

  return (
    <>
      <select name="category" id="categoryId" value={inputData.category} onChange={filterData}>
        {categoriess.map((opt, i) => (
          <option value={opt.id}>{opt.sub_category_name}</option>
        ))}
      </select>
      <select name="Size" id="sizeId" onChange={filterSize} value={inputData.size}>
        {size.map((data, i) => (
          <option value={data.id}>{data.size}</option>
        ))}
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

export default FilterData;
