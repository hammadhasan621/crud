import React,{useState} from 'react';
import firebase from '../config/FirebaseCon';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

const Login = (props) => {
    const db = firebase.database();
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")

    const [emailerr,setEmailerr] = useState("")
    const [passerr,setPasserr] = useState("")

    const submit = () => {


      if(email === ""){
        setEmailerr("The field is required!")
      }
      else{
        setEmailerr("")
      }

      if(pass === ""){
        setPasserr("The field is required!")
      }
      else{
        setPasserr("")
      }

        if(emailerr === "" && passerr === ""){
            firebase.auth().signInWithEmailAndPassword(email, pass)
              .then((user) => {
                localStorage.setItem("userId",user.user.uid)
                  props.history.push('/adminpanel')
              })
              .catch((error) => {
                if(error.code == "auth/user-not-found"){
                  alert("User is not exist!")
                }
              });
        }
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 mx-auto mt-5 border p-4 shadow">
              <Form>
                <h1 className="mb-4 text-center">Login page</h1>
                <Form.Group controlId="formBasicEmail">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter email"
                  />
                <span className="err">{emailerr}</span>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
        
                  <Form.Control
                    type="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    placeholder="Password"
                  />
                  <span className="err">{passerr}</span>
                </Form.Group>
                <Button variant="primary" className="btn-block" type="button" onClick={submit}>
                  Submit
                </Button>
                <br />
                <a onClick={() => props.history.push("/signup")} className="pull-right">
                  Don't have An Account ?
                </a>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;




