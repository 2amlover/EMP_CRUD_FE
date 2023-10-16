import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddNewEmp from "../newemployee/AddNewEmp";

function EmpList() {
  const [isNewEmpOpen, setIsNewEmpOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    fetchEmpList();
  }, []); 

  const fetchEmpList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7294/Dashboard/get_EmployeesList",
        {}
      );
  
      console.log("Response:", response.data);
  
      const empData = response.data.ml_employees;
      setEmpList(empData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteEmp = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://localhost:7294/Dashboard/delete_employee?Id=${id}`
      );
  
      console.log("Response:", response.data);
  
      if (response.data.success) {
        fetchEmpList();
       
      } else {
        console.error("Error deleting employee:", response.data.error);
      
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      
    } finally {
      setLoading(false);
    }
  };

  const openNewEmp = () => {
    setIsNewEmpOpen(true);
  };
  const closeNewEmp = () => {
    setIsNewEmpOpen(false);
  };


  return (
    <div className="container" style={{ padding: "20px" }}>
      <button
        type="button"
        className="btn btn-sm btn-info p-2"
        style={{ marginBottom: "20px" }}
        onClick={openNewEmp}
      >
        + Add Employee
      </button>
      <AddNewEmp isOpen={isNewEmpOpen} onClose={closeNewEmp} />

      <div className="card">
        <div className="card-body">
          {loading ? (
            <div
              className={`loading-message ${loading ? "visible" : "hidden"}`}
              data-kt-indicator="on"
            >
              <span className="indicator-progress text-primary ">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="min-w-50px">SL #</th>
                    <th className="min-w-120px">Employee Name</th>
                    <th className="min-w-120px">Email</th>
                    <th className="min-w-120px">Department</th>
                    <th className="min-w-120px">Date of Birth</th>
                    <th className="min-w-120px">Phone No</th>
                    <th className="min-w-100px">Actions</th>
                  </tr>
                </thead>

                <tbody className="data-container">
                  {empList.map((employee, index) => (
                    <tr key={index} >
                      <td className="min-w-50px"> {index + 1}</td>
                      <td className="min-w-150px">{employee.firstName}</td>
                      <td className="min-w-150px">{employee.email}</td>
                      <td className="min-w-120px">{employee.department}</td>
                      <td className="min-w-120px">{employee.dateOfBirth}</td>
                      <td className="min-w-120px">{employee.phoneNumber}</td>
                      <td className="min-w-120px">
                        <Link
                         className="btn btn-primary btn-sm me-3"
                         to={`/editemp/${employee.id}`}
                          style={{ width: "80px" }}
                        >
                         <FontAwesomeIcon icon={faEdit  } /> Edit
                        </Link>
                        <a
                          className="btn btn-danger btn-sm me-3"
                          style={{ width: "80px" }}
                          onClick={() => {
                            const employeeId = employee.id; // Get the student ID
                            handleDeleteEmp(employeeId); }}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpList;
