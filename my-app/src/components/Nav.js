import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../store/Store";
import cart from "../img/cart.jpeg";
export default function Nav() {
  let [search, setSearch] = useContext(storeContext).search;
  let [user, setUser] = useContext(storeContext).user;
  let [cart, setCart] = useContext(storeContext).cart;

  let navigate = useNavigate();
  let handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser("");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand link" to="/">
            Navbar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse  justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active link"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {user && (
                <li className="nav-item">
                  <Link
                    className="nav-link active link"
                    aria-current="page"
                    to="/orders"
                  >
                    Orders
                  </Link>
                </li>
              )}

              {/* verify logged in or not */}
              {user ? (
                ""
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link link" to="/createuser">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* verify logged in or not */}
              {user ? (
                <>
                  <button className="btn btn-success">
                    <Link
                      to="/cart"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      CART {cart.length}
                    </Link>
                  </button>

                  <li
                    className="nav-item"
                    style={{ listStyle: "none", marginLeft: "4px" }}
                  >
                    <button
                      className="btn bg-white text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
