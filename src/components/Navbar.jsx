import React from "react";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from "../components/Reducer"; // Import your useCart hook

const Navbar = () => {
  const { cart } = useCart(); // Get the cart data from the context

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic text-white" to="/">
          Food-O-Maniac
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-lg-flex flex-lg-row align-items-center gap-4">
            <li className="nav-item">
              <Link
                className="nav-link fs-5 fst-italic text-white"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item d-none d-lg-block">
                  <Link
                    className="nav-link fs-5 fst-italic text-white"
                    aria-current="page"
                    to="/myOrders"
                  >
                    My Orders
                  </Link>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <Link
                    className="nav-link fs-5 fst-italic text-white position-relative"
                    aria-current="page"
                    to="/mycart"
                  >
                    My Cart
                    <Badge
                      pill
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      {cart.length}
                    </Badge>
                  </Link>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <button
                    className="btn btn-md btn-danger"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item d-lg-none">
                  <div className="d-flex flex-column align-items-end">
                    <Link
                      className="nav-link fs-5 fst-italic text-white mb-2"
                      aria-current="page"
                      to="/myOrders"
                    >
                      My Orders
                    </Link>
                    <Link
                      className="nav-link fs-5 fst-italic text-white mb-2 position-relative"
                      aria-current="page"
                      to="/mycart"
                    >
                      My Cart
                      <Badge
                        pill
                        bg="danger"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                        }}
                      >
                        {cart.length}
                      </Badge>
                    </Link>
                    <button
                      className="btn btn-md btn-danger"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-lg-none mb-2">
                  <button className="btn btn-lg btn-success w-100">
                    <Link
                      className="nav-link fs-5 fst-italic text-white"
                      to="/login"
                    >
                      Login
                    </Link>
                  </button>
                </li>
                <li className="nav-item d-lg-none mb-2">
                  <button className="btn btn-lg btn-success w-100">
                    <Link
                      className="nav-link fs-5 fst-italic text-white"
                      to="/createUser"
                    >
                      Sign Up
                    </Link>
                  </button>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <Link
                    className="btn btn-success fs-5 fst-italic text-white"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <Link
                    className="btn btn-success fs-5 fst-italic text-white"
                    to="/createUser"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
