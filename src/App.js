import Dataform from "./components/Dataform";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReadExcel from "./components/ReadExcel";

function App() {
  return (
  <>
  <BrowserRouter>
  <Header />
  <Navbar />
  <Routes>
   <Route path="/" element={<ReadExcel />} />
   <Route path="/createpdf" element={<Dataform />} />
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
