import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import List from "./pages/daily/List";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="daily">
            <Route path="list" element={<List />} /> {/* => http://localhost:3000/daily/list  */}
            <Route path="create" element={<></>} /> {/* => http://localhost:3000/daily/create  */}
            <Route path=":id">
              <Route path="detail" element={<></>} /> {/* => http://localhost:3000/daily/:id/detail  */}
              <Route path="update" element={<></>} /> {/* => http://localhost:3000/daily/:id/update  */}
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
