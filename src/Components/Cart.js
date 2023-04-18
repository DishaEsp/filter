import react from "react";
import React, { useEffect, useState } from "react";
import config from "../config";
const Api_url = config.Api_url;

function Cart({ handleClick }) {
  const [data, setData] = useState([]);
  const [filterSizeFilter, setFilterSize] = useState([]);
  const [categoriess, setcategories] = useState([]);
  const [size, setSize] = useState([]);
  const [defaultvalue, setDefault] = useState([]);

  useEffect(() => {
    filter();
    filterSizeMore();
    categories();
    sizes();
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
  //   console.log(filterSizeFilter);
  const filterData = async (e) => {
    filter(e.target.value, "");
    // console.log(e.target.value);
    localStorage.setItem("itemvalue", e.target.value);
  };

  const filterSize = function (e) {
    filter("", e.target.value);
    filterSizeMore(e.target.value);
  };
  const categories = async () => {
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllSubcategories",
      {}
    );
    res = await res.json();
    // console.log("res", res.data);
    setcategories(res.data);
  };
  const sizes = async () => {
    let res = await fetch("https://espsofttech.org:6019/api/getsize", {
      method: "post",
    });
    res = await res.json();
    setSize(res.data);
    //  let settingDefault=  data.filter((d)=>d.subcategory_id==4)
  };
  // setData(settingDefault)
  // console.log(data)
  // console.log(categoriess.length, categoriess);
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

export default Cart;
