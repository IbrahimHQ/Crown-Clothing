import { Routes, Route } from 'react-router-dom';
import HomeDirectory from './components/home-directory/home-directory.component';
import NavBar from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { onAuthStateChangedListener, createUserDocfromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from './store/user/user.actions';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect (() => { //globally provides user state changes
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocfromAuth(user);
        }
        dispatch(setCurrentUser(user))
    });
    return unsubscribe
  }, [dispatch]); //runs once when component mounts b/c dispatch never changes


  return (
    <Routes>
      <Route path='/*' element={<NavBar />}>
        <Route index element={<HomeDirectory />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  ); 
};

export default App;