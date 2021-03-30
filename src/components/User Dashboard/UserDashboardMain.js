import React, { useEffect, useState } from "react";
import logo_web from "../../assets/logoweb.png";
import Forms from "../Forms/forms.js";
import "./main.css";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import Mealchoose from "../Mealchoose";
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal'
import 'reactjs-popup/dist/index.css';
import {
    LeadContainer,
    MainContainer,
    LeftContainer,
    UpperContainer,
    UpperLeftContainer,
    UpperMiddleContainer,
    RightContainer,
    ForeFrontText,
    FormContent,
    Button,
    Input,
    EmailInput,
    TextArea,
    Anchor,
    InsideCircleText,
    RoundCircle,
    UpperRightContainerText,
    BMIButton,
    GrandContainer,
    GrandContainer2,
} from "./UserDashboardElements";
import axios from "../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import BmiMain from "../BMI/BmiMain";
import Bmireport from "../BMI Report/Bmireport";
import ChangePassword from "../Auth/ResetChangePassword/ChangePassword";
export default function UserDashboardMain() {
      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    let history = useHistory();
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [primaryAddress, setPrimaryAddress] = useState("");
    const [primaryAddressLine2, setPrimaryAddressLine2] = useState("");
    const [secondaryAddress, setSecondaryAddress] = useState("");
    const [secondaryAddressLine2, setSecondaryAddressLine2] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [toggleBMI, setToggleBMI] = useState(false);
    const [toggleUpdate, setToggleUpdate] = useState(false);

    const [toggleBMIReport, setToggleBMIReport] = useState(false);
    const [toggleChangePassword, setToggleChangePassword] = useState(false);
    const [editProfile, setEditProfile] = useState(true);
    const [bmiReport, setBMIReport] = useState({});
    const [userCategory, setCategory] = useState("");
    const [userGender, setUserGender] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        axios
            .get(`user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((res) => {
                console.log(res);
                setUser(res.data);
                setPhone(res.data.mobile);
                console.log(typeof res.data.gender);
                let BmiScore = parseFloat(res.data.bmi);
                if (BmiScore < 18.5) {
                    setCategory("Under Weight");
                } else if (BmiScore >= 18.5 && BmiScore <= 24.9) {
                    setCategory("Normal Weight");
                } else if (BmiScore >= 25 && BmiScore <= 29.9) {
                    setCategory("OverWeight");
                } else {
                    setCategory("Obesity");
                }

                let genderInNumber = res.data.gender;
                console.log(genderInNumber);
                if (genderInNumber > 0) {
                    setUserGender("Female");
                } else {
                    setUserGender("Male");
                }
            });
    };

    const handleUpdate = () => {
        console.log("handled update");
        setEditProfile(false);
    };

    const closeBMI = () => {
        console.log("handled update");
        setToggleBMI(false);

    };
      const closeUpdate = () => {
        console.log("handled update");
        setToggleUpdate(false);
        
    };

    const closeChangePassword = () => {
        console.log("handled update");
        setToggleChangePassword(false);
    };

    const toggleBMIReportVisibility = (
        BmiScore,
        heightInMeter,
        category,
        calorieInTake
    ) => {
        setToggleBMI(false);
        setBMIReport({
            BmiScore: BmiScore,
            heightInMeter: heightInMeter,
            category: category,
            calorieInTake: calorieInTake,
        });
        setToggleBMIReport(true);
    };

    const toggleReport = () => {
        setToggleBMI(false);
        setToggleBMIReport(false);
    };

    const validateOnlyNumeric = (data) => {
        console.log(data);
        var numeric = /^([0|\+[0-9]{1,5})?\s?([0-9]*)$/;
        console.log(numeric.test(data));
        if (numeric.test(data)) {
            console.log("inside");
            setPhone(data);
        }
    };

    const saveUpdate = () => {
        console.log("Save Update");

        axios
            .put(`user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                first_name: firstName === "" ? user.firstName : firstName,
                last_name: lastName === "" ? user.lastName : lastName,
                mobile: phone === "" ? user.mobile : phone,
                primary_address_line1: primaryAddress === "" ? user.primary_address_line1 : primaryAddress,
                primary_address_line2: primaryAddressLine2 === "" ?
                    user.primary_address_line2 :
                    primaryAddressLine2,
                secondary_address_line1: secondaryAddress === "" ?
                    user.secondary_address_line1 :
                    secondaryAddress,
                secondary_address_line2: secondaryAddressLine2 === "" ?
                    user.secondary_address_line2 :
                    secondaryAddressLine2,
            })
            .then((res) => {
                console.log(res);

                setUser(res.data);
                setEditProfile(true);
                console.log(user);
            });
    };

    return ( <
        LeadContainer > { " " } {
            toggleBMI && ( <
                BmiMain closeBMI = { closeBMI }
                toggleReportBMI = { toggleBMIReportVisibility }
                />
            )
        } { " " } {
            toggleChangePassword && ( <
                ChangePassword closeChangePassword = { closeChangePassword }
                changePassword = { true }
                />
            )
        } { " " } {
            toggleBMIReport && ( <
                Bmireport bmiReport = { bmiReport }
                toggleReport = { toggleReport }
                />
            )
        } { " " } { /* <img src={logo_web} className="logo_web"></img> */ } { " " } <
        Mealchoose name = "User Dashboard" / >
        <
        GrandContainer  >
        <
        GrandContainer2 style={{backgroundColor:"transparent", width:"50%"}} >
        <
        UpperContainer style={{backgroundColor:"transparent", display:"flex", alignItems: 'center',justifyContent: 'space-around',}} >
        <
        UpperLeftContainer >
        <
        h6 >
        <
        b style = {
            {
            color:"#303960",
                fontFamily: "Roboto",
                fontWeight: "700",
                margin:"0px"
            }
        } >
        Recommended { " " } <
        /b>{" "} <
        /h6>{" "} <
        h2 >
        <
        b style = {
            {
                     color:"#303960",
                fontFamily: "Roboto",
                fontWeight: "700",
            }
        } >
        { user.recommended_calories }
        Kcal / day { " " } <
        /b>{" "} <
        /h2>{" "} <
        /UpperLeftContainer>{" "} <
        UpperMiddleContainer > { " " } <
        RoundCircle style={{height:"185px"}}  > { " " } <
        InsideCircleText > { parseFloat(user.bmi).toFixed(1) } <
        /InsideCircleText> <
        /RoundCircle>{" "} <
        /UpperMiddleContainer>{" "} <
        UpperRightContainerText style = {
            {
                          color:"#303960",
                fontFamily: "Roboto",
                fontWeight: "700",
            }
        } >
        { userCategory } { " " } <
        /UpperRightContainerText>{" "} <
        /UpperContainer>
        <div style={{backgroundColor:"transparent", width:"100%", height:"100px", display:"flex", flexDirection:"column",marginLeft:"100px"}}>
          <div style={{backgroundColor:"transparent", width:"100%", display:"flex", flexDirection:"row" }}>
             <ForeFrontText style={{color:"#303960", marginLeft:"10px", fontSize:"40px",      color:"#303960",
                fontFamily: "Roboto",
                fontWeight: "700",}}> {user.first_name} </ForeFrontText>
            <ForeFrontText style={{color:"#303960", marginLeft:"10px", fontSize:"40px",      color:"#303960",
                fontFamily: "Roboto",
                fontWeight: "700",}}> { user.last_name } </ForeFrontText>
                 </div>
                     <div style={{display:"flex", padding: "0px",marginLeft:"10px",alignItems: 'center', }}> <ForeFrontText style={{marginRight:"02px", display:"flex",alignItems: 'center', justifyContent: 'center',}} > { user.age } yrs </ForeFrontText>
          <h5>.</h5>
           < ForeFrontText style={{marginLeft:"02px", display:"flex",alignItems: 'center', justifyContent: 'center', marginTop:"0px"}} > { userGender } </ForeFrontText> </div>

          </div>
            <FormContent style={{width:"100%", display:"flex", flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',marginLeft:"70px"}}> 
            <div style={{margin:"20px", display:"flex", flexDirection: 'row',}}>
                       <MailIcon style={{marginRight:"10px"}}/>
            <ForeFrontText  > { user.email } </ForeFrontText>
       </div>
                        <div style={{margin:"20px", display:"flex", flexDirection: 'row',}}>
                         <PhoneIcon style={{marginRight:"10px"}}/>

        <ForeFrontText > { phone } </ForeFrontText>
             </div>
           </FormContent>
             <FormContent style={{width:"100%", display:"flex", flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginLeft:"90px"}}> 
            <div style={{margin:"20px", display:"flex", flexDirection: 'row'}}>
             <HomeIcon style={{marginRight:"10px"}}/>
<div style={{display:"flex", flexDirection: 'column',}}>
 
<ForeFrontText > Primary Address </ForeFrontText>
        <ForeFrontText > { user.primary_address_line1  } </ForeFrontText></div>
        





 
       </div>
                        <div style={{margin:"20px", display:"flex", flexDirection: 'row',}}>
                        
                         <HomeIcon style={{marginRight:"10px"}}/>
<div style={{display:"flex", flexDirection: 'column',}}>
<ForeFrontText > Secoonadry Address </ForeFrontText>
        <ForeFrontText  > { user.secondary_address_line1  } </ForeFrontText></div>
             </div>
           </FormContent>
               
   
         <
        MainContainer style = {
            {
                background: "transparent",
                backdropFilter: "blur(0px)",
            }
        } >
        
        <LeftContainer style={{backgroundColor:"transparent",display:"flex", width:"500px", display:"flex", flexWrap: 'wrap',marginLeft:"50px", alignItems: 'center',}}>
 
    


  
 <Button  style={{width:"200px", marginRight:"50px"}} onClick={() => setToggleBMI(true)}>
                RECALCULATE BMI{" "}
              </Button>
              {/* <Forms /> */}
 <Link to = "/" >
 
      <
        /Link>{" "}
        <Button style={{width:"220px",marginTop: "30px",}} onClick={handleShow}>
        UPDATE PROFILE { " " } <
        /Button>{" "}
            <Modal show={show} onHide={handleClose} size={`xl`} >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body><Forms firstname={user.first_name} lastname={ user.last_name } phone={phone} email={ user.email } addline1={ user.secondary_address_line1  } addline2={ user.primary_address_line1  } age={ user.age } gender= { userGender }  bmi= { parseFloat(user.bmi).toFixed(1) } cal= { user.recommended_calories }
 /></Modal.Body>
        {/* <Modal.Footer>
         
          <Button variant="primary" onClick={handleClose}>
            Update Profile
          </Button>
        </Modal.Footer> */}
      </Modal>
        
     <
        Button onClick = {
            (e) => {
                e.preventDefault();
                setToggleChangePassword(true);
            }
        } >
        CHANGE PASSWORD { " " } <
        /Button>{" "}
    
        
        
         <
        /LeftContainer>{" "} <
        /MainContainer>{" "} <
        /GrandContainer2>{" "} <
        /GrandContainer>{" "}
        

   <
        /LeadContainer>
         
    );
}