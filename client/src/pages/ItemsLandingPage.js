import React, { useState,useEffect } from "react";
import { Button ,Table} from "antd";
import "../resources/LandingPage.css"; // Make sure to create this CSS file
import { useNavigate } from "react-router-dom";
import  BASE_URL from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
function ItemsLandingPage() {
    const[itemData,setItem]= useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [duplicateItemData, setDuplicateItemData] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        try {
          const fetchData = async () => {
            dispatch({ type: "showLoading" });
            const response = await axios.get(`${BASE_URL}/api/marketFresh/getAllItems`);
            const items = response.data;
            setItem(items);
            setDuplicateItemData(items)
    
            dispatch({ type: "hideLoading" });
          };
          fetchData();
        } catch (error) {
          dispatch({ type: "hideLoading" });
        }
      }, []);
      function filterBySearch() {
        const tempData = duplicateItemData.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setItem(tempData);
      }
      useEffect(() => {
        filterBySearch();
      }, [search]);
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Image",
          dataIndex: "imgUrl",
          render: (imgUrl, record) => (
            <img src={imgUrl} alt="" height="80px" width="80px" />
          ),
        },
        {
          title: "Price",
          dataIndex: "price",
        },
        {
          title: "Category",
          dataIndex: "category",
        },
     ]
  return (
    <div className="item-container" style={{ backgroundColor: 'black' }}>
  <div className="d-flex justify-content-between align-items-center mt-4">
    
    <div className="input-group">
      <input
        type="text"
        className="form-control rounded-pill border-0 shadow-sm"
        placeholder="Search by Name of product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
   
    <div>
   
    <Link to="/login" className="exit-link">
      Login
    </Link>
    <Link to="/register" className="exit-link">
      Register
    </Link>
    <Link to="/" className="exit-link">
      Exit
    </Link></div>
  </div>


    
    
  <div className="d-flex justify-content-center mt-3 landing-items">
  <Table columns={columns} dataSource={itemData} bordered/>
    </div>
    </div>
  )
}

export default ItemsLandingPage