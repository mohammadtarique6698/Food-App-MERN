import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useDispatch } from "../components/Reducer";
import axios from "axios";

const Cart = () => {
  const cartData = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editItem, setEditItem] = useState({});

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("email");

    try {
      let response = await axios.post(
        "http://localhost:5000/api/orderData",
        {
          orderData: cartData.cart,
          email: userEmail,
          order_date: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "DROP" });
        navigate("/myOrders");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
  };

  const handleUpdateQuantity = (id, qty) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { id, qty },
    });
    setEditItem({});
  };

  const totalPrice = cartData.cart.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );

  return (
    <div>
      <section
        className="h-100"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-9 col-md-10">
              <p className="mb-4 text-center">
                <span className="h2" style={{ textDecoration: "underline" }}>
                  Shopping Cart
                </span>
                <span className="h4">
                  {" "}
                  ({cartData.cart.length} item(s) in your cart)
                </span>
              </p>

              {cartData.cart && cartData.cart.length > 0 ? (
                cartData.cart.map((item, index) => (
                  <div key={index}>
                    <div className="card mb-4">
                      <div className="card-body p-4">
                        <div className="row align-items-center text-center">
                          <div className="col-md-2 col-12 mb-3 mb-md-0">
                            <img
                              src={item.img}
                              alt="Product img"
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-md-2 col-12 mb-3 mb-md-0">
                            <div>
                              <p className="small text-muted mb-2">Name</p>
                              <p className="lead fw-normal mb-0">{item.name}</p>
                            </div>
                          </div>
                          <div className="col-md-2 col-12 mb-3 mb-md-0">
                            <div>
                              <p className="small text-muted mb-2">Size</p>
                              <p className="lead fw-normal mb-0">{item.size}</p>
                            </div>
                          </div>
                          <div className="col-md-2 col-12 mb-3 mb-md-0">
                            <div>
                              <p className="small text-muted mb-2">Quantity</p>
                              {editItem._id === item._id ? (
                                <input
                                  type="number"
                                  value={editItem.qty}
                                  onChange={(e) =>
                                    setEditItem({
                                      ...editItem,
                                      qty: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                <p className="lead fw-normal mb-0">
                                  {item.qty}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2 col-12 mb-3 mb-md-0">
                            <div>
                              <p className="small text-muted mb-2">Price</p>
                              <p className="lead fw-normal mb-0">
                                ₹{item.price}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-2 col-12 mb-3 mb-md-0">
                            <div>
                              <p className="small text-muted mb-2">Total</p>
                              <p className="lead fw-normal mb-0">
                                ₹{(item.price * item.qty).toFixed(2)}
                              </p>
                              {editItem._id === item._id ? (
                                <button
                                  className="btn btn-success btn-sm mt-2"
                                  onClick={() =>
                                    handleUpdateQuantity(item._id, editItem.qty)
                                  }
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary btn-sm mt-2 me-2"
                                  onClick={() => setEditItem(item)}
                                >
                                  Edit
                                </button>
                              )}
                              <button
                                className="btn btn-danger btn-sm mt-2"
                                onClick={() => handleRemoveFromCart(item._id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="my-5 fw-bold fs-3">Cart is Empty</p>
                  <button
                    type="button"
                    className="btn btn-light btn-lg me-2"
                    onClick={() => navigate("/")}
                  >
                    Continue shopping
                  </button>
                </div>
              )}

              {cartData.cart.length > 0 && (
                <>
                  <div className="card mb-5">
                    <div className="card-body p-4">
                      <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center">
                        <p className="mb-0 d-flex text-center text-md-start align-items-center">
                          <span className="small text-muted me-2">
                            Order total:
                          </span>{" "}
                          <span className="lead fw-normal">
                            ₹{totalPrice.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-2">
                    <button
                      type="button"
                      className="btn btn-light btn-lg"
                      onClick={() => navigate("/")}
                    >
                      Continue shopping
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleCheckout}
                    >
                      Proceed To Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
