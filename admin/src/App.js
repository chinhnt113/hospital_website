import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminScheduleList from './AdminScheduleList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AdminLogin />} />
        <Route path="/admin/schedule" element={<AdminScheduleList />} />
      </Routes>
    </Router>
  );
};

export default App;