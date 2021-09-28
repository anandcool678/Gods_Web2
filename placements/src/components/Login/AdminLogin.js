import React, { useState } from 'react'
import '../Login/Login.css'
import logo from '../../assets/Logo.png';
import Register from '../Register/Register';
import { Redirect } from 'react-router-dom';



const Form = () => {

  const [Email , setEmail] = useState("");
  const [Password , setPassword] = useState("");
  const [role , setRole] = useState("");
  const [logindata , setLoginData] = useState([]);

  const [FirstName , setFirstName] = useState("");
  const [LastName , setLastName] = useState("");
  const [Year , setYear] = useState("");
  const [Branch , setBranch] = useState("");
  const [RegistrationID , setRegistrationID] = useState(0);
  const [ConfirmPassword , setConfirmPassword] = useState("");
  const [Registerdata , setRegisterdata] = useState([]);
  const [IsRegister , setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const handleClick = () => {
    setErrorMessage("Example error message!")
  }


  const clickLogin = (e) => {
    //e.preventDefault();
    console.log({role : role, email:Email , password: Password });
    async function postData(url, data) {
      const response = await fetch(url, {
              method:"POST",
              body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((Response) =>Response.json())
        .then((Result) =>{
          if(Result.Status == 'success'){
            console.log(Result);
            <Redirect to="/dashboard"></Redirect>
          }
          else{
            alert('Invalid Credentials')
          }
        })
    //postData('http://localhost:3000/api/v1/auth/login',{role : role, email:Email , password: Password });
    
  }}

  function handleChange(event){
    setRole(event.target.value)
  }

  const submitForm = (e) => {


      
    // e.preventDefault();
    if(validate())
    {
      setIsRegister(false);
    }
    else{
      handleClick()
      {errorMessage && <div className="error"> {errorMessage} </div>}

    }
    const entry = { fname:FirstName,lname:LastName,year:Year,branch:Branch,email:Email
                  ,regid:RegistrationID, password: Password }
    setRegisterdata([entry]);
    console.log(Registerdata);
    
    fetch('http://localhost:3000/api/v1/auth/register',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(entry)
    }).then((Response) => Response.json())
      .then((Result) =>{
        if(Result.Status == 'success'){
          console.log(Result);
          <Redirect to="/"></Redirect>
        }
        else{
          alert('Sijdio')
        }
      })

}

function handleChangeYear(event){
  setYear(event.target.value)
}
function handleChangeBranch(event){
  setBranch(event.target.value)
}

function validate(){
  
  
  let isValid = true;
  debugger;

  if (!FirstName) {
    isValid = false;
    setErrorMessage["FirstName"] = "Please enter your name.";
  }

  if (!Email) {
    isValid = false;
    setErrorMessage["Email"] = "Please enter your email Address.";
  }

  if (typeof Email !== "undefined") {
      
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(Email)) {
      isValid = false;
      setErrorMessage["Email"] = "Please enter valid email address.";
    }
  }

  if (!Password) {
    isValid = false;
    setErrorMessage["Password"] = "Please enter your password.";
  }

  if (!ConfirmPassword) {
    isValid = false;
    setErrorMessage["ConfirmPassword"] = "Please enter your confirm password.";
  }

  if (typeof Password !== "undefined" && typeof ConfirmPassword !== "undefined") {
      
    if (Password != ConfirmPassword) {
      isValid = false;
      setErrorMessage["Password"] = "Passwords don't match.";
    }
  } 

 

  return isValid;
}

  

    
  
  
    
  // async function postData(url = 'http://localhost:3000/api/v1/auth/login', data = {logindata}) {
    
  //   const response = await fetch(url, {
  //           body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }
  
  // postData('https://localhost:3000/api/v1/auth/login', { answer: 42 })
  //   .then(data => {
  //     console.log(data); 
  //   });

    
  
  return(
    <div>
      {
          !IsRegister?
         <div id="loginform" >
            <img src={logo} alt="logo" className="image"/>
            <form action="POST" onSubmit = {clickLogin}>
            <div class="row"> 
                  <label htmlFor="role">Role</label>
                  
                  <select id="cars" name="cars" placeholder="Enter Role" onChange={handleChange} >
                      <option value="">Select</option>
                      <option value="Admin" >Admin</option>
                      <option value="Student">Student</option>
                  </select>
            </div> 
            <div class="row">
              <label htmlFor="email">Email ID</label>
              <input type="text" placeholder="Enter your email" value={Email} 
                onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
            <div class="row">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter your password" value={Password}
                onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div className="button-option">
              <div id="button" class="row">
                <button type="submit" onClick={clickLogin}>Log in</button>
              </div>
              <div id="button" class="row">
                <button type="button" onClick={()=>setIsRegister(true)}>Register</button>
              </div>
            </div>
          </form>
          </div>  

          :
        
        
      
        <div className="Backbody">
        <div class="rgform">
          <div class="title">Registration</div>
          <form action="POST" onSubmit = {submitForm}>
          
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input type="text" placeholder="Enter First Name" required 
                 value={FirstName} 
                 onChange={(e)=> setFirstName(e.target.value)}/>
                 

              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input type="text" placeholder="Enter Last Name" 
                 value={LastName} 
                 onChange={(e)=> setLastName(e.target.value)}/>
              </div>
              <div className="input-box"> 
                  <label htmlFor="Year" className="Details">Year</label>
                  
                  <select id="year" name="year" onChange={handleChangeYear} required>
                      <option value="">Select Graduation Year</option>
                      <option value="3rd year" >Third Year</option>
                      <option value="4th year">Fourth Year</option>
                  </select>
              </div> 
              <div className="input-box"> 
                  <label htmlFor="Branch" className="Details">Branch</label>
                  
                  <select id="branch" name="branch" onChange={handleChangeBranch} required>
                      <option value="">Select Branch</option>
                      <option value="COMP" >Computer Engineering</option>
                      <option value="IT">Information Technology</option>
                      <option value="ENTC" >Electronics and Telecommunication</option>
                      <option value="MECH">Mechnical</option>
                      <option value="ME">ME</option>
                  </select>
              </div> 
              <div className="input-box">
                <span className="details">Email Id</span>
                <input type="text" placeholder="Enter EmailId" required 
                 value={Email} 
                 onChange={(e)=> setEmail(e.target.value)}/>
                 
              </div>
              <div className="input-box">
                <span className="details">RegistrationID</span>
                <input type="text" placeholder="Enter RegistrationID" required 
                 value={RegistrationID} 
                 onChange={(e)=> setRegistrationID(e.target.value)}/>
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="password" placeholder="Enter Password" required 
                 value={Password} 
                 onChange={(e)=> setPassword(e.target.value)}/>
                 {/* {errorMessage && <div className="error"> {errorMessage} </div>} */}
                 
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input type="password" placeholder="Confirm Password" required 
                 value={ConfirmPassword} 
                 onChange={(e)=> setConfirmPassword(e.target.value)}/>
                 {/* {errorMessage && <div className="error"> {errorMessage} </div>} */}
              </div>
              
  
            </div>
  
            <div className="Button">
                <button type="submit" onClick={submitForm}>Register</button>
                
            </div>
            <div className="Button">
                <button type="button" onClick={()=>setIsRegister(false)}>Login</button>
            </div>
            </form>
  
          
  
  
          
  
        </div>
        </div>
        }
    </div>
  
  
          
  
  
          
              
  
              
              
            
      
  )
  
}




export default Form; 


