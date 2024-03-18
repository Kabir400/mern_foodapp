import { right } from "@popperjs/core";
import React, { useContext, useState } from "react";
import { storeContext } from "../store/Store";
import postFetch from "../utility/postFetch";

export default function Card(props) {
  //defining cotext veriables--
  let [user, setUser] = useContext(storeContext).user;

  //converting to array--
  let options = Object.keys(props.foodOption[0]);
  let optionsprice = Object.values(props.foodOption[0])[0];

  //defining state--
  let [size, setSize] = useState(options[0]);
  let [quantity, setQuantity] = useState(1);
  let total = Number(props.foodOption[0][size]);
  let [price, setPrice] = useState(total);

  //defining context veriable--
  let [cart, setCart] = useContext(storeContext).cart;

  //handler functios--
  let selectHandler = (e) => {
    setSize(e.target.value);
    setPrice(Number(props.foodOption[0][e.target.value]) * quantity);
  };

  let selectQuantity = (e) => {
    setQuantity(e.target.value);
    setPrice(Number(props.foodOption[0][size]) * e.target.value);
  };

  let cartHandler = () => {
    let cartItem = {
      name: props.foodName,
      img: props.foodImg,
      qty: quantity,
      size: size,
      price: price,
    };

    if (user) {
      setCart([...cart, cartItem]);
      (async function () {
        let data = await postFetch(
          "http://localhost:4000/api/addtocart",
          cartItem,
          user.id
        );
        if (data.success) {
          alert("Added to cart successfully!");
        } else {
          alert("something went wrong while adding to cart!");
        }
      })();
    } else {
      alert("you should login frist");
      return;
    }
  };
  return (
    <>
      <div
        className="card "
        style={{
          width: "18rem",
          maxHeight: "360px",
          padding: "5px",
          margin: "25px",
          backgroundColor: "#3c3939",
        }}
      >
        <img
          src={`${props.foodImg}`}
          className="card-img-top"
          style={{ maxHeight: "150px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-light">{props.foodName}</h5>
          <button
            className=" btn btn-secondary mb-3 mt-3"
            style={{
              display: "block",
              textDecoration: "none",
              borderRadius: "6px",
            }}
          >{`Starting from Rs:${optionsprice}`}</button>
          <div className="d-flex justify-content-start flex-nowrap">
            <div style={{ marginRight: "4px" }}>
              <select
                className="mr-3 mb-2"
                style={{ borderRadius: "4px" }}
                value={quantity}
                onChange={selectQuantity}
              >
                {Array.from(Array(10), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select
                value={size}
                onChange={selectHandler}
                style={{ borderRadius: "4px" }}
              >
                {options.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              style={{
                background: "#45ca45",
                marginLeft: "4px",
                borderRadius: "4px",
                height: "27px",
              }}
            >
              <div
                style={{
                  padding: "0px 7px",
                  textDecoration: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={cartHandler}
              >
                Add
              </div>
            </div>
          </div>
          <hr style={{ color: "white" }} />
          <h5 className="d-inline text-light ml-2">Total Price: {price}₹</h5>
        </div>
      </div>
    </>
  );
}
