import axios from "axios";

export const services = {
  handleNewOrder: (backendUrl, userName, userNumber, orderItems) => {
    axios
      .post(`${backendUrl}/orders`, {
        userName,
        userNumber,
        orderItems,
      })
      .then(() => alert("zakaz movafaqiyatli amalga oshirildi"));
  },
};
