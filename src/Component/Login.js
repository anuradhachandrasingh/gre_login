import React , { useState ,useEffect} from 'react'
import '../images/allygrow_logo.png';
import axios from "axios";
import { loginValidate } from "./common/Validation";
const Login = () => {
    const [userData, setUserData] = useState({email:'',password :''});
    const [error, setError] = useState(false);

    const  handleInput = (evt)=> {
        const {name,value } = evt.target;
        setUserData(prevState => ({
          ...prevState,
          [name]: value
      })); 
    
    }  
    const submitData = (e) => {
        e.preventDefault();
        console.log("sending user data in server",userData)

        var validateData = loginValidate(userData)
        if(Object.keys(validateData).length === 0){
            setError(true)
            var userObj= {}
            userObj.email=userData.email
            userObj.password=userData.password
        
           axios
            .post("/v1/api/users/login",userObj)
              .then(function(response) {
                console.log("saved in db",response)
        
              }).catch(function(error) {
                if (error  && error.response && error.response.data && error.response.data.statusCode == 1003) {
                }else{
                  console.log("error from server",error);
              }
               
              })
           
          }else{
           setError(validateData)
          
          } 
      }
  return (
<>
    <div className='back'>
    <div className='card outline mx-auto my-5'>
    <img src={require('../images/allygrow_logo.png')} alt='#' className="img-fluid img1 p-4" style={{height:"100%",width:"100%"}}></img>
    <div className='outline mx-auto mt-5 card-body'>
    <form onSubmit={submitData}>
    <div className="form-outline">
    <input type="email" id="form2Example1" className="form-control mb-5 px-3" placeholder='Email address' name='email'  value={userData.email} onChange={handleInput}/>
    { error.email ? (
                <text style={{ color: "red" }}>
            {error.email}
                </text>
              ) : (
                ""
              )}
   </div>
  <div className="form-outline mb-5">
    <input type="password" id="form2Example2" className="form-control px-3" placeholder='Password' name='password' value={userData.password} onChange={handleInput}/>
    { error.password ? (
                <text style={{ color: "red" }}>
            {error.password}
                </text>
              ) : (
                ""
              )}
  </div>

  <div className="row ">
    <div className="col d-flex justify-content-center">
      
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label className="form-check-label text-secondary" for="form2Example31" > Remember me </label>
      </div>
    </div>

    <div className="col">
      
      <a href="#!">Forgot password?</a>
    </div>
  </div>
  <div className="mx-auto mid mt-3">
          <button type="submit" className="btn btn-primary" onSubmit={submitData}>
            Login
          </button>
        </div>
  <div className="text-center my-2">
    <p className="text-secondary">Not a member? <a href="#!">Register</a></p>
    </div>
</form>
</div>
</div>
</div>
    </>
  )
}

export default Login