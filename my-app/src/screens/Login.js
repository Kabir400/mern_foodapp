import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../store/Store";

export default function Login() {
  let [user, setUser] = useContext(storeContext).user;

  let [value, setValue] = useState({
    password: "",
    email: "",
  });

  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    let json = await response.json();

    if (!json.success && json.errors === "You are not a member!") {
      alert("You are not a member!");
    }

    if (!json.success && json.errors === "Wrong password!") {
      alert("You entre a wrong password!");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      setUser({ id: json.data._id });
      navigate("/");
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
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'am a new user
          </Link>
        </form>
      </div>
    </>
  );
}
