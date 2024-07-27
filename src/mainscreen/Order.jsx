import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let userEmail = localStorage.getItem("email");
      console.log(userEmail);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/myOrderData",
          {
            email: userEmail,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        setOrders(groupOrdersByDate(response.data.orderData));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const groupOrdersByDate = (orders) => {
    const groupedOrders = {};

    orders.forEach((order) => {
      const orderDate = order[0].Order_Date;
      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }
      groupedOrders[orderDate].push(...order.slice(1));
    });

    return groupedOrders;
  };

  const totalOrderPrice = (items) =>
    items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

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
            <div className="col-lg-8 col-md-10 col-sm-12">
              <p className="mb-4 text-center">
                <span className="h2">My Orders</span>
              </p>

              {orders && Object.keys(orders).length > 0 ? (
                Object.keys(orders).map((date, index) => (
                  <div key={index} className="mb-4">
                    <div className="card">
                      <div className="card-body p-4">
                        <h5 className="mb-4 text-center">Order Date: {date}</h5>
                        {orders[date].map((item, itemIndex) => (
                          <div
                            className="row align-items-center mb-3"
                            key={itemIndex}
                            style={{ textAlign: "center" }}
                          >
                            <div className="col-12 col-md-2 mb-2 mb-md-0">
                              <img
                                src={item.img}
                                alt="Product img"
                                className="img-fluid"
                                style={{
                                  maxHeight: "100px",
                                  objectFit: "cover",
                                  margin: "0 auto",
                                }}
                              />
                            </div>
                            <div className="col-12 col-md-2 d-flex flex-column align-items-center mb-2 mb-md-0">
                              <div>
                                <p className="small text-muted mb-2">Name</p>
                                <p className="lead fw-normal mb-0">
                                  {item.name}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-2 d-flex flex-column align-items-center mb-2 mb-md-0">
                              <div>
                                <p className="small text-muted mb-2">Size</p>
                                <p className="lead fw-normal mb-0">
                                  {item.size}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-2 d-flex flex-column align-items-center mb-2 mb-md-0">
                              <div>
                                <p className="small text-muted mb-2">
                                  Quantity
                                </p>
                                <p className="lead fw-normal mb-0">
                                  {item.qty}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-2 d-flex flex-column align-items-center mb-2 mb-md-0">
                              <div>
                                <p className="small text-muted mb-2">Price</p>
                                <p className="lead fw-normal mb-0">
                                  ₹{item.price}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-md-2 d-flex flex-column align-items-center mb-2 mb-md-0">
                              <div>
                                <p className="small text-muted mb-2">Total</p>
                                <p className="lead fw-normal mb-0">
                                  ₹{(item.price * item.qty).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            {/* Horizontal line after each item */}
                            <div className="col-12">
                              <hr className="my-4" />
                            </div>
                          </div>
                        ))}
                        <div className="text-center mt-4">
                          <p className="mb-0 d-flex align-items-center justify-content-center">
                            <span className="small text-muted me-2">
                              Order total:
                            </span>{" "}
                            <span className="lead fw-normal">
                              ₹{totalOrderPrice(orders[date]).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No Orders Found</p>
              )}

              <div className="text-center mt-4">
                <Link to="/">
                  <button className="btn btn-lg bg-primary text-white w-100">
                    Go To Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;
