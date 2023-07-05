import React, { Suspense } from "react";
import "./Company_dashboard.css";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";
import CardContainer from "../../Components/CardContainer";
import Hero_section from "../../Components/HeroContainer";
import Loader from "../../Components/Loader.jsx";

export default function Company_dashboard() {
  return (
    <div className="company-dashboard-container">
      <Header />
      <Hero_section />
      <Suspense fallback={<Loader />}>
      <CardContainer />
      </Suspense>
    </div>
  );
}