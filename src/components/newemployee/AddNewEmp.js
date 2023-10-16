import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import "./addnewemp.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewEmp = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setEmpDetails({
      ...empDetails,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "https://localhost:7294/Dashboard/post_Employee_Details",
        { m_employee: empDetails },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response, e.g., show a success message or redirect
      console.log("Response:", response.data);

      // Show a success toast message
      toast.success("Employee details saved successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // Reset the form
      setEmpDetails({
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
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error("Error:", error);
    }
  };

  return (
    <div className="newemployee-overlay">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="newemployee-content">
        <h2 className="text-success">Enter Employee Details : </h2>
        <div className="newstudent-main-container">
          <div className="newstudent-container mt-5">
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
                <label className="fw-bold fs-6">Email</label>
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
                  type="date"
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
                  type="date"
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
        <div className="buttons d-flex justify-content-between mt-3">
          <button className="btn btn-danger" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
          <button className="btn btn-success" onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewEmp;
