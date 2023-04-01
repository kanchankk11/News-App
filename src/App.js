import "./App.css";

import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>

            <Route exact  path="/" element={<News key="all" pageSize = {16}/>}></Route>
            <Route exact path="/business" element={<News key="business" pageSize = {16} category = "business"/>}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize = {16} category = "sports"/>}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize = {16} category = "entertainment"/>}></Route>
            <Route exact path="/science" element={<News key="science" pageSize = {16} category = "science"/>}></Route>
            <Route exact path="/health" element={<News key="health" pageSize = {16} category = "health"/>}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize = {16} category = "technology"/>}></Route>

          </Routes>
        </Router>
      </>
    );
}
