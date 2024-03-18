import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../store/Store";

function Orders() {
  let [user, setUser] = useContext(storeContext).user;
  let [order, setOrder] = useState([[]]);

  useEffect(() => {
    if (user && user.id) {
      (async function () {
        let data = await fetch("http://localhost:4000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id }),
        });

        let response = await data.json();
        if (Array.isArray(response)) {
          setOrder(response);
        } else {
          console.error("Response is not an array:", response);
        }
      })();
    }
  }, [user]);

  return (
    <div>
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        my orders
      </h1>
      {order.map((item) => {
        return item.map((element) => {
          return (
            <div
              className="d-flex"
              style={{ gap: "132px", margin: "66px auto", maxWidth: "750px" }}
            >
              <img src={element.img} alt="imadge" style={{ width: "50px" }} />
              <h5 style={{ width: "500px" }}>{element.name}</h5>
              <h5>{element.qty}</h5>
              <h5>{element.price}</h5>
            </div>
          );
        });
      })}
    </div>
  );
}

export default Orders;
