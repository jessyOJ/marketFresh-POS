import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, message, Select } from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "./DefaultLayout";
import axios from "axios";
import  BASE_URL  from "../config";
import '../resources/layout.css'

function ItemsPage() {
  const [itemData, setItem] = useState([]);
  const [addItemsModal, setAddItemsModal] = useState(false);
  const [editItem,setEditItem]= useState(null)
  const [duplicateItemData, setDuplicateItemData] = useState([]);
    const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('pos-user'))
  const isAdmin =user.isAdmin===true
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
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined className="mx-3" onClick={()=>(
            setEditItem(record),
            setAddItemsModal(true)
          )} />
          <DeleteOutlined className="mx-3"  onClick={()=>deleteItem(record)}/>
          
        </div>
      ),
    },
  ];
  async function saveNow(values) {
   if(editItem===null){
    try {
      dispatch({ type: "showLoading" });
      const response = await axios.post(`${BASE_URL}/api/marketFresh/createItem`, values);
      message.success("item saved successfully");
      setAddItemsModal(false); // Close modal after saving
      //Refresh item list after saving new item
      const fetchData = async () => {
        const response = await axios.get(`${BASE_URL}/api/marketFresh/getAllItems`);
        setItem(response.data);
      };
      await fetchData();

      dispatch({ type: "hideLoading" });
    } catch (error) {
      dispatch({ type: "hideLoading" });
      console.error("Error saving item:", error);
    }
   }else{
    try {
      dispatch({ type: "showLoading" });
      const response = await axios.post(`${BASE_URL}/api/marketFresh/editItem`, {...values,_id:editItem._id});
      message.success("item edited successfully");
      setEditItem(null)
      setAddItemsModal(false); // Close modal after saving
     
      const fetchData = async () => {
        const response = await axios.get(`${BASE_URL}/api/marketFresh/getAllItems`);
        setItem(response.data);
      };
      await fetchData();

      dispatch({ type: "hideLoading" });
    } catch (error) {
      dispatch({ type: "hideLoading" });
      console.error("Error saving item:", error);
    }
   }
  }
  async function deleteItem(record) {
    try {
      dispatch({ type: "showLoading" });
      const response = await axios.post(`${BASE_URL}/api/marketFresh/deleteItem`, { _id: record._id });
      if (response.status === 200) { 
        message.success("Item deleted successfully");
        const fetchData = async () => {
          const response = await axios.get(`${BASE_URL}/api/marketFresh/getAllItems`);
          setItem(response.data);
        }; 
        await fetchData(); // Await to ensure items are updated before hiding loading
      } else {
        message.error("Failed to delete item");
      }
    } catch (error) {
      message.error("An error occurred while deleting the item");
    } finally {
      dispatch({ type: "hideLoading" });
    }
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>All Items</h3>
        <div className="input-group">
      <input
        type="text"
        className="form-control rounded-pill border-0 shadow-sm"
        placeholder="Search by Name of product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
       {isAdmin &&<Button
          style={{ background: "black" }}
          onClick={() => setAddItemsModal(true)}
        >
          Add Items
        </Button>} 
      </div>
      <Table columns={columns} dataSource={itemData} bordered  pagination={false} className="custom-table"/>

      {addItemsModal&&(
        <Modal
        visible={addItemsModal}
        title={`${editItem!==null?'Edit Item':"Add New Item"}`}
        footer={false}
        onCancel={() => {
          setEditItem(null)
          setAddItemsModal(false)}}
      >
        <Form  initialValues={editItem} layout="vertical" onFinish={saveNow}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="image URL"
            name="imgUrl"
            rules={[
              {
                required: true,
                message: "Please input the image URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input the price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="category"
            rules={[
              {
                required: true,
                message: "Please select a category",
              },
            ]}
          >
            <Select>
              <Select.Option value="fruits">Fruits</Select.Option>
              <Select.Option value="meats">Meats</Select.Option>
              <Select.Option value="vegetables">Vegetables</Select.Option>
              <Select.Option value="fish/seafood">Fish/Seafood</Select.Option>
              <Select.Option value="dairy">Dairy</Select.Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button
              htmlType="submit"
              type="primary"
              style={{ background: "black" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
      )}
    </DefaultLayout>
  );
}

export default ItemsPage;
