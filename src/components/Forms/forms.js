import React from 'react'
import "./main.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
function Forms({firstname, lastname, phone, email, addline1, addline2,age,gender, cal, bmi}) {
    return (
        <div  >
  
        <Form >
              <div style={{marginBottom:"15px"}}>
  <Form.Label>Firstname</Form.Label>
      <Form.Control placeholder="First name" value={firstname}  />
      </div>
            <div style={{marginBottom:"15px"}}>
       <Form.Label>Lastname</Form.Label>
      <Form.Control placeholder="Last name" value={lastname}/>
    </div>

 
   <div style={{display:"flex", justifyContent: 'space-between', width:"100%", marginBottom:"10px"}}>


  <Form.Group style={{width:"200px"}}>
    <Form.Label>Age</Form.Label>
    <Form.Control type="text" placeholder="Gender" value={age} />
  </Form.Group>
    <Form.Group style={{width:"200px"}}>
    <Form.Label>Gender</Form.Label>
    <Form.Control type="text" placeholder="Gender" value={gender} />
  </Form.Group>
      </div>

 <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control value={email} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
   <div style={{display:"flex", justifyContent: 'space-between', width:"100%", marginBottom:"10px"}}>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Primary Address Line1</Form.Label>
    <Form.Control placeholder="Value not entered" value={addline1} />
  </Form.Group>
    <Form.Group controlId="formGridAddress2">
    <Form.Label>Primary Address Line2</Form.Label>
    <Form.Control placeholder="Value not entered" value={addline1} />
  </Form.Group>
    </div>
  <div style={{display:"flex", justifyContent: 'space-between', width:"100%", marginBottom:"10px"}}>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Secondary Address Line1</Form.Label>
    <Form.Control placeholder="Value not entered" value={addline1} />
  </Form.Group>
    <Form.Group controlId="formGridAddress2">
    <Form.Label>Secondary Address Line2</Form.Label>
    <Form.Control placeholder="Value not entered" value={addline1} />
  </Form.Group>
    </div>


  <div style={{display:"flex", justifyContent: 'space-between', width:"100%", marginBottom:"10px"}}>
    <Form.Group  controlId="formGridCity">
      <Form.Label>BMI</Form.Label>
      <Form.Control value={bmi} />
    </Form.Group>

  <Form.Group  controlId="formGridCity">
      <Form.Label>Recommended Calories</Form.Label>
      <Form.Control value={cal} />
    </Form.Group>
    </div>


  
  <Button style={{backgroundColor: "#8BC441", border:"none"}} type="submit">
    Submit
  </Button>
</Form>
        </div>
    )
}

export default Forms
