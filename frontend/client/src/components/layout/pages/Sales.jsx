import React from "react";
import Menu from "../Menu";

function Sales() {
  return (
    <div className="sales-main">
      <Menu />
      <div className="container">
        <div className="actions">
          <div className="action-block">
            <img
              src="https://idea.uz/_next/image?url=https%3A%2F%2Fapi.idea.uz%2Fstorage%2Foffer-promotions%2FSeptember2023%2FJaFmiuWdjyHihCLsu8PJ.png&w=3840&q=75"
              alt=""
            />
            <h1>Самое крупное снижение цен</h1>
            <p>14.09.2023 - 30.09.2023</p>
          </div>
          <div className="action-block">
            <img
              src="https://idea.uz/_next/image?url=https%3A%2F%2Fapi.idea.uz%2Fstorage%2Foffer-promotions%2FSeptember2023%2FojyOCzBslt6DONV8PjaB.png&w=3840&q=75"
              alt=""
            />
            <h1>Boshlandi!</h1>
            <p>01.09.2023 - 30.11.2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
