import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Img,
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
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/userAtom";
import { ContentPK } from "../layout/ContextPK";
import { services } from "./servises";

const ProductIN = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({});
  const [phoneColor, setPhoneColor] = useState(null);
  const [phoneSize, setPhoneSize] = useState(null);
  const [user] = useRecoilState(userAtom);
  const [quantity, setQuantity] = useState(1);
  const [inputs, setInputs] = useState({ userName: "", number: "" });

  // console.log('user:', user);
  const params = useParams();
  const productId = params.id.split("-")[0];
  const backendUrl = "http://localhost:3030";

  useEffect(() => {
    axios
      .get(`${backendUrl}/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((error) => console.log(error));
  }, [productId]);

  const { setKarzina, karzina } = useContext(ContentPK);

  function addKarzina() {
    const existingProduct = karzina.find(
      (item) =>
        item.title === `${product.name} ${phoneSize} ${phoneColor.color}`
    );

    if (existingProduct) {
      const updatedKarzina = karzina.map((item) =>
        item.title === existingProduct.title
          ? { ...item, count: item.count + 1 }
          : item
      );
      setKarzina(updatedKarzina);
    } else {
      setKarzina((value) => [
        ...value,
        {
          id: karzina.length + 1,
          title: `${product.name} ${phoneSize} ${phoneColor.color}`,
          price: product.price,
          img: phoneColor.img,
          color: phoneColor.color,
          size: phoneSize,
          count: 1,
        },
      ]);
    }
  }

  console.log("phoneSize:", phoneSize);
  console.log("phoneColor:", phoneColor);

  // console.log(product);

  const handleNewOrder = () => {
    onClose();
    try {
      axios
        .post(`${backendUrl}/orders`, {
          userName: inputs.userName,
          userNumber: inputs.number,
          orderItems: [
            { quantity, productId, options: [phoneSize, phoneColor] },
          ],
        })
        .then(() => {
          setInputs({ userName: "", number: "" });
          alert("zakaz movafaqiyatli amalga oshirildi");
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  };

  const openModal = () => {
    if (!phoneColor && !phoneSize) {
      alert("Telefon rasmini va hotirasini tanlang!!!");
    } else if (!phoneColor) {
      alert("Telefon rasmini tanlang!!!");
    } else if (!phoneSize) {
      alert("Telefon hotirasini tanlang!!!");
    } else {
      if (user) {
        const orderItems = [
          { quantity, productId, options: [phoneSize, phoneColor] },
        ];

        try {
          services.handleNewOrder(
            backendUrl,
            user.fullName,
            user.number,
            orderItems
          );
        } catch (error) {
          console.log(error);
          alert("zakaz qilishda hatolik boldi.");
        }
      } else {
        onOpen();
      }
    }
  };

  return (
    <div className="Product-In">
      <div className="container">
        <Modal isOpen={isOpen} onClose={onClose} className="sell-modal">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Моментальная покупка</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs variant="unstyled">
                <TabList className="tabs-modal">
                  <Tab _selected={{ color: "black", bg: "white" }}>
                    Связаться со мной
                  </Tab>
                  <Tab _selected={{ color: "black", bg: "white" }}>
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
                    />
                    <Input
                      placeholder="Nomeringizni kiriting"
                      onChange={(e) =>
                        setInputs((prev) => ({
                          ...prev,
                          number: e.target.value,
                        }))
                      }
                      value={inputs.number}
                      _placeholder={{ opacity: "0.5" }}
                    />
                  </TabPanel>
                  <TabPanel className="profile-call-center">
                    <h1>Товары</h1>
                    <p>Название: {product?.name}</p>
                    <div className="call-center">
                      <div className="call-number">
                        <a href="tel:+998937226149">71 230 77 99</a>
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
        <div className="product-content">
          <div className="product-xaracteristic">
            <div className="product-in-name">
              <h1>{product?.name}</h1>
              <div className="product-in-infos-images">
                <div className="product-in-main-img">
                  <div className="product-in-big-img">
                    <img src={product?.imageUrl} alt="" />
                  </div>
                </div>
                <div className="product-in-storage">
                  <button>
                    {product?.storages?.map((storage) => (
                      <>
                        <h1
                          onClick={() => setPhoneSize(storage.size)}
                          className={
                            phoneSize === storage.size ? "selected" : ""
                          }
                        >
                          {storage.size}
                        </h1>
                      </>
                    ))}
                  </button>
                  <div className="product-in-small-images">
                    <button>
                      {product?.colors?.map((color) => (
                        <Img
                          key={color._id}
                          src={color.url}
                          alt={`${color.color} - color`}
                          style={{ objectFit: "contain" }}
                          bg={color.color === phoneColor && "blue"}
                          onClick={() => setPhoneColor(color.color)}
                        />
                      ))}
                    </button>
                  </div>
                  <Flex gap={"10px"}>
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      <h1>-</h1>
                    </button>
                    <h1>{quantity}</h1>
                    <button onClick={() => setQuantity(quantity + 1)}>
                      <h1>+</h1>
                    </button>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
          <div className="product-price">
            <h1>Цена товара</h1>
            <p>{product?.price}</p>

            <div className="product-price-buttons">
              <button className="send-to-card" onClick={addKarzina}>
                Добавить в корзину
              </button>
              <button className="buy-now-modals-second" onClick={openModal}>
                Купить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductIN;
