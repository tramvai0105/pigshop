import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import PigBox from './PigBox';
import PigFood from './PigFood';
import { Block } from './enums';
import PigMisc from './PigMisc';
import Opinions from './Opinios';

function App() {

  const [block, setBlock] = useState(Block.None);

  return (
    <div className="App w-full h-full flex flex-col">
      <Header block={block}/>
      <PigBox setBlock={setBlock}/>
      <PigFood setBlock={setBlock}/>
      <PigMisc setBlock={setBlock}/>
      <Opinions setBlock={setBlock}/>
      <div className='mt-36'></div>
    </div>
  );
}

export default App;
