import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Searched from "./pages/Searched";
import Recipe from "./pages/Recipe";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/recipe/:name" element={<Recipe />} />
          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
