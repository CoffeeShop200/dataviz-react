import HomePage from "./components/HomePage.jsx";
import { Route, Routes } from "react-router-dom";
import Mentions from "./components/legal/Mentions.jsx";
import Accessibility from "./components/legal/Accessibility.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/morts" element={<HomePage />} />
      <Route path="/mentions" element={<Mentions />} />
      <Route path="/accessibility" element={<Accessibility />} />
    </Routes>
    <Footer />
</>
  );
}
