import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KarzinaImg from "../../../../public/images/karzinaImg.png";
import { KarzinaBasket } from "../../../assets/icons";
import { ContentPK } from "../ContextPK";
import Menu from "../Menu";
import { karzinka_services } from "./karzinka-services";
import PhoneInput from "react-phone-input-2";

function Karzina() {
  const { karzina, setKarzina } = useContext(ContentPK);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({ userName: "", number: "" });
  const backendUrl = "http://localhost:3030";
  const navigate = useNavigate()

  const [count, setCount] = useState(
    karzina.map((elem) => ({ ...elem, count: 1 }))
  );
  const increase = (id) => {
    karzinka_services.increase(id, count, setCount);
  };
  const decrease = (id) => {
    karzinka_services.decrease(id, count, setCount);
  };
  let totalPrice = 0;

  const handleNewOrder = () => {
    if (!inputs.userName && !inputs.number === "+") {
      alert("Ism familiya va nomeringizni kiriting!!!");
    } else if (!inputs.userName) {
      alert("Ism familiyagizni kiriting!!!");
    } else if (inputs.number === "+") {
      alert("Nomeringizni kiriting!!!");
    } else {
      let orderItems = [];
      count.map((item) => {
        orderItems.push({ quantity: item.count, productId: item._id });
      });
      karzinka_services.handleNewOrder(
        backendUrl,
        inputs.userName,
        inputs.number,
        orderItems,
        setInputs,
        onClose,
        setCount,
        setKarzina,
        navigate
      );
    }
  };

  return (
    <div className="wrapper">
      <Menu />
      <header className="header gray">
        <div className="container">
          {karzina.length === 0 ? (
            <div className="block2">
              <img src={KarzinaImg} alt="" />
              <h1>В корзине пока ничего нет</h1>
              <p>
                Вы можете добавлять товары, кликая на сердечко, которое
                находится прямо на карточке товара.
              </p>
              <Link to="/">
                <button>Перейти в главное меню</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="all-put-karzina-products">
                <div className="block-karzina-products">
                  {count?.map((el) => {
                    totalPrice += el.price * el.count;
                    return (
                      <div className="all-product-next" key={el._id}>
                        {/* ////////////////////////////////////////////////////////////////////////////// */}
                        <Modal
                          isOpen={isOpen}
                          onClose={onClose}
                          className="sell-modal"
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Моментальная покупка</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Tabs variant="unstyled">
                                <TabList className="tabs-modal">
                                  <Tab
                                    _selected={{ color: "black", bg: "white" }}
                                  >
                                    Связаться со мной
                                  </Tab>
                                  <Tab
                                    _selected={{ color: "black", bg: "white" }}
                                  >
                                    Свяжусь сам(а)
                                  </Tab>
                                </TabList>
                                <TabPanels>
                                  <TabPanel className="modal-inputs">
                                    <Input
                                      type="text"
                                      placeholder="Ism familiyangiz"
                                      _placeholder={{ opacity: "0.5" }}
                                      value={inputs.userName}
                                      onChange={(e) =>
                                        setInputs((prev) => ({
                                          ...prev,
                                          userName: e.target.value,
                                        }))
                                      }
                                      mb={"20px"}
                                    />
                                    <PhoneInput
                                      _placeholder={{ opacity: "0.5" }}
                                      country={"uz"}
                                      value={inputs.number}
                                      onChange={(e) =>
                                        setInputs((prev) => ({
                                          ...prev,
                                          number: "+" + e,
                                        }))
                                      }
                                      inputStyle={{
                                        width: "100%",
                                        padding: "0.70rem",
                                        fontSize: ".96rem",
                                        borderRadius: "0.25rem",
                                        border: "1px solid #CBD5E0",
                                      }}
                                      className={"PhoneInput"}
                                    />
                                  </TabPanel>
                                  <TabPanel className="profile-call-center">
                                    <h1>Товары</h1>
                                    <div className="call-center">
                                      <div className="call-number">
                                        <a href="tel:+998937226149">
                                          71 230 77 99
                                        </a>
                                        <span>Колл-центр</span>
                                      </div>
                                      <div className="call-ico-item">
                                        <a href="tel:+998937226149">
                                          <PhoneIcon color={"white"} />
                                        </a>
                                      </div>
                                    </div>
                                  </TabPanel>
                                </TabPanels>
                              </Tabs>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                className="modal-send-button"
                                colorScheme="pink"
                                mr={3}
                                onClick={handleNewOrder}
                              >
                                Отправить
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                        {/* ////////////////////////////////////////////////////////////////////////////// */}
                        <div className="product-karzina-put">
                          <Link to={`/product/${el._id}`}>
                            <div className="product-karzina">
                              <div className="product-karzina-img">
                                <img src={el.imageUrl} alt="" />
                              </div>
                              <div className="product-karzina-item">
                                <h2>{el.name}</h2>
                                <h1>{el.price}</h1>
                              </div>
                            </div>
                          </Link>
                          <div className="btn-btn-btn">
                            <div className="product-karzina-buttons">
                              <button
                                onClick={() =>
                                  karzinka_services.removeProductFromKarzina(
                                    el._id,
                                    count,
                                    setCount,
                                    setKarzina
                                  )
                                }
                              >
                                <KarzinaBasket />
                              </button>
                            </div>
                            <div className="product-karzina-buttons-1">
                              <button
                                className="btn-1"
                                onClick={() => decrease(el._id)}
                              >
                                -
                              </button>
                              <button className="btn-2">{el?.count}</button>
                              <button
                                className="btn-1"
                                onClick={() => increase(el._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="additional-block">
                  <h1>Ваша корзина</h1>
                  <div className="additional-block-name-price">
                    {count.map((el) => (
                      <div className="additional-block-name" key={el._id}>
                        <h2>
                          {el?.name} ( {el?.count} шт)
                        </h2>
                        <div className="additional-block-price">
                          <h1>Цена:</h1>
                          <h2>{el?.price}</h2>
                        </div>
                      </div>
                    ))}
                    <div className="all-price-next">
                      <div className="all-price-next-all-prices">
                        <h1>Ваш платеж:</h1>
                        <h2>{totalPrice}</h2>
                      </div>
                      <button onClick={onOpen}>Оформить</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Karzina;
