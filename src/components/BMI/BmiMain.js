import React, { useState, useEffect } from "react";
import { sizing } from '@material-ui/system';
import "./BMiMain.css";
import BmiQueandTextfield from "./BmiQueandTextfield";
import { Link ,useHistory} from 'react-router-dom';
import axios from "../../axiosInstance";
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import SimpleSlider from './slider.js';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const PrettoSlider = withStyles({
disabled: {
    color: "black",
  },
  root: {
    color: "#EFEFEF",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    color: "#52af77",
    
 backgroundColor: "#52af77",
    border: "4px solid #52af77 r",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
          backgroundColor: "#52af77",

    }
  },
  valueLabelDisplay:{
 backgroundColor: "red",
  },
  active: {
       backgroundColor: "red",
       
  },
  track: {
    height: 8,
    borderRadius: 9,
    color: "#52af77"
  },
  rail: {
    height: 8,
    borderRadius: 0,
    opacity: 1
  }
})(Slider);


function valuetext(value) {
  return `${value}°C`;
}

export default function BmiMain(props) {
      var timeout;

  const [agevalue, setageValue] = React.useState([0, 100]);
  const [heightvalue, setheightValue] = React.useState([0, 100]);
    const [value, setValue] = React.useState([0, 100]);
  const handleChange = (event, newValue) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
   
      setValue(newValue);
         console.log(value);  
    }, 10);
  };

    const handleageChange = (event, newValue) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
   
      setageValue(newValue);
         console.log(agevalue);  
    }, 10);
  };
    const handleheightChange = (event, newValue) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
   
      setheightValue(newValue);
         console.log(heightvalue);  
    }, 10);
  };
     const classes = useStyles();
    const [val, setVal] = useState([30,40])
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(0);

    const validateOnlyNumeric = (data, relatedTo) => {
        console.log(data, relatedTo);
        var numeric = "^[0-9]*$";
        if (data.match(numeric)) {
            if (relatedTo === "weight") {
                setWeight(data);
            } else if (relatedTo === "height") {
                setHeight(data);
            } else {
                setAge(data);
            }
        }
    };

    const calculateBMI = () => {
        let heightInMeter = height / 100;
        let BmiScoreWithoutFixDecimal = weight / (heightInMeter * heightInMeter);
        let BmiScore = BmiScoreWithoutFixDecimal.toFixed(1);
        let calorieInTake = null;
        let category = "";
        console.log(heightInMeter, BmiScore);
        if (BmiScore < 18.5) {
            category = "Under Weight";
            if (gender === "male") {
                calorieInTake = 1800;
            } else {
                calorieInTake = 1600;
            }
            console.log(calorieInTake);
            handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
        } else if (BmiScore >= 18.5 && BmiScore <= 24.9) {
            category = "Normal Weight";
            if (gender === "male") {
                calorieInTake = 1400;
            } else {
                calorieInTake = 1200;
            }
            console.log(calorieInTake);
            handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
        } else if (BmiScore >= 25 && BmiScore <= 29.9) {
            category = "OverWeight";
            if (gender === "male") {
                calorieInTake = 1400;
            } else {
                calorieInTake = 1200;
            }
            console.log(calorieInTake);
            handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
        } else {
            category = "Obesity";
            if (gender === "male") {
                calorieInTake = 1600;
            } else {
                calorieInTake = 1400;
            }
            console.log(calorieInTake);
            handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
        }
    };

    const handleNavigation = (
        BmiScore,
        heightInMeter,
        category,
        calorieInTake
    ) => {
        let genderInNumber = gender === "male" ? 0 : 1;
        let bmiInString = BmiScore.toString();
        let calorieInTakeString = calorieInTake.toString();
        axios
            .put("user", {
                age: age,
                gender: genderInNumber,
                bmi: bmiInString,
                recommended_calories: calorieInTakeString,
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert("Updated Successfully");
                    props.toggleReportBMI(
                        BmiScore,
                        heightInMeter,
                        category,
                        calorieInTake
                    );
                }
    });
    };

    return ( <
        div className = "bmi_main_container" >
        <
        div className = "row_bmi" >
        <
        div className = " card_bmi" style={{height:"380px"}} >
        <
        div className = "icon_container_remove" >
        <
        i className = "fa fa-times icon_remove_icon"
        onClick = {
            () => props.closeBMI()
        } >
        <
        /i> < /
        div >

        <
        h6 className = "title_bmi" > Let "s calculate your BMI</h6>
    <div style={{display:"flex", flexDirection:"column", alignItems: 'center', width:"1000px", margin:"0px", padding:"0px", justifyContent: 'center', }}>
        <
        div className = "row row_bmi_bmi" >
        <
        div className = " col_container" >
       
    
        <
        h6 className = "ques_title_bmi" > What is your gender ? < /h6>

        <
        div className = "row icon_container_main_bmi" >
        <
        div className = "icon_container_bmi"
        id = "maleContainer"
        onClick = {
            () => {
                var selectMaleContainer = document.getElementById(
                    "maleContainer"
                );
                var selectMale = document.getElementById("male");
                selectMale.style.color = "#fff";
                selectMaleContainer.style.background = "#8BC441";
                var selectFemaleContainer = document.getElementById(
                    "femaleContainer"
                );
                var selectFemale = document.getElementById("female");
                selectFemale.style.color = "#000";
                selectFemaleContainer.style.background = "#fff";
                setGender("male");
                console.log("male");
            }
        } >
        <
        i className = "fa fa-mars icon_bmi"
        id = "male"
        aria-hidden = "true" >
        <
        /i> <
        h6 className = "male_text_btn_bmi" > Male < /h6> < /
        div >

        <
        div className = "icon_container_bmi"
        id = "femaleContainer"
        onClick = {
            () => {
                var selectFemaleContainer = document.getElementById(
                    "femaleContainer"
                );
                var selectFemale = document.getElementById("female");
                selectFemale.style.color = "#fff";
                selectFemaleContainer.style.background = "#8BC441";
                var selectMaleContainer = document.getElementById(
                    "maleContainer"
                );
                var selectMale = document.getElementById("male");
                selectMale.style.color = "#000";
                selectMaleContainer.style.background = "#fff";
                setGender("female");
                console.log("female");
            }
        } >
        <
        i className = "fa fa-venus icon_bmi"
        aria-hidden = "true"
        id = "female" >
        <
        /i> <
        h6 className = "male_text_btn_bmi" > Female < /h6> < /
        div > <
        /div> < /
        div >
           <div style={{display: "flex", flexDirection:"column", alignItems:"center", marginLeft:"70px"}} >

        <
        h6 className = "ques_title_bmi" style={{marginBottom:"40px"}} > What is your Height ? ({heightvalue})< /h6>

  <PrettoSlider
 
        onChange={handleheightChange}
 valueLabelDisplay="active"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        orientation="horizontal"
        aria-label="pretto slider"
        defaultValue={20}
      />

      </div>
             </div>
        
 <div style={{ display: "flex", alignItems: "center",minWidth:"260px",marginTop:"20px", marginLeft:"240px"}}>
<div style={{display: "flex", flexDirection:"column", alignItems:"center",marginRight:"10px"}} >

        <h6 className = "ques_title_bmi" style={{marginBottom:"40px"}} > What is your Age ? ({agevalue}) </h6>
        <PrettoSlider
 
        onChange={handleageChange}
    valueLabelDisplay="active"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        orientation="horizontal"
        aria-label="pretto slider"
        defaultValue={20}
      />

{/* 
  <Slider
  style={{width:180, margin: 4, color:"#8bc441"}} 

  defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      
      /> */}
     </div>

 
      <div style={{display: "flex", flexDirection:"column", alignItems:"center", marginLeft:"72px", minWidth:"220px"}} >

        <h6 className = "ques_title_bmi" style={{marginBottom:"40px"}} > What is your weight? ({value}) </h6>

   {/* <div className={classes.root} style={{ height: "100vh",  }}> */}
      <PrettoSlider
 
        onChange={handleChange}
 valueLabelDisplay="active"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        orientation="horizontal"
        aria-label="pretto slider"
        defaultValue={20}
      />
    {/* </div> */}
  {/* <Slider
  minHeight="75%"

  style={{width:180, margin: 4, color:"#8bc441", }} 
  defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      
      /> */}
    
      
      </div>
      </div>
      </div>

        <
        /div> <
        div className = "btn_next_container" >
        <
        button className = "btn btn_next_bmi"
        onClick = {
            () => calculateBMI()
        } >
        Next <
        /button> < /
        div > <
        /div> < /
        div > 
    );
}