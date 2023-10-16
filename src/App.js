import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmpList from './components/employeelist/EmpList';
import EditEmp from './components/editemployee/EditEmp';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EmpList />} />
          <Route path="/editemp/:employeeId" element={<EditEmp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
