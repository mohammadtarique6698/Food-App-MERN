import React, { useState } from "react";
import { useDispatch, useCart } from "./Reducer";

const Card = ({ item, option }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(Object.keys(option[0])[0]);
  const [price, setPrice] = useState(Object.values(option[0])[0]);

  const dispatch = useDispatch();
  const cart = useCart();

  const handleAddToCart = () => {
    if (qty) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...item, qty: parseInt(qty), size: size, price: price },
      });
    }

    console.log(cart);
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    const selectedPrice = option.find((opt) => opt[selectedSize])[selectedSize];
    setPrice(selectedPrice);
  };

  const totalPrice = price * qty;

  return (
    <div
      className="p-3 mx-1"
      style={{
        position: "relative",
        height: "fit-content",
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="card"
        style={{
          width: "17rem",
          height: "100%",
          maxHeight: "28rem",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          src={item.img}
          className="card-img-top"
          alt="Dish Img"
          style={{
            objectFit: "cover",
            height: "10rem",
          }}
        />
        <div className="card-body p-3">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
            {item.description}
          </p>
        </div>
        <div className="container mb-3 px-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <select
              className="p-2 rounded"
              onChange={(e) => setQty(e.target.value)}
              style={{
                background:
                  "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                border: "none",
                outline: "none",
              }}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="p-2 rounded"
              style={{
                background:
                  "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                border: "none",
                outline: "none",
              }}
              onChange={handleSizeChange}
            >
              {option.map((opt, index) =>
                Object.keys(opt).map((key) => (
                  <option key={index + key} value={key}>
                    {key}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="d-inline fs-6 fw-bold mt-2 text-success">
            <span className="fs-6 text-muted">Total Price:</span> ₹
            {totalPrice.toFixed(2)}
          </div>
          <hr />
          <button
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
            style={{
              background:
                "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
              border: "none",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
