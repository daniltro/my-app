import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/loginPage/loginPage";
import MainPage from "./components/mainPage/mainPage";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>
  );
}

export default App;
