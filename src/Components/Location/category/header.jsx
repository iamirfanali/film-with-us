import React from "react";

const Header = ({ name, coverImage }) => {
  const { url: imgUrl } = coverImage || {};

  return (
    <React.Fragment>
      <section id="ms-loc-hero-image">
        <div
          className="container-fluid ms-img-cont"
          style={{
            backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${imgUrl}`
          }}
        >
          <div className="row h-100">
            <div className="col-12 p-0 my-auto">
              <h3 className="text-light my-auto text-center">{name}</h3>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Header;
