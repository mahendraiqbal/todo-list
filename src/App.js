import './App.css';

import {
  // BrowserRouter as Router,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'; //Navigate

import Dashboard from './pages/dashboard';
import Activity from './pages/activity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route
          exact path="/detail/:id" element={<Activity />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
