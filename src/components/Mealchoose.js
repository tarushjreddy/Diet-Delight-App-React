import React from "react";
import "./MealPackageSubsciption/MealpkgSubscription.css";
import food_icon from "../assets/meal.png";
import logo_web from "../assets/logo.png";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";

export default function Mealchoose(props) {
  let dropDownLinkStyle = {
    color: "red",
  };
  return (
    <div className="row row_bg meal_choosecontainer">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "10px",
          paddingLeft: "10px",
          width: "100%",
        }}
      >
        <Link
          to={{
            pathname: "/",
          }}
        >
          <img
            href="http://localhost:3000/"
            src={logo_web}
            className="logo_web"
          ></img>
        </Link>

        <a href="/" className="choose_your_meal_text">
          {props.name}
        </a>

        <div className="options">
          <a href="/" className="choose_your_meal_text2">
            CONSULTING
          </a>
          <a href="/" className="choose_your_meal_text2">
            MEAL PLAN
          </a>
          <a href="/" className="choose_your_meal_text2">
            LOGOUT
          </a>
        </div>
        <DropdownButton
          title="v"
          variant="secondary"
          style={{ display: "none" }}
        >
          <Dropdown.ItemText>
            {" "}
            <a href="/" className="choose_your_meal_text2">
              Consulting
            </a>
          </Dropdown.ItemText>
          <Dropdown.ItemText>
            {" "}
            <a href="/" className="choose_your_meal_text2">
              Meal Plan
            </a>
          </Dropdown.ItemText>
          <Dropdown.ItemText>
            {" "}
            <a href="/" className="choose_your_meal_text2">
              Logout
            </a>
          </Dropdown.ItemText>
        </DropdownButton>
      </div>
    </div>
  );
}
