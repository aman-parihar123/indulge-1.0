import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Form from "./pages/form/Form";
import SignIn from "./pages/sign_in/SignIn";
import Company_dashboard from "./pages/company-dashboard/Company_dashboard";
import Admin_dashboard from "./pages/admin-dashboard/Admin_dashboard";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  const [type, setType] = useState("");
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/admin_dashboard" element={<Admin_dashboard />} />
      <Route
        path="/company_dashboard"
        element={<Company_dashboard type={type} setType={setType} />}
      />
      {/* <Route path="/form" element={<Form type={type} setType={setType} />} /> */}
      <Route path="/JNF_form/:obj_id" element={<Form type="JNF" setType={setType} />} />
      <Route path="/INF_form/:obj_id" element={<Form type="INF" setType={setType} />} />
      {/* <Route path="/about" element={<Form />} />
      <Route path="/contact" element={<Form />} /> */}
    </Routes>
  );
}

export default App;
