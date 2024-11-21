import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Modal, Form, Input, Table, message, Select } from "antd";
import { useDispatch } from "react-redux";
import {EyeOutlined} from '@ant-design/icons'
import DefaultLayout from "./DefaultLayout";
import BASE_URL from "../config"
import axios from "axios";

function CustomerPage() {


  const [customerData, setCustomerData] = useState([]);
  const dispatch = useDispatch();

    useEffect(() => {
      try {
        const fetchData = async () => {
          dispatch({ type: "showLoading" });
          const response = await axios.get(`${BASE_URL}/api/marketFresh/getAllBills`);
          const customers = response.data;
          customers.reverse()
          setCustomerData(customers);
  
          dispatch({ type: "hideLoading" });
        };
        fetchData();
      } catch (error) {
        dispatch({ type: "hideLoading" });
      }
    }, [dispatch]);
  
  
    const columns = [
        {
          title: " User Id",
          dataIndex: "userId",
        },
        {
          title: "Customer",
          dataIndex: "customerName",
        },
        {
          title: "Phone Number",
          dataIndex: "phoneNumber",
        },
        {
          title: "Date",
          dataIndex: "createdAt",
          render: (createdAt) => createdAt ? new Date(createdAt).toISOString().substring(0,10) : 'N/A',
        }
      ];
      
 
  return (
    <DefaultLayout>
    <div className="d-flex justify-content-between">
      <h3>Customers</h3>

    </div>
    <Table columns={columns} dataSource={customerData} bordered />

  
  </DefaultLayout>
   
  )
}

export default CustomerPage;