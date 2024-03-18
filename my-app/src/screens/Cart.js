import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../store/Store";
import postFetch from "../utility/postFetch.js";
import { useNavigate } from "react-router-dom";
function Cart() {
  let [cart, setCart] = useContext(storeContext).cart;
  let [totalPrice, setTotalPrice] = useState(0);
  let [user, setUser] = useContext(storeContext).user;
  let navigate = useNavigate();

  // deletecart...............................
  let deleteCart = (item, id) => {
    let modCart = cart.filter((element) => {
      return element._id !== item._id;
    });
    setCart(modCart);
    (async function () {
      let data = await postFetch(
        "http://localhost:4000/api/removefromcart",
        item,
        id
      );
      if (data.success) {
        alert("Deleted from the cart successfully!");
      } else {
        alert("something went wrong while removeing!");
      }
    })();
  };

  //.................................................

  //place orders---------------------------------------
  let orderHandler = () => {
    if (user) {
      (async function () {
        let data = await postFetch(
          "http://localhost:4000/api/placeorder",
          cart,
          user.id
        );
        if (data.success) {
          alert("order successfully paced!");
        } else {
          alert("something went wrong while placeing order!");
        }
      })();
      navigate("/");
    } else {
      alert("you should login frist");
      return;
    }
  };

  //.................................................................
  useEffect(() => {
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <div>
      <div className="container px-3 my-5 clearfix">
        {/* <!-- Shopping cart table --> */}
        <div className="card">
          <div className="card-header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    {/* <!-- Set columns width --> */}
                    <th
                      className="text-center py-3 px-4"
                      style={{ minWidth: "400px" }}
                    >
                      Product Name &amp; Details
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ width: "100px" }}
                    >
                      Quantity
                    </th>
                    <th
                      className="text-center py-3 px-4"
                      style={{ width: "120px" }}
                    >
                      Total
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ width: "100px" }}
                    >
                      Remove
                    </th>
                    <th
                      className="text-center align-middle py-3 px-0"
                      style={{ width: "40px" }}
                    >
                      <a
                        href="#"
                        className="shop-tooltip float-none text-light"
                        title=""
                        data-original-title="Clear cart"
                      >
                        <i className="ino ion-md-trash"></i>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* mapping starts */}
                  {cart.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="p-4">
                          <div
                            className="media align-items-center"
                            style={{ display: "flex", gap: "26px" }}
                          >
                            <img
                              src={item.img}
                              className="d-block ui-w-40 ui-bordered mr-4"
                              alt=""
                            />
                            <div className="media-body">
                              <a
                                href="#"
                                className="d-block text-dark"
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </a>
                              <small>
                                <span className="text-muted">Size: </span>
                                {item.size}
                                &nbsp;
                              </small>
                            </div>
                          </div>
                        </td>

                        <td className="align-middle p-4">
                          <input
                            type="text"
                            className="form-control text-center"
                            value={item.qty}
                            readOnly
                          />
                        </td>
                        <td className="text-right font-weight-semibold align-middle p-4">
                          {item.price}
                        </td>
                        <td className="text-center align-middle px-0">
                          <a
                            href="#"
                            className="shop-tooltip close float-none text-danger"
                            title=""
                            data-original-title="Remove"
                            onClick={() => deleteCart(item, user.id)}
                          >
                            ×
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                  {/* mapping ends */}
                </tbody>
              </table>
            </div>
            {/* <!-- / Shopping cart table --> */}

            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="d-flex">
                <div className="text-right mt-4 mr-5"></div>
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">
                    Total price
                  </label>
                  <div className="text-large">
                    <strong>{totalPrice}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-right">
              <button
                type="button"
                className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
              >
                Back to shopping
              </button>
              <button
                type="button"
                className="btn btn-lg btn-primary mt-2"
                onClick={orderHandler}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
