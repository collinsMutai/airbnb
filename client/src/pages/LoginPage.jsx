import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);
  const { user,setUser } = useContext(UserContext);
  // console.log(user);

  async function loginUser(ev) {
    ev.preventDefault();
    // console.log(email, password);
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      console.log(data);
      setUser(data.user);
     
      // localStorage.setItem("user info", data.user['name'])
      // localStorage.setItem("email", data.user['email'])
      alert("login successful");
      setRedirect(true);
    } catch (error) {
      alert("login failed!");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-black">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;