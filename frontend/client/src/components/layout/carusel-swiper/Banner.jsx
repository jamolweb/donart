import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ImageSlider = () => {
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.idea.uz/api/v2/promotions?type=home_slide")
      .then((res) => setPromo(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1500,
    arrows: false,
  };

  return (
    <div className="image-slider">
      <Slider {...settings} width="100%">
       <div className="img1">
        <h1>1</h1>
       </div>
       <div className="img2">
        <h1>2</h1>
       </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;