import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import axios from "axios";
import Background from "../Images/login_background.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loginUser",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const json = response.data;
        console.log(json);
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("token", json.authToken);
        enqueueSnackbar("Login successful", {
          variant: "success",
          onClose: () => {
            window.location.href = "/";
          },
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar("Invalid credentials or there is some other error", {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
        setCredentials({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
      enqueueSnackbar("An error occurred while logging in. Please try again.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          backgroundImage: `url(${Background})`,
          minHeight: "100vh",
          filter: "brightness(40%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      <div
        className="container-fluid"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="card text-black my-5 mx-4"
          style={{
            borderRadius: "25px",
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="row g-0">
            <div
              className="col-12 col-lg-6 d-flex align-items-center order-1 order-lg-2"
              style={{
                borderRadius: "25px",
                overflow: "auto",
              }}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Sample img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
              />
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center order-2 order-lg-1">
              <div className="card-body p-md-5">
                <div className="text-center mb-5 mt-4">
                  <h1 className="fw-bold">Login</h1>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-envelope fa-lg me-3"></i>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center">
                          <label
                            htmlFor="email"
                            className="form-label me-3 fw-bold"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email..."
                            style={{ borderRadius: "25px" }}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="fas fa-lock fa-lg me-3"></i>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center">
                          <label
                            htmlFor="password"
                            className="form-label me-3 fw-bold"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password..."
                            style={{ borderRadius: "25px" }}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-left mb-3 ms-3">
                    <button type="submit" className="btn btn-md btn-primary">
                      Login
                    </button>
                  </div>
                  <Link to="/createUser">
                    <p
                      className="d-inline-flex ms-3"
                      style={{ textDecoration: "underline", color: "blue" }}
                    >
                      Don't have an account? Sign up
                    </p>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
