import React, { useEffect, useState } from "react";
import config from "../config";
const Api_url = config.Api_url;
function Filter() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async (item ) => {
    console.log(item);
    let res = await fetch(
      "https://espsofttech.org:6019/api/getAllItemByFilter",
      {}
    );
    res = await res.json();
    if (item) {
      let result = res.data.filter((data)=>data.subcategory_id == item)
      setdata(result)
    } else {
      setdata(res.data);
    }
    console.log(data);
  };
  const filterData = async (e) => {

    console.log(e.target.value , "")
    fetchData(e.target.value , "");
  };
  return (
    <div className="container" >
    <div className="filteredData" style={{ "display": "flex", "alignItems" :"center",
     "paddingLeft": "10px"}}>
      <select name="cat" id="category" onChange={(e) => filterData(e)} style={{ "marginLeft": "15px" ,
  "marginRight": "15px"}}>
        <option value="4">T-Shirt</option>
        <option value="6">shirts</option>
        <option value="8">jeans</option>
        <option value="9">Trouser</option>
        <option value="12">FormalShoes</option>
        <option value="13">CasualShoes</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => {
              return (
                <tr>
                  <td>
                    <img
                      src={`${Api_url + item.image}`}
                      style={{ width: "100px" }}
                    ></img>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
export default Filter;
