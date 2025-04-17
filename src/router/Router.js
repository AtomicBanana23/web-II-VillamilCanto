import {Routes, Route} from "react-router-dom";

import Home from '../page/Home';
import Episodes from '../page/Episodes';
import SingleEpisode from "../page/singleEpisode";
import CharacterList from "../page/CharacterList";

export default function MyRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/episodes" element={<Episodes />} />
      <Route path="/episode/:id" element={<SingleEpisode />} />
      <Route path="/characters" element={<CharacterList />} />
    </Routes>
  );
}