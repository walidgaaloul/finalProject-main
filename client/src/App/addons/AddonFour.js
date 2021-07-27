import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import HostHeader from "../BecomHost/HostHeader/HostHeader";

const AddonFour = () => {
  //Navigate to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <div id="sectionfour">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md m-auto">
              <div className="container w-75">
                <h1>RENTALS Associates</h1>
                <p style={{ fontSize: "1.5rem" }}>
                  Thanks for your interest in becoming an RENTALS Associate.
                  Unfortunately we aren’t accepting new signups at this time.
                </p>
              </div>
            </div>
            <div className="col-md">
              <img className="img-fluid" src="10.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AddonFour;
