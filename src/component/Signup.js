import React, { useState } from 'react';
import firebase from '../config/FirebaseCon';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = (props) => {
    const db = firebase.database();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")

    const [nameerr,setNameerr] = useState("")
    const [emailerr,setEmailerr] = useState("")
    const [passerr,setPasserr] = useState("")
    

    const submit = (props) => {

      
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(name === ""){
          setNameerr("The field is required!")
        }
        else if(name.length < 3){
          setNameerr("Name must be greater than 3 letters")
        }
        else{
          setNameerr("")
        }

        if(email === ""){
          setEmailerr("The field is required!")
        }
        else if(!pattern.test(email)){
          setEmailerr("Invalid Email!")
        }
        else{
          setEmailerr("")
        }

        if(pass === ""){
          setPasserr("The field is required!")
        }
        else if(pass.length < 6){
          setPasserr("Password must be greater than 5 characters")
        }
        else{
          setPasserr("")
        }
      

        if(nameerr === "" && emailerr === "" && passerr === ""){
            let obj = {name,email,pass}
            firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((user) => {
                // console.log(user.user.uid,user); 
                obj.id = user.user.uid
                localStorage.setItem("userId",user.user.uid) 
                db.ref('admin/'+user.user.uid+"/").set(obj);  
                setName("")
                setEmail("")
                setPass("")
              })
              .catch((error)=>{
                  if(error.code == "auth/email-already-in-use"){
                    alert("Email already exist")
                  }                
              })
        }

    }

    return (
        <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 mx-auto mt-5 border p-4 shadow">
              <Form>
                <h1 className="mb-4 text-center">Sign up</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter name"
                  />
                  <span className="err">{nameerr}</span>
        
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter email"
                  />
                  <span className="err">{emailerr}</span>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="password"
                    onChange={(e)=>setPass(e.target.value)} value={pass} placeholder="Enter password"
                  />
                  <span className="err">{passerr}</span>
                </Form.Group>

                <Button variant="primary" className="btn-block" type="button" onClick={submit}>
                  Submit
                </Button>
                <br />
                <a onClick={()=>props.history.push('/')} className="pull-right">
                  Already have an account ?
                </a>
              </Form>
            </div>
          </div>
        </div>



        </div>
    );
};

export default Signup;