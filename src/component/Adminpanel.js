import React, { useEffect, useState } from "react";
import firebase from "../config/FirebaseCon";
import "./style.css";
import Pagination from "./Pagination";
import Posts from "./Posts";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Logoutadmin from "./Logoutadmin";

const Adminpanel = (props) => {
  const db = firebase.database();
  let [allData, setAlldata] = useState([]);
  const [activeadmin, setActiveadmin] = useState("");

  // for search
  const [search, setSearch] = useState("");

  const [selectData, setSelectdata] = useState("all");

  useEffect(() => {
    let activeid = localStorage.getItem("userId");
    setActiveadmin(activeid);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.history.push("/adminpanel");
      } else {
        props.history.push("/");
      }
    });
    getAllData();
    // getActiveName();
  }, []);


  
  // const getActiveName = ()=> {
  //   let userId = firebase.auth().currentUser.uid
  //   //console.log(userId);
  //   // console.log(firebase.auth().currentUser.name);
  //   db.ref("admin/"+userId).on("value",function(dt){
  //     console.log(dt.name)
  //   })
  // }


  const getAllData = () => {
    db.ref("student").on("value", (data) => {
      const arr = [];
      const dt = data.val();
      for (let id in dt) {
        arr.push({ id, ...dt[id] });
      }
      setAlldata(arr);
    });
  };

  const handleSelect = (e) => {
    setSelectdata(e.target.value);
    if (e.target.value == "my") {
      let userId = firebase.auth().currentUser.uid
      var arr = allData.filter((d) => {
        return d.activeadmin === userId;
      });
      setAlldata([...arr]);
    } else {
      getAllData();
    }
  };

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allData.slice(indexOfFirstPost, indexOfLastPost); //5 sey 10 tak ka data

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(currentPage);

  // add

  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [age, setAge] = useState("");
  const [sclass, setClass] = useState("");
  const [address, setAddress] = useState("");

  const submit = () => {
    let dateobj = new Date();
    let admissionDate = dateobj.toLocaleDateString();
    let admissionTime = dateobj.toLocaleTimeString();

    if (
      name != "" &&
      fname != "" &&
      age != "" &&
      sclass != "" &&
      address != ""
    ) {
      let obj = {
        name,
        fname,
        age,
        sclass,
        address,
        activeadmin,
        admissionDate,
        admissionTime,
      };
      db.ref("student/")
        .push(obj)
        .then(() => {
          setName("");
          setFname("");
          setAge("");
          setClass("");
          setAddress("");
        });
      handleClose();
    } else {
      alert("Must fill all fields!");
    }
  };

  const del = (id) => {
    db.ref("student").child(id).remove();
    if (currentPosts.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (search.length > 0) {
    allData = allData.filter((d) => {
      if (d.name.match(search)) {
        return d.name.match(search);
      } else if (d.fname.match(search)) {
        return d.fname.match(search);
      } else if (d.age.match(search)) {
        return d.age.match(search);
      } else if (d.sclass.match(search)) {
        return d.sclass.match(search);
      } else if (d.address.match(search)) {
        return d.address.match(search);
      }
    });
    // console.log(allData);
  }

  // modal work

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
console.log(allData)
  return (
    <div>
      <Logoutadmin />
      {/* <h1>Admin Panel</h1>
        <button onClick={logout}>Logout</button> */}

      {/* modal start */}

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="signupform">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                  placeholder="Enter Father Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  placeholder="Enter Age"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setClass(e.target.value)}
                  value={sclass}
                  placeholder="Enter Class"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  placeholder="Enter Address"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* modal end */}

      <div className="showData">
        <div className="container">
          <table className="table text-center">
            <tr>
              <td colSpan="4" align="left">
                <Button variant="success" onClick={handleShow}>
                  <i className="fa fa-plus" aria-hidden="true"></i> Add New
                  Student
                </Button>
              </td>
              <td className="pt-3">
                <select onChange={handleSelect} className="form-control">
                  <option value="all">All Forms</option>
                  <option value="my">My Forms</option>
                </select>
              </td>
              <td colSpan="4">
                <input
                  type="text"
                  class="form-control col-8 ml-auto"
                  placeholder="Search...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </td>
            </tr>
            <tr className="thead-light">
              <th>Name</th>
              <th>Father Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>Address</th>
              <th>Admission Date</th>
              <th>Admission Time</th>
              <th colSpan="2">Action</th>
            </tr>
            <Posts
              posts={search.length > 0 ? allData : currentPosts}
              show={selectData}
              del={del}
            />
            <tr>
              <td colSpan="4">
                {allData.length >= 5 ? (
                  <Pagination
                    search={search.length > 0 ? true : false}
                    postsPerPage={postsPerPage}
                    totalPosts={allData.length}
                    paginate={paginate}
                    cpage={currentPage}
                  />
                ) : (
                  ""
                )}
              </td>
              <td colSpan="5" align="right">
                {search.length > 0 || allData.length === 0 ? (
                  ""
                ) : (
                  <>
                    <i className="fa fa-eye"></i> Showing {indexOfFirstPost + 1}{" "}
                    to{" "}
                    {indexOfLastPost > allData.length
                      ? allData.length
                      : indexOfLastPost}{" "}
                    of {allData.length} Entries
                  </>
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminpanel;
