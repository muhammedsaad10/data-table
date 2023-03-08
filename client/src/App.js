import { Routes, Route, BrowserRouter } from "react-router-dom";
import Table from "./pages/table/Table";
import Tabledata from "./components/form/tabel/Tabledata";
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
