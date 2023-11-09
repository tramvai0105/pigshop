import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import PigBox from './PigBox';
import PigFood from './PigFood';
import { Block } from './enums';
import PigMisc from './PigMisc';
import Opinions from './Opinios';
import Footer from './Footer';
import Order from './Order';
import HeaderM from './HeaderM';
import PigBoxM from './PigBoxM';
import PigFoodM from './PigFoodM';
import PigMiscM from './PigMiscM';
import OpinionsM from './OpinionsM';
import OrderM from './OrderM';
import { useEffect } from 'react';

function App() {

  const [mobile, setMobile] = useState(false);
  const [block, setBlock] = useState(Block.Pigbox);
  const [order, setOrder] = useState(false);

  useEffect(()=>{
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      setMobile(true);
    }
  },[])

  if(mobile){
    return (
      <div className="App relative w-full h-full flex flex-col">
        <HeaderM setOrder={setOrder} block={block} order={order}/>
        <OrderM show={order} setShow={setOrder}/>
        <PigBoxM setBlock={setBlock}/>
        <PigFoodM setBlock={setBlock}/>
        <PigMiscM setBlock={setBlock}/>
        <OpinionsM setBlock={setBlock}/>
        <div className='mt-24'></div>
        <Footer/>
      </div>
    );
  }
  else{
    return (
      <div className="App relative w-full h-full flex flex-col">
        <Header setOrder={setOrder} block={block} order={order}/>
        <Order show={order} setShow={setOrder}/>
        <PigBox setBlock={setBlock}/>
        <PigFood setBlock={setBlock}/>
        <PigMisc setBlock={setBlock}/>
        <Opinions setBlock={setBlock}/>
        <div className='mt-24'></div>
        <Footer/>
      </div>
    );
  }
}

export default App;
