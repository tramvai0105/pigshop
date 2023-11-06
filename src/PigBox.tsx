import React, { useEffect, useRef } from 'react';
import box from "./img/pigbox.jpg"
import boxtrs from "./img/pigboxtrp.png"
import { Block } from './enums';
import store from "./store";
import Item from './Item';

interface PigBoxProps{
  setBlock: React.Dispatch<React.SetStateAction<Block>>,
}

function PigBox({setBlock}:PigBoxProps) {

  const pigBoxRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={pigBoxRef} id="pigbox" className="w-full flex justify-center mt-16">
      <div className='mt-12 bg-[#ADE8F4] flex p-2 max-w-[80%] flex-row mx-36 w-fit h-fit border-[#48CAE4] rounded-3xl border-[2px]'>
        <div className='w-[40%] flex flex-col p-6 rounded-l-3xl bg-white'>
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
            <div className='mt-auto mb-8 space-x-2'>
                <button onClick={()=>store.addItem(new Item("ПигБокс", 4000, 1))} className='px-6 py-2 font-bold border-[2px] text-[15px] text-black border-[#48CAE4] rounded-3xl'>Добавить в корзину</button>
                <button  className='px-6 py-2 font-bold border-[2px] text-[15px] text-black border-yellow-300 rounded-3xl'>Купить сейчас</button>
            </div>
        </div>
        <div className='w-[60%] flex bg-white overflow-hidden rounded-r-3xl'><img src={boxtrs} className='w-full rounded-r-3xl'/></div>
      </div>
    </div>
  );
}

export default PigBox;