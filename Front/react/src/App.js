import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SingIn from "./pages/authentication/authentication.component";
import Navigation from "./pages/navigation/navigation.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="auth" element={<SingIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
