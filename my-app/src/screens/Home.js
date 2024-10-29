//internal imports--
import React, { useContext, useState } from "react";

//components--
import Carosel from "../components/Carosel";
import Footer from "../components/Footer";
import Card from "../components/Card";

//context-
import { storeContext } from "../store/Store";

export default function Home() {
  let data = useContext(storeContext).data;
  let [search, setSearch] = useContext(storeContext).search;
  return (
    <div className="bg-dark">
      <Carosel />

      {data.category.length !== 0 &&
        data.category.map((e, i) => {
          return (
            <React.Fragment key={e._id}>
              {/* category heading */}

              <div className="fs-3 m-3 text-light">{e.CategoryName}</div>
              <hr className="text-light" />
              <div className="row">
                {/* food Card */}

                {data.data.length !== 0 ? (
                  data.data
                    .filter((ele, ind) => {
                      return (
                        ele.CategoryName === e.CategoryName &&
                        ele.name.toLowerCase().includes(search.toLowerCase())
                      );
                    })
                    .map((element, index) => {
                      return (
                        <div
                          key={element._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodName={element.name}
                            foodImg={element.img}
                            foodOption={element.options}
                            foodDes={element.description}
                          />
                        </div>
                      );
                    })
                ) : (
                  <h2>No such data found!</h2>
                )}
              </div>
            </React.Fragment>
          );
        })}

      <Footer />
    </div>
  );
}
