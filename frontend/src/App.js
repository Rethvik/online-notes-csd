import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SingleNote from "./components/SingleNote";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateNote from "./screens/MyNotes/CreateNote";
import Mynotes from "./screens/MyNotes/Mynotes";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import Protected from "./components/Protected";
import { useSelector } from "react-redux";
import ProtectedLogin from "./components/ProtectedLogin";
function App() {
  let logged = useSelector((state) => state.login.isLogged);
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    logged = userInfo.token ? true : false;
  }
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <ProtectedLogin isLogged={logged}>
                <LoginScreen />
              </ProtectedLogin>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedLogin isLogged={logged}>
                <RegisterScreen />
              </ProtectedLogin>
            }
          />
          <Route
            path="/mynotes"
            element={
              <Protected isLogged={logged}>
                <Mynotes />
              </Protected>
            }
          ></Route>
          <Route
            path="/note/:id"
            element={
              <Protected isLogged={logged}>
                <SingleNote />
              </Protected>
            }
          ></Route>
          <Route
            path="/createnote"
            element={
              <Protected isLogged={logged}>
                <CreateNote />
              </Protected>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
