import axios from "axios";

export const karzinka_services = {
  handleNewOrder: (
    backendUrl,
    userName,
    userNumber,
    orderItems,
    setInputs,
    onClose,
    setCount,
    setKarzina,
    navigate
  ) => {
    setCount([]);
    axios
      .post(`${backendUrl}/orders`, {
        userName,
        userNumber,
        orderItems,
      })
      .then(() => {
        navigate("/");
        setInputs({ userName: "", number: "" });
        onClose();
        setCount([]);
        setKarzina([]);
      });
  },
  increase: (id, count, setCount) => {
    let newCount = count.map((elem) => {
      if (elem._id === id) {
        return {
          ...elem,
          count: elem.count + 1,
        };
      }
      return elem;
    });
    setCount(newCount);
  },
  decrease: (id, count, setCount) => {
    let newCount = count.map((elem) => {
      if (elem._id === id && elem.count > 1) {
        return {
          ...elem,
          count: elem.count - 1,
        };
      }
      return elem;
    });
    setCount(newCount);
  },
  removeProductFromKarzina: (productId, count, setCount, setKarzina) => {
    const updatedKarzina = count.filter((product) => product._id !== productId);
    setCount(updatedKarzina);
    setKarzina(updatedKarzina);
  },
};
