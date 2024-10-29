import React, { createContext, useContext, useState, useEffect } from "react";
import fetchWithToken from "../utility/fetchWithToken";

const storeContext = createContext();

function Store(props) {
  //defining states--
  let [data, setData] = useState({ category: [], data: [] });
  let search = useState("");
  let user = useState("");
  let cart = useState([]);

  //defining function for fetching-
  let allData = async () => {
    let response = await fetchWithToken("http://localhost:4000/data/all");
    setData(response);
    if (response.validToken) {
      user[1]({ id: response.id });
      if (response.user[0]) {
        cart[1](response.user[0].cart);
      }
    } else {
      user[1]("");
    }
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <storeContext.Provider
      value={{ data, search: search, user: user, cart: cart }}
    >
      {props.children}
    </storeContext.Provider>
  );
}

export default Store;
export { storeContext };
