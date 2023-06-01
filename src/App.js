import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import AOS from 'aos';
import { ScrollingProvider } from 'react-scroll-section'
import 'aos/dist/aos.css';
import './App.css';

import Header from './header';
import Footer from './footer';
import BSC from './bsc';
import TRANSPARENCY from './transparency';
// import LandingPage from './landing';
AOS.init({ duration: 2000 });

const Layout = ({children}) => {
  return <>
  <Header/>
  {children}
  <Footer/>
  </>
}

function App() {

  return (
    <ScrollingProvider>
      <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<BSC/>} />
          <Route path='/transparency' element={<TRANSPARENCY/>} />
        </Routes>
      </Router>
      </Layout>
    </ScrollingProvider>
  );
}

export default App;
