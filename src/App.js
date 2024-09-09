import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Survey from './components/Survey';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Graphs from './components/Graphs';
import Header from './components/Header';
import Temp from './components/Temp';
import SignUp from './components/SignUp';
import Login from './components/Login'
import { Authprovider } from './utils/auth';
import ThankYou from './components/ThankYou';
import { RequireAuth } from './utils/RequireAuth';
import Flash from './components/Flash';
import ScrollToTop from './components/ScrollToTop';
import HRDashboard from './components/HRDashboard';
import Toolkit from './components/Toolkit';
import HRPanel from './components/HRPanel'

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Authprovider>
        <Flash />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/takeSurvey' element={<RequireAuth><Survey /></RequireAuth>} />
          <Route path='/takeSurvey/graphs' element={<RequireAuth><Graphs /></RequireAuth>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/onboarding' element={<RequireAuth><ThankYou /></RequireAuth>} />
          <Route path='/hrdashboard' element={<RequireAuth><HRPanel /></RequireAuth>} />
          <Route path='/toolkit' element={<Toolkit />} />
         
        </Routes>
        </Authprovider>
      </Router>
    </div>
  );
}

export default App;
