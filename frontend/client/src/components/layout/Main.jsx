import React, { useEffect, useState } from "react";
import kategoryPhone from "../../../public/images/iPhone14.png";
import kategorywashing from "../../../public/images/KirMosin.png";
import kategoryTV from "../../../public/images/TV.png";
import kategoryGaz from "../../../public/images/Gaz.png";
import kategotyNote from "../../../public/images/note.png";
import kategotyUtik from "../../../public/images/utik.png";
import ProductOne from "./product/ProductOne";
import Menu from "./Menu";
import axios from "axios";
import ImageSlider from "./carusel-swiper/Banner";
import { Link } from "react-router-dom";

const Loading = () => {
  return (
    <div className="setLoadingMain">
      <h2>Loading...</h2>
    </div>
  );
};

const backendUrl = "http://localhost:3030";

const Main = () => {
  const [data5, setData5] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/products`)
      .then((res) => setData5(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [data4, setData4] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/products`)
      .then((res) => setData4(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [data3, setData3] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/products`)
      .then((res) => setData3(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [data2, setData2] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/products`)
      .then((res) => setData2(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/products`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.idea.uz/api/v2/search-recommendations")
      .then((res) => setRecommendations(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="main">
      <Menu />
      <div className="container">
        <div className="banner-next">
          <div className="banner-images">
            <ImageSlider />
            <div className="banner2">1</div>
          </div>
          <div className="banner-block">
            <h1>Люди часто ищут</h1>
            <div className="banner-block-menu">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {recommendations.map((item) => (
                    <h2 key={item.id}>{item.name}</h2>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="block">
          <div className="block-content">
            <h1>Хиты продаж</h1>
          </div>
          <div className="cards">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data?.map((item) => (
                  <ProductOne key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="block">
          <div className="block-content">
            <h1>Смартфоны</h1>
          </div>
          <div className="cards">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data2?.map((item) => (
                  <ProductOne key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="block">
          <div className="block-content">
            <h1>Крупная бытовая техника</h1>
          </div>
          <div className="cards">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data3?.map((item) => (
                  <ProductOne key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="block">
          <div className="block-content">
            <h1>Мелкая техника для дома</h1>
          </div>
          <div className="cards">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data4?.map((item) => (
                  <ProductOne key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="block">
          <div className="block-content">
            <h1>Специально для вас</h1>
          </div>
          <div className="cards">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data5?.map((item) => (
                  <ProductOne key={item.id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="block">
          <div className="cards2">
            <div className="botom-katagory">
              <Link to={"/smartphone"}>
                <div className="kategoty">
                  <b>Смартфоны</b>
                  <img src={kategoryPhone} alt="" />
                </div>
              </Link>
              <Link to={"/washing"}>
                <div className="kategoty paddingleft-u">
                  <b>Стиральные машины</b>
                  <img src={kategorywashing} alt="" />
                </div>
              </Link>
            </div>
            <div className="kategory-two-row">
              <Link to={"/tv"}>
                <div className="kategory-row kategory-row-img">
                  <b>Телевизоры</b>
                  <img src={kategoryTV} alt="" />
                </div>
              </Link>
              <Link to={"/gaz"}>
                <div className="kategory-row paddingleft-t">
                  <b>Газовые плиты</b>
                  <img src={kategoryGaz} alt="" />
                </div>
              </Link>
            </div>

            <div className="kategory-two-col">
              <Link to={"/notebook"}>
                <div className="kategory-col">
                  <b>Ноутбуки</b>
                  <img src={kategotyNote} alt="" />
                </div>
              </Link>
              <Link to={"/utik"}>
                <div className="kategory-col paddingleft-y">
                  <b>Мелкая техника для дома</b>
                  <img src={kategotyUtik} alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
