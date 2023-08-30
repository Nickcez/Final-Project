import { Route, BrowserRouter, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Navbar from './Navbar';
import Homepage from './Homepage';
import ChoresPage from './ChoresPage';
import ChoreDetails from './ChoreDetails';
import List from './List';
import Login from './Login';
// import CheckoutForm from './CheckoutForm';
// import Confirmation from './Confirmation';
import Error from './Error';
import Footer from './Footer';

// All the routes
const App = () => {
  return (
    <BrowserRouter>
    <GlobalStyles />
    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chores" element={<ChoresPage />} />
      <Route path="/chores/:chore" element={<ChoreDetails />} />
      <Route path="/list" element={<List />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/checkOut" element={<CheckoutForm />} />
      <Route path="/order/:orderId" element={<Confirmation />} /> */}
      <Route path="/error" element={<Error />} />
    </Routes>
    <Footer />
  </BrowserRouter>
    )
}

export default App;