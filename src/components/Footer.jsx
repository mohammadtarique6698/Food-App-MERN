import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 border-top">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            style={{ textAlign: "center" }}
          ></Link>
          <div className="d-flex flex-column align-items-center">
            <div className="text-muted">
              Created By{" "}
              <Link to="https://my-personal-portfolio-website-beta.vercel.app/">
                <button className="bg-primary btn text-white p-1">
                  Mohammad Tarique
                </button>
              </Link>
            </div>
            <div className="text-muted">© 2024 Food-O-Maniac, Inc</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
