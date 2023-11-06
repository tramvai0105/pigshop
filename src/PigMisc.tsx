import React, { useEffect, useRef } from 'react';
import { Block } from './enums';
import grum from "./img/grum.png"
import banana from "./img/banana.jpg"
import dirt from "./img/dirt.jpg"
import store from './store';
import Item from './Item';

interface PigMiscProps{
    setBlock: React.Dispatch<React.SetStateAction<Block>>,
  }

function PigMisc({setBlock}:PigMiscProps) {

    const pigFoodRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
        if(pigFoodRef.current){
            let dif = pigFoodRef.current.offsetTop - window.scrollY;
            if(dif < 40 && dif > -100){
            setBlock(Block.Misc)
            }
        }
        })
  }, [])

    return (
        <div ref={pigFoodRef} id='misc' className="w-full flex mt-36 flex-col">
            <span className='text-[40px] font-bold bg-[#90E0EF] px-8 py-2 text-center'>Средства ухода</span>
            <div className='mt-10 bg-white p-1 ml-auto mr-auto flex justify-center mx-36 w-[80%] h-fit'>
                <div className='overflow-hidden h-fit w-fit grid grid-cols-3 space-x-4'>
                    <MiscItem name='Щётки для свиньи' price='999' moneyPrice={999} photo={grum}/>
                    <MiscItem name='Измерительный банан' price='200' moneyPrice={200} photo={banana}/>
                    <MiscItem name='Грязь специальная' price='1л - 50' moneyPrice={50} photo={dirt}/>
                </div>
            </div>
        </div>
    );
}

interface MiscItemProps{
    height?: number,
    name: string,
    price: string,
    moneyPrice: number,
    photo: string,
}

function MiscItem({name, price, photo, moneyPrice, height = 350}: MiscItemProps) {
    return (
        <div style={{width: height}} className="flex flex-col bg-gray-100 rounded-3xl">
            <img className='w-full rounded-t-3xl h-2/3 object-cover' src={photo} />
            <div className='w-full h-1/3 flex flex-col p-10'>
                <span className='text-[20px] font-bold'>{name}</span>
                <span className='text-[18px]'>{price + "₽"}</span>
                <div onClick={()=>store.addItem(new Item(name, moneyPrice, 1))} className='flex flex-row ml-auto mr-10 items-center space-x-2 cursor-pointer'>
                    <span>В корзину</span>
                    <button className='text-[30px] border-[2px] border-gray-400 rounded-2xl px-4'>+</button>
                </div>
            </div>
        </div>
    )
}

export default PigMisc;