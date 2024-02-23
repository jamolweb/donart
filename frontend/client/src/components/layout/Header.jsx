import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  CategoryIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  KarzinaIcon,
  LocationIcon,
  PercentIcon,
  TelegramIcon,
  UserIcon,
} from "../../assets/icons";
import { userAtom } from "../../atoms/userAtom";
import { ContentPK } from "./ContextPK";

function Header() {
  const { karzina } = useContext(ContentPK);
  const { heart } = useContext(ContentPK);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("top");
  const [authModalType, setAuthModalType] = useState(null);
  const [registerInputs, setRegisterInputs] = useState({
    number: "",
    password: "",
    password2: "",
    fullName: "",
  });
  const [loginInputs, setLoginInputs] = useState({ number: "", password: "" });
  const [isPasswordVisibleRegister, setIsPasswordVisibleRegister] =
    useState(false);
  const [isPasswordVisibleLogin, setIsPasswordVisibleLogin] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userModal, setUserModal] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const hadleOpenModal = () => {
    onOpen();
    setAuthModalType("login");
  };

  // Helper function to set the token in localStorage
  const setToken = (token) => localStorage.setItem("accessToken", token);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3030/auth/login`, {
        number: loginInputs.number,
        password: loginInputs.password,
      });


      // Store the token in localStorage
      setToken(response.data.accessToken);

      // Close the login modal
      setLoginInputs({ number: "", password: "" });
      onClose();
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      setLoginError("Nomer yoki parol hato yozilgan!");
    }
  };

  const handleRegister = async () => {
    if (!registerInputs.fullName.trim()) {
      setRegisterError("Ism familiyangizni kiriting");
    } else if (registerInputs.number.length !== 13) {
      setRegisterError("Nomeringizni kiriting");
    } else if (registerInputs.password !== registerInputs.password2) {
      setRegisterError("Parollaringizni to'g'ri kiriting");
    } else if (registerInputs.password.length === 0) {
      setRegisterError("Parol kiriting");
    } else if (registerInputs.password2.length === 0) {
      setRegisterError("Parol kiriting");
    } else {
      setRegisterError("");
      try {
        const response = await axios.post(
          `http://localhost:3030/auth/register`,
          {
            fullName: registerInputs.fullName,
            number: registerInputs.number,
            password: registerInputs.password,
          }
        );

        // Store the token in localStorage
        setToken(response.data.loggedIn.accessToken);
        setUser(response.data.newUser);

        // Close the register modal
        onClose();
        setRegisterInputs({
          number: "",
          password: "",
          password2: "",
          fullName: "",
        });
      } catch (error) {
        setRegisterError("Siz kiritgan nomerga account allaqachon ochilgan");
      }
    }
  };

  const autoLogin = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(`http://localhost:3030/auth/autologin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  // Auto login when the user returns
  useEffect(() => {
    autoLogin();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <header className="header">
      <div className="header-center">
        <div className="container">
          <div className="header-row">
            <div className="header-center__col__responsive">
              <a href="#" className="header-center__social">
                <TelegramIcon />
              </a>
              <a href="#" className="header-center__social">
                <FacebookIcon />
              </a>
              <a href="#" className="header-center__social">
                <InstagramIcon />
              </a>
            </div>

            <div className="header-center__col">
              <Link to="/">
                <a href="#" className="header-center__logo">
                  Donart.uz
                </a>
              </Link>
            </div>

            <div className="header-box-menu">
              <div className="header-center__col">
                <Link to="/Location">
                  <a href="#" className="header-center__link">
                    <span className="header-center__icon">
                      <LocationIcon />
                    </span>
                    Наши локации
                  </a>
                </Link>
              </div>
            </div>
            <div className="header-end-button-responsive">
              <button
                className="header-end-button-button-responsive"
                w="197px"
                h="47px"
                colorScheme="pink"
                onClick={onOpen}
              >
                <span>
                  <CategoryIcon />
                </span>
                <p className="header-menu-name">Каталог товаров</p>
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="header-end">
            <div className="header-end-button">
              <button
                className="header-end-button-button"
                w="197px"
                h="47px"
                colorScheme="pink"
                // onClick={onOpen}
              >
                <span>
                  <CategoryIcon />
                </span>
                <p>Каталог товаров</p>
              </button>
            </div>

            <div className="header-end-buttons">

              <Link to="/karzina">
                <button>
                  <KarzinaIcon />
                  <span>Корзина</span>
                </button>
              </Link>
              {user ? (
                <Flex flexDirection={"column"}>
                  <Flex
                    onClick={() => setUserModal(!userModal)}
                    justifyContent={"space-between"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    cursor={"pointer"}
                  >
                    <VscAccount fontSize={"25px"} />
                    <Text>{user.fullName.slice(0, 10)}...</Text>
                  </Flex>
                  {userModal && (
                    <>
                      <Box
                        position={"absolute"}
                        top={"180px"}
                        right={{
                          base: "10px",
                          md: "30px",
                          "2xl": "40px",
                          xl: "180px",
                        }}
                        w={"250px"}
                        bg={"white"}
                        h={"60px"}
                        p={"10px"}
                        zIndex={123}
                      >
                        <Button
                          onClick={handleLogOut}
                          color={"black"}
                          w={"100%"}
                          p={"5px 10px"}
                        >
                          <Flex
                            alignItems={"center"}
                            justifyContent={"space-evenly"}
                          >
                            <LuLogOut />
                            <Text fontSize={"20px"}>Log out</Text>
                          </Flex>
                        </Button>
                      </Box>
                    </>
                  )}
                </Flex>
              ) : (
                <button onClick={hadleOpenModal}>
                  <UserIcon />
                  <span>Boйти</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              {authModalType === "login" && (
                <ModalHeader mt={"40px"} textAlign={"center"}>
                  Вход
                </ModalHeader>
              )}
              {authModalType === "register" && (
                <ModalHeader mt={"40px"} textAlign={"center"}>
                  Регистрация
                </ModalHeader>
              )}
              <ModalBody pb={6}>
                {authModalType === "login" && (
                  <>
                    <FormControl>
                      <FormLabel>Номер телефона</FormLabel>
                      <PhoneInput
                        country={"uz"}
                        value={loginInputs.number}
                        onChange={(e) =>
                          setLoginInputs((prev) => ({
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
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Пароль</FormLabel>
                      <Input
                        type={!isPasswordVisibleLogin ? "password" : "text"}
                        placeholder="Пароль *"
                        onChange={(e) =>
                          setLoginInputs((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <Flex
                      p={"10px"}
                      gap={"5px"}
                      onClick={() =>
                        setIsPasswordVisibleLogin(!isPasswordVisibleLogin)
                      }
                    >
                      <Checkbox isChecked={isPasswordVisibleLogin} />
                      <Text cursor={"pointer"}>Parollarni korish</Text>
                    </Flex>
                    <Text color={"red"} fontWeight={900}>
                      {loginError}
                    </Text>

                    <Flex gap={"10px"} mt={6} spacing={3}>
                      <Text color="black" ml={"10px"}>
                        Нет аккаунта?
                      </Text>
                      <Text
                        cursor={"pointer"}
                        color="blue.300"
                        _hover={{
                          color: "blue.500",
                          textDecoration: "underline",
                        }}
                        onClick={() => setAuthModalType("register")}
                      >
                        Зарегистрироваться
                      </Text>
                    </Flex>
                  </>
                )}
                {authModalType === "register" && (
                  <>
                    <FormControl>
                      <FormLabel>Имя и фамилия *</FormLabel>
                      <Input
                        placeholder="Имя и фамилия *"
                        onChange={(e) =>
                          setRegisterInputs((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <PhoneInput
                        country={"uz"}
                        value={registerInputs.number}
                        onChange={(e) =>
                          setRegisterInputs((prev) => ({
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
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Придумайте пароль *</FormLabel>
                      <Input
                        placeholder="Придумайте пароль *"
                        type={isPasswordVisibleRegister ? "text" : "password"}
                        onChange={(e) =>
                          setRegisterInputs((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Подтвердите пароль *</FormLabel>
                      <Input
                        placeholder="Подтвердите пароль *"
                        type={isPasswordVisibleRegister ? "text" : "password"}
                        onChange={(e) =>
                          setRegisterInputs((prev) => ({
                            ...prev,
                            password2: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <Text color={"red"} fontWeight={900}>
                      {registerError}
                    </Text>
                    <Flex
                      p={"10px"}
                      gap={"5px"}
                      onClick={() =>
                        setIsPasswordVisibleRegister(!isPasswordVisibleRegister)
                      }
                    >
                      <Checkbox isChecked={isPasswordVisibleRegister} />
                      <Text cursor={"pointer"}>Parollarni korish</Text>
                    </Flex>
                    <Flex gap={"10px"}>
                      <Text color="black" ml={"10px"}>
                        Уже есть аккаунт?
                      </Text>
                      <Text
                        cursor={"pointer"}
                        color="blue.500"
                        _hover={{
                          color: "blue.500",
                          textDecoration: "underline",
                        }}
                        onClick={() => setAuthModalType("login")}
                      >
                        Войти
                      </Text>
                    </Flex>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                {authModalType === "register" && (
                  <Button
                    colorScheme="teal"
                    mr={3}
                    onClick={handleRegister}
                    isLoading={false}
                  >
                    Зарегистрироваться
                  </Button>
                )}
                {authModalType === "login" && (
                  <Button
                    colorScheme="teal"
                    mr={3}
                    onClick={handleLogin}
                    isLoading={false}
                  >
                    Войти
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </div>
    </header>
  );
}

export default Header;
