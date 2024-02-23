import React from "react";
import map from "../../../../public/images/map.png";
import Menu from "../Menu";

function Location() {
  return (
    <div className="location-main">
      <Menu />
      <div className="container">
        <div className="location-flex">
          <div className="location-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47772.42266832548!2d60.58187427584939!3d41.552438029564534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfc9284eafb523%3A0xffaf4382f65d7b61!2sUrgench%2C%20Xorazm%20Region%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1707476930052!5m2!1sen!2s"  referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="location-menu">
            <h1>Выберите область</h1>
            <select>
              <option>Все области</option>
              <option> Tashkent</option>
              <option> Samarkand</option>
              <option> Namangan</option>
              <option> Andijan</option>
              <option> Nukus</option>
              <option> Fergana</option>
              <option> Bukhara</option>
              <option> Qarshi</option>
              <option> Kokand</option>
              <option> Margilan</option>
              <option> Termez</option>
              <option> Jizzakh</option>
              <option> Angren</option>
              <option> Chirchiq</option>
              <option> Navoiy</option>
              <option> Urgench</option>
              <option> Shahrisabz</option>
              <option> Olmaliq</option>
              <option> Bekobod</option>
            </select>
            <p>idea Чиланзар</p>
            <p>idea Нурафшан</p>
            <p>idea Юнусабад</p>
            <p>idea Буюк Ипак Йули</p>
            <p>idea Сергели</p>
            <p>idea Магнит</p>
            <p>idea Шахрисабз</p>
            <p>idea Зарафшан</p>
            <p>idea Навои</p>
            <p>idea Беруний</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
