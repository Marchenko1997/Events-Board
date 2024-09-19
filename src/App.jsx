import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const Event = lazy(() => import("./pages/Event/Event"));
const Register = lazy(() => import("./pages/Register/Register"));
const Participants = lazy(() => import("./pages/Participants/Participants"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Login = lazy(() => import("./pages/Login/Login"));
const User = lazy(() => import("./pages/User/User"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-events"
          element={<PrivateRoute component={<User />} />}
        />
        <Route path="/:id/participants" element={<Participants />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/event-details/:id" element={<Event />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
