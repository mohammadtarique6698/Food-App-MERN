import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

import Background from "../Images/hero-background.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import { FaSearch } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Image1 from "../Images/1.jpg";
import Image2 from "../Images/2.jpg";
import Image3 from "../Images/3.jpg";
import Image4 from "../Images/4.jpg";
import Image5 from "../Images/5.jpg";
import Image6 from "../Images/6.jpg";
import Image7 from "../Images/7.jpg";
import Image8 from "../Images/8.jpg";
import Image9 from "../Images/9.jpg";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/foodData");
      setFoodItems(response.data[0]);
      setCategories(response.data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredFoodItems = foodItems.filter((item) => {
    const isCategoryMatch = selectedCategory
      ? item.CategoryName === selectedCategory
      : true;
    const isSearchMatch = item.name.toLowerCase().includes(search);
    return isCategoryMatch && isSearchMatch;
  });

  return (
    <React.Fragment>
      <Navbar />

      {/* Carousal */}
      <div style={{ position: "relative", height: "30rem" }}>
        <div
          className="input-group rounded"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "10",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="search"
            className="form-control rounded ms-2"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            style={{
              backgroundColor: "transparent",
              maxWidth: "35rem",
              color: "white",
              border: "1px solid white",
            }}
            value={search}
            onChange={handleSearch}
          />
          <span
            className="input-group-text border-0"
            id="search-addon"
            style={{
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            <FaSearch />
          </span>
        </div>

        <Swiper
          spaceBetween={5}
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
          effect={"fade"}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
          style={{ height: "100%" }}
        >
          {[
            Image1,
            Image2,
            Image3,
            Image4,
            Image5,
            Image6,
            Image7,
            Image8,
            Image9,
          ].map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                  filter: "brightness(40%)",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Carousal End */}

      <div
        className="mb-3"
        style={{
          background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center mb-4 ms-lg-5">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="mx-2 p-3 text-center"
              onClick={() => handleCategorySelect(cat.CategoryName)}
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "2rem",
                cursor: "pointer",
              }}
            >
              <span className="fw-bold">{cat.CategoryName}</span>
            </div>
          ))}
        </div>
        <hr />
        <div
          style={{
            position: "relative",
            padding: "20px",
            borderRadius: "10px",
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 1,
            }}
          ></div>
          <div
            className="d-flex flex-wrap justify-content-center align-items-center gap-4"
            style={{ position: "relative", zIndex: 2 }}
          >
            {filteredFoodItems.length > 0 ? (
              filteredFoodItems.map((food) => (
                <div key={food._id} className="p-2">
                  <Card item={food} option={food.options} />
                </div>
              ))
            ) : (
              <div className="my-2">No items available for this category.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
