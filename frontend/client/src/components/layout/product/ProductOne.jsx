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
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  BasketIcon,
  CompareIcon,
  CrownIcon,
  HeartIconProduct,
  StarIcon,
} from "../../../assets/icons";
import { ContentPK } from "../ContextPK";
import axios from "axios";
import { services } from "../../profuct-in/servises";
import { useRecoilState } from "recoil";
import { userAtom } from "../../../atoms/userAtom";

function ProductOne({ item }) {
  const { karzina, setKarzina } = useContext(ContentPK);
  const [inputs, setInputs] = useState({ userName: "", number: "" });
  const { heart, setHeart } = useContext(ContentPK);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [user] = useRecoilState(userAtom);
  const backendUrl = "http://localhost:3030";

  const handleBasketClick = (clickedItem) => {
    const isProductAdded = karzina.some(
      (product) => product?._id === clickedItem?._id
    );
    if (!isProductAdded) {
      toast({
        title: "Добавлено в корзину",
        description: `${clickedItem.name}`,
        status: "success",
        duration: 500,
        isClosable: true,
      });
      setKarzina((prev) => [...prev, clickedItem]);
    } else {
      alert(`"${clickedItem.name}" savatga allaqachon qo'shilgan`);
    }
  };

  const handleHeartClick = (item) => {
    let idPro = [];
    heart.map((el) => {
      idPro.push(el.id);
    });

    if (idPro.indexOf(item.id) === -1) {
      setHeart((el) => [...el, item]);
    }
  };

  const handleNewOrder = (productId) => {
    onClose();
    try {
      services.handleNewOrder(backendUrl, inputs.userName, inputs.number, [
        { productId },
      ]);
      setInputs({ userName: "", number: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="header-button">
        <div>
          {item.is_bestseller ? (
            <button className="crown">
              <CrownIcon />
            </button>
          ) : null}
        </div>
        <div className="hover-buttons-product">
          <button className="btnCompair">
            <CompareIcon />
          </button>
          <button onClick={() => handleHeartClick(item)}>
            <HeartIconProduct />
          </button>
        </div>
      </div>
      <Link to={`/product/${item._id}`}>
        <div className="card-img">
          <img src={item.imageUrl} alt="" />
        </div>
      </Link>
      <div className="card-menu">
        <h1>
          <span>
            <StarIcon />
          </span>
          (5.0) 0 отзывов
        </h1>
        <h2>{item.price}</h2>

        <div className="card-menu-title-item">
          <p>{item.name} </p>
        </div>
        <h4>
          Бренд:<span> {item.brand}</span>
        </h4>
      </div>
      {user === null ? (
        <div className="card-button">
          <button className="buyNow" onClick={onOpen}>
            Купить сразу
          </button>

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
                      <p>Название: {item?.name}</p>
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
                  onClick={() => handleNewOrder(item._id)}
                >
                  Отправить
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <button className="basket" onClick={() => handleBasketClick(item)}>
            <BasketIcon />
            <p>Savatga</p>
          </button>
        </div>
      ) : (
        <button className="basket-100" onClick={() => handleBasketClick(item)}>
          <BasketIcon />
          <p>Savatga</p>
        </button>
      )}
    </div>
  );
}

export default ProductOne;
