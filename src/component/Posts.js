import React , { useState } from 'react';
import firebase from '../config/FirebaseCon';
import './style.css';

const Posts = ({ posts , del}) => {
    
    const db = firebase.database();

    // update 

    const [update,setUpdate] = useState("")

    const [ename,seteName] = useState("")
    const [efname,seteFname] = useState("")
    const [eage,seteAge] = useState("")
    const [esclass,seteClass] = useState("")
    const [eaddress,seteAddress] = useState("")
    const [activeadmin,setActiveadmin] = useState("")
    const [admissionDate,setadate] = useState("")
    const [admissionTime,setatime] = useState("")



    const upd = (dt,i) => {
        setUpdate([dt.id,i])
        seteName(dt.name)
        seteFname(dt.fname)
        seteAge(dt.age)
        seteClass(dt.sclass)
        seteAddress(dt.address)
        setActiveadmin(dt.activeadmin)
        setadate(dt.admissionDate)
        setatime(dt.admissionTime)
    }



    const updatefunc = () => {
        db.ref("student/"+update[0]).set({
            name : ename,
            fname : efname,
            age : eage,
            sclass : esclass,
            address : eaddress,
            activeadmin,
            admissionDate,
            admissionTime

        })
          setUpdate("")
          seteName("")
          seteFname("")
          seteAge("")
          seteClass("")
          seteAddress("")
          setActiveadmin("")
          setadate("")
          setatime("")
      }



  return (
    posts.map((d, i) => {
          return (
            <tr>
             {(update[1] === i)?
              <>
              <td className="edittd"><input type="text" className="form-control" value={ename} onChange={(e)=>seteName(e.target.value)}/></td>
              <td className="edittd"><input type="text" className="form-control" value={efname} onChange={(e)=>seteFname(e.target.value)}/></td>
              <td className="edittd"><input type="text" className="form-control" value={eage} onChange={(e)=>seteAge(e.target.value)}/></td>
              <td className="edittd"><input type="text" className="form-control" value={esclass} onChange={(e)=>seteClass(e.target.value)}/></td>
              <td className="edittd"><input type="text" className="form-control" value={eaddress} onChange={(e)=>seteAddress(e.target.value)}/></td>
             </>
             :
             <>
              <td>{d.name}</td>
              <td>{d.fname}</td>
              <td>{d.age}</td>
              <td>{d.sclass}</td>
              <td>{d.address}</td>
              <td>{d.admissionDate}</td>
              <td>{d.admissionTime}</td>
              </>
             }
              <td>
                <button
                  className="btn btn-sm btn-danger mr-3"
                  onClick={() => del(d.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              {(update[1] === i)?
                <button
                  className="btn btn-sm btn-warning"
                  onClick={updatefunc}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                :
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => upd(d,i)}
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              }
              </td>
            </tr>
          );
        })
  );
};

export default Posts;








