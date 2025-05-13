import {Routes, Route} from "react-router-dom";

import Home from '../page/Home';
import Meal from "../page/meal";

export default function MyRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meal/:id" element={<Meal />} />
    </Routes>
  );
}