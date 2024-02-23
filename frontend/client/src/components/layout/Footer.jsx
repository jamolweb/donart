import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  Logo,
  TelegramIcon,
} from "../../assets/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-footer">
          <div className="footer-buttons">
            <div className="footer-logo">
              <h4>Donart.uz</h4>
            </div>
            <div className="footer-button-links">
              <button>
                {" "}
                <TelegramIcon />
              </button>
              <button>
                {" "}
                <FacebookIcon />
              </button>
              <button>
                {" "}
                <InstagramIcon />
              </button>
            </div>
          </div>
          <div className="Links222">
            <h1>Покупателям</h1>
            <div className="links">
              <a href="https://idea.uz/page/9-voprosy-i-otvety">
                Вопросы и ответы
              </a>
              <a href="https://idea.uz/page/10-kak-sdelat-zakaz-na-sajte">
                Как сделать заказ на сайте
              </a>
            </div>
          </div>

          <div className="Links222">
            <h1>Idea.uz</h1>
            <div className="links">
              <a href="https://idea.uz/page/3-about">О нас</a>
              <a href="https://idea.uz/shops">Наши магазины</a>
              <a href="https://idea.uz/contacts">Контакты</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
