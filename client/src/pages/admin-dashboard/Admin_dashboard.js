import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Button, Card, Modal, Form, FormControl, Badge, Dropdown } from "react-bootstrap";
import { FaDownload, FaGlobe, FaList, FaSearch } from "react-icons/fa";
import Footer from "../../Components/Footer.jsx";
import StatsCard from "../../Components/StatsCard.jsx";
import "./Admin_dashboard.css";
import { Link } from "react-router-dom";
import ShowList from "../../Components/ShowList.jsx";
import Loader from "../../Components/Loader.jsx";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Base from "../../base.js";
import AdminHeader from "../../Components/AdminHeader.jsx";


export default function Admin_dashboard() {
  const [dataByName, setDataByName] = useState([]);
  const [dataByDate, setDataByDate] = useState([]);
  const [dataByCTC, setDataByCTC] = useState([]);
  //for opening/closing automated mail form  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [sort, setSort]=useState("Date");
  console.log(sort);

  //for opening/closing automated mail form  
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [hrname, sethrName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [internTimePeriod, setInternTimePeriod] = useState("");
  const [internView, setInternView] = useState(false);
  const handleSubmit = async () => {
    console.log("adsdkf");
    const testAccount = {
      user: "indulge1239@gmail.com",
      pass: "Indulge@12#",
    };
    const email_data = {
      user: testAccount.user,
      pass: testAccount.pass,
      company_name: companyName,
      email_id: email,
      invitation_type: internView === false ? "JNF" : "INF",
    };
    const response = await axios.post(
      `${Base()}/email/send_invite`,
      email_data
    );
    localStorage.setItem('company_user_id', response.data.user_id)

    console.log(response.data);
    const user_data = {
      user_id: response.data.user_id,
      password: response.data.password,
      company_name: companyName,
      // hr_name: hrname,
      email_id: email,
      username:response.data.user_id
    };
    const result = await axios.post(
      `${Base()}/user/save`,
      user_data
    );
    console.log(result);
    handleClose();
  };

  const handleSubmit2 = async (e) => {
    console.log(e.target)
    // const result = await axios.post(`${Base()}/graduation_year/save`,);
    console.log("handled submission")
    handleClose2();
  }
  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      const result = await axios.post(`${Base()}/form/getAll`, {}, { headers });
      console.log(result.data)
      setDataByCTC(result.data.resultCTC);
      setDataByDate(result.data.resultDate);
      setDataByName(result.data.resultName);
    };

    fetchData();
  }, []);
  // const total=data.length;
  // console.log(total);
  var maxStipend = 0, inf = 0, jnf = 0;
  // data.forEach((data) => {
  //   if (data.stipend_detail > maxStipend) {
  //     maxStipend = data.stipend_detail
  //   }
  //   if (data.type === "INF") {
  //     inf++;
  //   }
  //   else { jnf++; }
  // })
  const statsData = { inf: inf, jnf: jnf, maxStipend: maxStipend }


  const [showJNFINF, setShowJNFINF] = useState("JNF");


  return (
    <Suspense fallback={<Loader />}>
      <AdminHeader />
      {/* modal for automated email */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Automated Invitation Form</Modal.Title>
        </Modal.Header>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setCompanyName(() => e.target.value)}
          />
          <label for="floatingInput">Name of Company</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setEmail(() => e.target.value)}
          />
          <label for="floatingInput">Email Adress</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => sethrName(() => e.target.value)}
          />
          <label for="floatingInput">Name of HR</label>
        </div>
        <select
          onChange={(e) => setInternView(() => e.target.value)}
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>for INF or JNF</option>
          <option value="1">For Internship</option>
          <option value="2">For Jobs</option>
        </select>
        {/* {internView === "1" ? (
          <select
            onChange={(e) => setInternTimePeriod(() => e.target.value)}
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Select Duration</option>
            <option value="1">2 months</option>
            <option value="2">6 months</option>
          </select>
        ) : (
          <></>
        )} */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send Invitation
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for setting graduation year */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Set Graduation Year</Modal.Title>
        </Modal.Header>
        <select
          class="form-select"
          aria-label="Default select example"
        // onChange={(e) => setGraduationYearForJobs(() => e.target.value)}
        >
          <option selected>For Jobs</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select
          class="form-select"
          aria-label="Default select example"
        // onChange={(e) => setGraduationYearForJobs(() => e.target.value)}
        >
          <option selected>For Dual Degree/ Integrated M. Tech courses only</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select
          class="form-select"
          aria-label="Default select example"
        // onChange={(e) => setGraduationYearForJobs(() => e.target.value)}
        >
          <option selected>For Pre-final year students of ALL courses</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select
          class="form-select"
          aria-label="Default select example"
        // onChange={(e) => setGraduationYearForJobs(() => e.target.value)}
        >
          <option selected>For M. Tech/ MBA – Business Analytics courses only</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit2}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="row">
        <div className="col">
          {/* <!-- hero section  --> */}
          <div className="px-4 pt-5 my-5 text-center">
            <h1 className="display-4 fw-bold">Career Development Center</h1>
            <h3 className="display-10 text-muted mb-4">CDC, IIT ISM Dhanbad</h3>
            <div className="mx-auto">
              <p className="lead mb-4">
                Welcome to the recruitment website for IIT(ISM) Dhanbad.
                <br />
                IIT(ISM) Dhanbad is one of the leading institutes in the country, with its graduates all across the world.Our students are encouraged to strive for excellence by nurturing their abilities and talent through hardwork and providing them the right tools and expertise in the due course of their degree.
                <br />
                To give our students an opportunity to work with your esteemed organization, please continue.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-2">
                <button
                  type="button"
                  onClick={handleShow2}
                  className="btn btn-lg px-4 me-sm-3 bg-light border d-flex align-items-center"
                >
                  Set Graduation Year &nbsp;
                  <svg
                    style={{ height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z" />
                  </svg>
                </button>
              </div>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <button
                  type="button"
                  onClick={handleShow}
                  className="btn btn-lg px-4 me-sm-3 bg-light border d-flex align-items-center"
                >
                  Send Invitation &nbsp;
                  <svg
                    style={{ height: "20px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          {/* <!-- image section  --> */}
          <div className="overflow-hidden my-5 rounded">
            <div
              className="container my-5 px-5"
              style={{ width: "700px", height: "550px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
                className="img-fluid border rounded-3 shadow-lg mb-4"
                alt="Example image"
                width="700"
                height="550px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <StatsCard statsData={statsData} />
      <hr />
      {/* <ListingSection /> */}

      <div className="responseContainer m-3 p-4">
        <div className="SearchBarContainer mx-5">
          <div className="searchBar ">
            <Form className="d-flex">
              <Button variant="outline-primary searchBarButton" id='btn1'><FaSearch />
              </Button>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 searchform"
                aria-label="Search"
              />

            </Form>
          </div>
          <Button
            onClick={() => {
              document.getElementById("btn2").style.backgroundColor = "#0257d8";
              document.getElementById("btn2").style.color = "white";
              document.getElementById("btn3").style.backgroundColor = "white";
              document.getElementById("btn3").style.color = "#0257d8";
              setShowJNFINF("INF")
            }} variant="outline-primary searchBarButton" id='btn2'>
            INF
          </Button>
          <Button
            style={{ color: "white", backgroundColor: "#0257d8" }}
            onClick={() => {
              document.getElementById("btn3").style.backgroundColor = "#0257d8";
              document.getElementById("btn3").style.color = "white";
              document.getElementById("btn2").style.backgroundColor = "white ";
              document.getElementById("btn2").style.color = "#0257d8";
              setShowJNFINF("JNF")
            }}
            variant="outline-primary searchBarButton" id='btn3'>
            JNF
          </Button>
          <Button
            className="border m-2 mx-3"
            onClick={()=>{setSort("Name")}}
            variant="outline-primary searchBarButton" id='btn4'>
            Sort By Name
          </Button>
          <Button
            className="border m-2 mx-3"
            onClick={()=>{setSort("Date")}}
            variant="outline-primary searchBarButton" id='btn5'>
            Sort By Date
          </Button>
          <Button
            className="border m-2 mx-3"
            onClick={()=>{setSort("CTC")}}
            variant="outline-primary searchBarButton" id='btn6'>
            Sort By CTC
          </Button>

        </div>
         {sort==="Date" ?  (dataByDate).map((data) => {
          return (
            (showJNFINF === data.type) ? <ShowList key={data._id} show={"JNF"} {...data} /> : <></>
          )
        }) : 
        
        sort==="Name" ? 
        (dataByName).map((data) => {
          return (
            (showJNFINF === data.type) ? <ShowList key={data._id} show={"JNF"} {...data} /> : <></>
          )
          }) :
          (dataByCTC).map((data)=>{
            return (
            (showJNFINF === data.type) ? <ShowList key={data._id} show={"JNF"} {...data} /> : <></>
            )
          })
          }        
      </div>
      <Footer />
    </Suspense>
  );
}
