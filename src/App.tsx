import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BookPage } from "./pages/book_page";
import { MainPage } from "./pages/main_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to={'books'} />} />
          <Route path="books" element={<MainPage />}>
            <Route path=":bookid" element={<BookPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
