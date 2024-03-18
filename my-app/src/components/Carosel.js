import React from "react";

export default function Carosel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/?pizza"
              className="d-block w-100 "
              style={{
                height: "457px",
                objectFit: "cover",
                backgroundPosition: "center",
                filter: "brightness(30%)",
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{ color: "#908f8e" }}>Best Quality Pizza!!</h5>
              <p style={{ color: "#908f8e" }}>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/?burger"
              className="d-block w-100"
              style={{
                height: "457px",
                objectFit: " cover",
                backgroundPosition: "center",
                filter: "brightness(30%)",
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{ color: "#908f8e" }}>Word Famous Burger!!</h5>
              <p style={{ color: "#908f8e" }}>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/?pasta"
              className="d-block w-100"
              style={{
                height: "457px",
                objectFit: " cover",
                backgroundPosition: "center",
                filter: "brightness(30%)",
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{ color: "#908f8e" }}>
                Are you hungry! let's grab some Pasta
              </h5>
              <p style={{ color: "#908f8e" }}>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
