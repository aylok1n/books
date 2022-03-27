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
        <Route path="/">
          <Route index element={<Navigate to={'books'} />} />
          <Route path="/books">
            <Route index element={<MainPage />} />
            <Route path=":id" element={<BookPage />} />
          </Route>

        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
