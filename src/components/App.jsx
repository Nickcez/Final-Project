import { Route, BrowserRouter, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Navbar from './Navbar';

import ChoresPage from './ChoresPage';
import ChoreDetails from './ChoreDetails';
import List from './List';
import Login from './Login';
import CheckoutForm from './CheckoutForm';
import Confirmation from './Confirmation';
import Error from './Error';
import Footer from './Footer';
import Homepage from './Homepage';
import LandingPage from './LandingPage';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';

// All the routes
const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
    <GlobalStyles />
    {isAuthenticated && (
      <Navbar />
    )}
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {isAuthenticated && (
        <>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/chores" element={<ChoresPage />} />
        <Route path="/chores/:choreId" element={<ChoreDetails />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckoutForm />} /> 
        {/* <Route path="/registered" element={<RegisteredForm />} /> */}
        <Route path="/order/:missionId" element={<Confirmation />} />
        <Route path="/error" element={<Error />} />
        </>
      )}
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default App;