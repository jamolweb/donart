import { Route, Routes } from "react-router-dom";
import Main from "../components";
import Favorites from "../components/layout/pages/Favorites";

export default function XXX() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="Like" element={<Favorites />} />
    </Routes>
  );
}
