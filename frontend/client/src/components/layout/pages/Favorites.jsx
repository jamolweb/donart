import React, { useContext } from "react";
import FavoriteImg from "../../../../public/images/favoritsimg.png";
import { Link } from "react-router-dom";
import Menu from "../Menu";
import { ContentPK } from "../ContextPK";
import {
  ComparisonKarzina,
  KarzinaBasket,
  KarzinaFavorites,
  KarzinaHeart,
} from "../../../assets/icons";

function Favorites() {
  const { heart, setHeart } = useContext(ContentPK);

  const removeProductFromFavorites = (productId) => {
    const updatedFavorite = heart.filter((product) => product.id !== productId);
    setHeart(updatedFavorite);
  };

  const clearAllFavorites = () => {
    setHeart([]);
  };

  return (
    <div className="wrapper">
      <Menu />
      <header className="header gray">
        <div className="container">
          {heart.length === 0 ? (
            <div className="block2">
              <img src={FavoriteImg} alt="" />
              <h1>В корзине пока ничего нет</h1>
              <p>
                Вы можете добавлять товары кликая на сердечко, которое находится
                прямо на карточке товара
              </p>
              <Link to="/">
                <button>Перейти в главное меню</button>
              </Link>
            </div>
          ) : (
            <div className="all-put-karzina-products">
              <div className="block-karzina-products">
                {heart.map((el) => (
                  <div className="all-product-next" key={el.id}>
                    <div className="product-karzina-put">
                      <div className="product-karzina">
                        <div className="product-karzina-img">
                          <img src={el.img} alt="" />
                        </div>
                        <div className="product-karzina-item">
                          <h1>{el.current_price_formatted}</h1>
                          <h2>{el.title_name}</h2>
                          <h3>Код товара: {el.unique_code}</h3>
                        </div>
                      </div>
                      <div className="btn-btn-btn">
                        <div className="product-karzina-buttons">
                          <button
                            onClick={() => removeProductFromFavorites(el.id)}
                          >
                            <KarzinaBasket />
                          </button>
                          <button>
                            <KarzinaFavorites />
                          </button>
                          <button>
                            <ComparisonKarzina />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="additional-block">
                <h1>Ваш список желаний</h1>
                <div className="additional-block-name-price">
                  <div className="additional-block-price">
                    <h1>Количество продуктов</h1>
                    <h2>{heart.length}</h2>
                  </div>

                  <div className="all-price-next-buttons">
                    <button
                      className="clear-all-favorite-button"
                      onClick={clearAllFavorites}
                    >
                      Очистить все
                    </button>
                    <Link to={"/karzina"}>
                      <button className="link-to-karzina-products">
                        Перейти в корзину
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Favorites;
