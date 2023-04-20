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
  const [form, setForm] = useState({subcategory_id:8, size_id:24});
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
    let newArray = await res.data.filter((el)=>el.subcategory_id == form.subcategory_id && el.size_id == form.size_id)
    setData(newArray);
    console.log(newArray)
  };

  const filter = async (item, iiii) => {
    console.log(item)
    console.log(iiii)
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllItemByFilter",
      {}
    );
    res = await res.json();
    if (res) {
      let result = res.data.filter((k) => k.subcategory_id == item && k.size_id == form.size_id ) ;
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
        (size) => size.size_id == i && size.subcategory_id == form.size_id);
      setFilterSize(result2);
    } else {
      setFilterSize(data);
    }
  }

  const filterData = async (e) => {
    console.log('ddddddddddddddd')

  await  filter(e.target.value , "");
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
    setcategories(res.data)
  };
  const sizes = async () => {
    let res = await fetch("https://espsofttech.org:6019/api/getsize", {
      method: "post",
    });
    res = await res.json();
    setSize(res.data)
  };

  return (
    <>
      <select name="category" id="categoryId" onChange={(e) => filterData(e)}>
        {categoriess.map((opt, i) => (
          <option value={opt.id}>{opt.sub_category_name}</option>
        ))}
      </select>
      <select name="Size" id="sizeId" onChange={(e) => filterSize(e)}>
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
          {data.length > 0 &&
            data.map((item, i) => {
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
