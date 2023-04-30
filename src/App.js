import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LogOut from './Pages/LogOut';
import Profile from './Pages/Profile';
import Details from './Pages/Details';
import Edit from './Pages/Edit';
import CreateSell from './Pages/CreateSell';
import EditProfile from './Pages/EditProfile';
import Error404 from './Pages/Error404';
import Messages from './Pages/Messages'

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" exact element={<Categories/>} />
               <Route path="/categories/:category" exact element={<Categories/>} />
               <Route path="/categories/:category/:id/details" exact element={<Details/>} />
               <Route path="/categories/:category/:id/edit" exact element={<Edit/>} />
               <Route path="/auth/login" exact element={<Login/>} />
               <Route path="/auth/register" exact element={<Register/>} />
               <Route path="/auth/logout" render={<LogOut/>} />
               <Route path='/add-product' exact element={<CreateSell/>} />;
               <Route path='/profile/:id' exact element={<Profile/>} />;
               <Route path='/profile/:id/edit' exact element={<EditProfile/>} />;
               <Route path='/messages' exact element={<Messages/>} />;
               <Route path='/messages/:id' exact element={<Messages/>} />;
               <Route exact element={<Error404/>} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </>
   );
}

export default App;
