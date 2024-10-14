import "./App.css";
import { Route, Routes } from "react-router-dom";
import BookPage from "./pages/BookPage";

const App = () => {
  return (
    <div className="font">
      <h1>도서 조회 및 리뷰</h1>
      <Routes>
        <Route path="/" element={<BookPage />} />
        <Route path="/:category" element={<BookPage />} />
      </Routes>
    </div>
  );
};

export default App;
