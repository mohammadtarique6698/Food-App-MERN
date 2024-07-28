import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useDispatch } from "../components/Reducer";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSnackbar } from "notistack";

const Cart = () => {
  const cartData = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [editItem, setEditItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: localStorage.getItem("userName") || "John Doe",
    email: localStorage.getItem("email") || "johndoe@example.com",
  });

  const handleCheckout = async () => {
    let userEmail = userDetails.email;

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
        enqueueSnackbar(
          'Order confirmed successfully! A confirmation email will be sent to your registered email. Please check "My Orders" for your orders.',
          {
            variant: "success",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            onClose: () => {
              window.location.href = "/myOrders";
            },
          }
        );
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
                              style={{ width: "6rem", height: "6rem" }}
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
                      onClick={() => setShowModal(true)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order-summary">
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <hr />
            <p>
              <strong>Order Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <hr />
            {cartData.cart.map((item, index) => (
              <div key={index} className="order-item">
                <p>
                  <strong>Item:</strong> {item.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.qty}
                </p>
                <p>
                  <strong>Price:</strong> ₹{Number(item.price).toFixed(2)}
                </p>
                <p>
                  <strong>Total:</strong> ₹
                  {(Number(item.price) * item.qty).toFixed(2)}
                </p>
                <hr />
              </div>
            ))}
            <p className="lead fw-normal text-center">
              <strong>Total Price: ₹{totalPrice.toFixed(2)}</strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Confirm Order
          </Button>
        </Modal.Footer>
        <style jsx>{`
          .order-summary {
            font-family: Arial, sans-serif;
          }
          .order-item {
            margin-bottom: 1rem;
          }
          .order-item p {
            margin: 0.2rem 0;
          }
          .modal-footer {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </Modal>
    </div>
  );
};

export default Cart;
