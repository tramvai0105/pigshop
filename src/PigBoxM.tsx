import React, { useEffect, useRef, useState } from 'react';
import box from "./img/pigbox.jpg"
import boxtrs from "./img/pigboxtrp.png"
import { Block } from './enums';
import store from "./store";
import Item from './Item';

interface PigBoxProps{
  setBlock: React.Dispatch<React.SetStateAction<Block>>,
}

function PigBoxM({setBlock}:PigBoxProps) {

  const pigBoxRef = useRef<HTMLDivElement>(null);

  const [alert, setAlert] = useState(false);

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if(pigBoxRef.current){
        let dif = pigBoxRef.current.offsetTop - window.scrollY;
        if(dif < 40 && dif > -100){
          setBlock(Block.Pigbox)
        }
      }
    })
  }, [])

  function showAlert(){
    setAlert(true);
    setTimeout(()=>setAlert(false), 500);
  }

  return (
    <div ref={pigBoxRef} id="pigbox" className="w-full flex justify-center mt-16">
      <div className='mt-12 bg-[#ADE8F4] flex p-2 mx-4 flex-col w-fit h-fit border-[#48CAE4] rounded-3xl border-[2px]'>
        <div className='flex bg-red-100 overflow-hidden rounded-t-3xl'>
            <img src={boxtrs} className='w-full rounded-r-3xl'/>
        </div>
        <div className='flex flex-col p-6 rounded-b-3xl bg-white'>
            <h1 className='text-[28px] font-bold'>ПигБокс™ обязательно сделает любую хрюшку счастливой!</h1>
            <ul className='text-gray-500 text-[18px] space-y-2'>
                <li className='before:content-["♥"] before:text-pink-400 before:text-[22px]'>
                    <span>Лакомства для свиней, инструменты для ухода и многое другое в каждой коробке</span>
                </li>
                <li className='before:content-["♥"] before:text-pink-400 before:text-[22px]'>
                    <span>Выгода от продаж поддерживает приюты для спасения свиней</span>
                </li>
                <li className='before:content-["♥"] before:text-pink-400 before:text-[22px]'>
                    <span>Найдите "золотой билет" в своей коробке и выиграйте роскошную кровать для свиней</span>
                </li>
                <li className='before:content-["♥"] before:text-pink-400 before:text-[22px]'>
                    <span><span className='underline'>100% БЕСПЛАТНАЯ</span> доставка по России ... отправляется <span className='italic'>немедленно</span></span>
                </li>
            </ul>
            <div className='relative mt-8'>
                {alert?<span className='absolute bottom-[100%] left-[10%]'>Товар добавлен</span>:<></>}
                <button onClick={()=>{showAlert();store.addItem(new Item("ПигБокс", 2700, 1))}} className='px-6 py-2 hover:bg-[#48CAE4] hover:text-white font-bold border-[2px] text-[15px] text-black border-[#48CAE4] rounded-3xl'>Добавить в корзину</button>
                <button  className='px-2 ml-2 py-2 font-bold border-[2px] text-[15px] text-black border-yellow-300 rounded-3xl'>Купить сейчас</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PigBoxM;