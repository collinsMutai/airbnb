import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";

// axios.defaults.baseURL = import.meta.env.VITE_baseURL;

axios.defaults.baseURL = 'http://localhost:4000';

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          {/* <Route path="/account/places/:id" element={<AccountPage />} /> */}
          <Route path="/account/:subpage/:action" element={<PlacesPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
