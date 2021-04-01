import React from 'react'
import "./nav_bar.css"
import logo_web from "../../assets/logo.png";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";
function Nav_ud(props) {
    return (
        <div className="nav">

         <div className="logo">
    <Link
          to={{
            pathname: "/",
          }}
        >
          <img
            href="http://localhost:3000/"
            src={logo_web}
           className="logo_pro"
          ></img>
        </Link>

         </div>
           <div className="header">
   <a href="/" className="link_header" >
          {props.name}
        </a>
         </div>
         <div className="logo">
         <div
      
  
          className="options"
        >
          <a href="/" className="choose_your_meal_text2">
            Consulting
          </a>
          <a href="/" className="choose_your_meal_text2">
            Meal Plan
          </a>
          <a href="/" className="choose_your_meal_text2">
            Logout
          </a>
        </div>
        <DropdownButton
        className="options_btn"
          title="v"
          variant="secondary"
       
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
    )
}

export default Nav_ud
