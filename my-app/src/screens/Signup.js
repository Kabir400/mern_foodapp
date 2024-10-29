import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();

  let [value, setValue] = useState({
    name: "",
    number: "",
    location: "",
    password: "",
    email: "",
  });

  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:4000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    let json = await response.json();

    if (!json.success) {
      alert("Entre valid details");
    }
    if (json.success) {
      navigate("/login");
    }
  };

  let changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={value.name}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={value.email}
              onChange={changeHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Number
            </label>
            <input
              type="text"
              className="form-control"
              id="number"
              name="number"
              value={value.number}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adress" className="form-label">
              Adress
            </label>
            <input
              type="text"
              className="form-control"
              id="adress"
              name="location"
              value={value.location}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={value.password}
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Alredy a user
          </Link>
        </form>
      </div>
    </>
  );
}
