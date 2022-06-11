import logo from './logo.svg';
import './App.css';
import StripeContainer from './components/StripeContainer';
import { useState } from 'react';

function App() {
const [showItem, setShowItem]= useState (false) 

  return (
    <div className="App">
      <h1>Rabbit Market </h1>
      {showItem ? <StripeContainer></StripeContainer> : 
       <>
       <button onClick={()=> setShowItem(true)}> CheckOut</button>
       </>
    }
    </div>
  );
}

export default App;