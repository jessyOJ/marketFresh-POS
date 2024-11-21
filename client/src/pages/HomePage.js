import React, { useEffect, useState } from "react";
import DefaultLayout from "./DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Items from "../components/Items";
import "../resources/item.css";
import { useDispatch } from "react-redux";

function HomePage() {
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("fruits");
  const categories = [
    {
      name: "fruits",
      imgUrl:
        "https://th.bing.com/th/id/R.bde574275492c4d091fbf911a39a1627?rik=OKLCs6xa2aguTA&riu=http%3a%2f%2fwww.zastavki.com%2fpictures%2f1920x1200%2f2012%2fFood_Berries__fruits__nuts_Assorted_fruits_033749_.jpg&ehk=Ur%2bt%2bcPKZbLEFod8aETZBjLfG9ADC9HsYfIs5BcPqs0%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "meats",
      imgUrl:
        "https://th.bing.com/th/id/R.c57d468c71d978ecf691d770e35708f9?rik=4p2ge884qr%2b3VQ&pid=ImgRaw&r=0",
    },
    {
      name: "vegetables",
      imgUrl:
        "https://th.bing.com/th/id/OIP.T393ar00oOLaWZWM4Zdj3AHaE5?rs=1&pid=ImgDetMain",
    },
    {
      name: "fish/seafood",
      imgUrl:
        "https://www.undercurrentnews.com/wp-content/uploads/2021/06/MAFAC2-e1624894611800.jpg",
    },
    {
      name: "dairy",
      imgUrl:
        "https://statbel.fgov.be/sites/default/files/styles/news_full/public/images/landbouw/8.7%20Zuivelstatistieken/AdobeStock_62229517.jpeg?itok=y-njvkAD",
    },
  ];
  useEffect(() => {
    try {
      const fetchData = async () => {
        dispatch({ type: "showLoading" });
        const response = await axios.get("/api/marketFresh/getAllItems");
        const items = response.data;
        setItem(items);
        dispatch({ type: "hideLoading" });
      };
      fetchData();
    } catch (error) {
      dispatch({ type: "hideLoading" });
    }
  }, []);
  return (
    <div>
      <DefaultLayout>
        <div className="d-flex categories-container" style={{
        width: "auto",
        whiteSpace: "nowrap", 
        overflowX: "auto", 
      }}>
        
          {categories.map((category) => {
            return (
              <div
              onClick={()=>setSelectedCategory(category.name)}
                className={`d-flex category ${
                  selectedCategory === category.name && "selected-category"
                }`}
              >
                <h4>{category.name}</h4>
                <img src={category.imgUrl} width="80px" height="50px" />
                
              </div>
              
            );
            
          })}
          
        </div>
        <hr style={{ border: "1px solid black", margin: "10px 0" }} />  
        <Row gutter={15}>
          {item.filter((i)=>i.category===selectedCategory).map((item) => {
            return (
              <Col xs={24} sm={12} md={12} lg={6} key={item.id}>
                <Items item={item} />
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
}

export default HomePage;
