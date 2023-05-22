import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import AOS from 'aos';
import { ScrollingProvider } from 'react-scroll-section'
import 'aos/dist/aos.css';
import './App.css';

import BSC from './bsc';
// import LandingPage from './landing';
AOS.init({ duration: 2000 });
function App() {

  return (
    <ScrollingProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BSC />} />
          {/* <Route path='/miner' element={<BSC />} /> */}
        </Routes>
      </Router>

    </ScrollingProvider>
  );
}

export default App;
