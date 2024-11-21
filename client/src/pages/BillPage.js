import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Modal, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import DefaultLayout from "./DefaultLayout";
import axios from "axios";
import {BASE_URL} from "../config"
function BillPage() {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({contentRef});
  const user = JSON.parse(localStorage.getItem('pos-user'))
  const isAdmin = user.isAdmin===true
  const [billsData, setBillsData] = useState([]);
  const [selectedBill, setSelectedBill] = useState("");
  const [printBillModal, setPrintBillModal] = useState(false);
  const [search, setSearch] = useState("");
  const [duplicateBillsData, setDuplicateBillsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "showLoading" });
        const response = await axios.get(`${BASE_URL}/api/marketFresh/getAllBills`);
        const bills = response.data.reverse();
        setBillsData(bills);
        setDuplicateBillsData(bills);
        dispatch({ type: "hideLoading" });
      } catch (error) {
        dispatch({ type: "hideLoading" });
      }
    };
    fetchData();
  }, [dispatch]);

  const columns = [
    { title: "Bill Id", dataIndex: "billId" },
    { title: "Customer", dataIndex: "customerName" },
    { title: "SubTotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrintBillModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const cartColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => <div>{record.quantity}</div>,
    },
    {
      title: "Total Fare",
      dataIndex: "_id",
      render: (id, record) => <div>{record.quantity * record.price}</div>,
    },
  ];

  // Filter function for search
  function filterBySearch() {
    const tempData = duplicateBillsData.filter((bill) =>
      bill.billId.toLowerCase().includes(search.toLowerCase())
    );
    setBillsData(tempData);
  }

  // Call filter function whenever search input changes
  useEffect(() => {
    filterBySearch();
  }, [search]);
  const filteredBills = isAdmin ? billsData : billsData.filter(bill => bill.userId === user?._id);
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3 className="">Bills</h3>
      </div>
      <div className="container my-2">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="input-group">
        <input
          type="text"
          className="form-control rounded-pill border-0 shadow-sm"
          placeholder=" Search by Bill ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>
    </div>
  </div>
</div>

      <Table columns={columns} dataSource={filteredBills} bordered />

      {printBillModal && (
        <Modal
          open={printBillModal}
          footer={false}
          onCancel={() => setPrintBillModal(false)}
          width={500}
        >
          <div className="bill-model" ref={contentRef}>
            <div className="d-flex justify-content-between align-items-end bill-header pb-2">
              <div>
                <h1>MarketFresh</h1>
              </div>
              <div className="p-bill text-right">
                <p>Victoria Island</p>
                <p>Lagos 100001</p>
                <p>9124257777</p>
              </div>
            </div>

            <div className="customer-details">
              <p><b>Bill Id</b>: {selectedBill?.billId || "N/A"}</p>
              <p><b>Name</b>: {selectedBill?.customerName || "N/A"}</p>
              <p><b>Mobile</b>: {selectedBill?.phoneNumber || "N/A"}</p>
              <p><b>Date</b>: {selectedBill?.createdAt ? new Date(selectedBill.createdAt).toISOString().substring(0, 10) : "N/A"}</p>
            </div>
            <div>
              <Table columns={cartColumns} dataSource={selectedBill.cartItem} pagination={false} />
            </div>
            <div className="costs">
              <p><b>SubTotal</b>: {selectedBill.subTotal}</p>
              <p><b>Tax</b>: {selectedBill.tax}</p>
            </div>
            <div className="total">
              <p><b>Total</b>: {selectedBill.totalAmount} NGN/-</p>
            </div>
            <div className="recom text-center mt-2">
              <p>Thanks,</p>
              <p>Visit again!</p>
            </div>
          </div>
          <div>
            <Button className="primary sub-btn no-print" onClick={reactToPrintFn}>
              Print Receipt
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default BillPage;
