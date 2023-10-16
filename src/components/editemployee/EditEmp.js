import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const EditEmp = () => {
  const { employeeId } = useParams();
  const [empDetails, setEmpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    jobTitle: "",
    salary: "",
    employeeId: "",
    gender: "",
    hireDate: "",
  });

  useEffect(() => {
    fetchEmpDetails();
  }, [employeeId]);

  const fetchEmpDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7294/Dashboard/get_Employee_Detail?Id=${employeeId}`
      );
      const empData = response.data.m_employee;
      setEmpDetails(empData);
    } catch (error) {
      console.error("Error fetching emp details:", error);
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEmpDetails({
      ...empDetails,
      [name]: value,
    });
  };

  const updateEmpDetails = async () => {
    try {
      const payload = {
        m_employee: {
          ...empDetails, // Use spread operator to include the updated studentDetails
        },
      };

      const response = await axios.put(
        `https://localhost:7294/Dashboard/put_Employee_Details?Id=${employeeId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
      // Handle successful update, show a success message, etc.
      toast.success('Successfully Saved Employee details', {
        position: 'top-center',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    } catch (error) {
      console.error('Error updating student details:', error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <div className="card-body" style={{ padding: "50px" }}>
        <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-success">Edit Employee Details : </h2>

      <div className="mt-5">
        <div className="">
        <div className="row mb-3">
              <div className="col-md-3">
                <label className="fw-bold fs-6">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={empDetails.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-3">
                <label className="fw-bold fs-6 required">Last Name</label>
                <input
                  type="text"
                  className="form-control "
                  name="lastName"
                  value={empDetails.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-3">
              <label className="fw-bold fs-6">E-Mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={empDetails.email}
                onChange={handleInputChange}
              />
            </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={empDetails.department}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6">Date Of Birth</label>
                <input
                  type="text"
                  className="form-control"
                  name="dateOfBirth"
                  value={empDetails.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6 required">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={empDetails.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6 required">JobTitle</label>
                <input
                  type="text"
                  className="form-control "
                  name="jobTitle"
                  value={empDetails.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6 required">Salary</label>
                <input
                  type="text"
                  className="form-control "
                  name="salary"
                  value={empDetails.salary}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <label className="fw-bold fs-6">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeId"
                  value={empDetails.employeeId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(+91) 1234567892"
                  name="phoneNumber"
                  value={empDetails.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-3">
                <label className="fw-bold fs-6">Hire Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="hireDate"
                  value={empDetails.hireDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="fw-bold fs-6">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  value={empDetails.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
        </div>
      </div>
      <div className="buttons d-flex justify-content-between mt-5">
        <button className="btn btn-danger">
          <FontAwesomeIcon icon={faTimes} /> Cancel
        </button>
        <button className="btn btn-success" onClick={updateEmpDetails}>
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </div>
    </div>
  );
};

export default EditEmp;
