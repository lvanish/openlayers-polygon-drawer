import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import MapComponent from "./components/MapComponent";

export interface UserData {
  firstName: string;
  mobile: string;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    mobile: "",
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent setUserData={setUserData} />} />
        <Route
          path="/map"
          element={<MapComponent firstName={userData.firstName} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
