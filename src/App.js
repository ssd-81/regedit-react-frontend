import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import './Register.css';
import './UserList.css';



function App() {
  return (
    <Router>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

function RegistrationForm() {
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      id: document.getElementById('userId').value,
      name: document.getElementById('userName').value,
      email: document.getElementById('email').value,
      phoneNum: document.getElementById('phoneNum').value,
    };

    axios.post('http://user-registration.eu-north-1.elasticbeanstalk.com/users', payload)
      .then(() => navigate('/users')) // Redirects instantly to the list
      .catch(err => console.log(err));
  };

  return (
  <div className="register-card">
    <h2 className="register-title">Register</h2>

    <form onSubmit={onSubmitHandler}>
      {[
        { id: 'userId', label: 'User ID' },
        { id: 'userName', label: 'Username' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNum', label: 'Phone' },
      ].map(({ id, label }) => (
        <div className="field" key={id}>
          <label htmlFor={id}>{label}</label>
          <input id={id} type="text" required />
        </div>
      ))}

      <button type="submit">Create account</button>
    </form>
  </div>
);

}

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://user-registration.eu-north-1.elasticbeanstalk.com/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="userlist-container">
      <h2 className="userlist-title">Registered Users</h2>

      <div className="userlist-table">
        <div className="userlist-header">
          <div>Name</div>
          <div>Email</div>
        </div>

        {users.map(user => (
          <div className="userlist-row" key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ))}
      </div>
      <BackHomeButton />
    </div>
  );
}

function BackHomeButton() {
  const navigate = useNavigate();

  return (
    <button
      className="nav-button"
      onClick={() => navigate("/")}
    >
      ← Back to Registration
    </button>
  );
}

export default App;