import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import Background from "../Images/signup_background.jpg";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [checked, setChecked] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));

    if (name === "password" || name === "repeatPassword") {
      setPasswordsMatch(
        name === "password"
          ? value === credentials.repeatPassword
          : value === credentials.password
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsMatch && checked) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/createUser",
          {
            name: credentials.name,
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
          enqueueSnackbar("User is Created", {
            variant: "success",

            onClose: () => {
              window.location.href = "/login";
            },
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar("User already exists or there is some other error", {
            variant: "warning",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 3000,
            TransitionComponent: "SlideTransition",
            preventDuplicate: true,
          });
        }
      } catch (error) {
        console.error("There was an error creating the user:", error);
      }
    } else {
      enqueueSnackbar(
        "Please make sure passwords match and terms are accepted.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
          TransitionComponent: "SlideTransition",
          preventDuplicate: true,
        }
      );
    }
  };

  const selectingChecked = (event) => {
    setChecked(event.target.checked);
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
                  <h1 className="fw-bold">Sign up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user fa-lg me-3"></i>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center">
                          <label
                            htmlFor="form3Example1c"
                            className="form-label me-3 fw-bold"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your Name...."
                            style={{ borderRadius: "25px" }}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-envelope fa-lg me-3"></i>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center">
                          <label
                            htmlFor="form3Example3c"
                            className="form-label me-3 fw-bold"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your Email..."
                            style={{ borderRadius: "25px" }}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-lock fa-lg me-3"></i>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center">
                          <label
                            htmlFor="form3Example4c"
                            className="form-label me-3 fw-bold"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
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

                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-key fa-lg me-3"></i>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center">
                          <label
                            htmlFor="form3Example4cd"
                            className="form-label me-2 fw-bold"
                          >
                            Repeat password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            name="repeatPassword"
                            value={credentials.repeatPassword}
                            onChange={handleChange}
                            required
                            placeholder="Enter password again..."
                            style={{ borderRadius: "25px" }}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>
                    {!passwordsMatch && (
                      <div className="text-danger ms-3">
                        Passwords do not match
                      </div>
                    )}
                  </div>

                  <div className="form-check d-flex justify-content-left align-items-center mb-5 ms-3">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="form2Example3c"
                      onChange={selectingChecked}
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in{" "}
                      <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-left mb-3 ms-3">
                    <button
                      type="submit"
                      className={`btn btn-lg fw-bold ${
                        checked && passwordsMatch
                          ? "btn-primary"
                          : "btn-secondary disabled"
                      }`}
                    >
                      Register
                    </button>
                  </div>
                  <Link to="/login">
                    <p
                      className="d-inline-flex ms-3"
                      style={{ textDecoration: "underline", color: "blue" }}
                    >
                      Already a User? Login
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

export default Signup;
