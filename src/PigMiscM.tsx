import React, { useEffect, useRef } from 'react';
import { Block } from './enums';
import grum from "./img/grum.png"
import banana from "./img/banana.jpg"
import dirt from "./img/dirt.jpg"
import store from './store';
import Item from './Item';
import useAlert from './useAlert';

interface PigMiscProps{
    setBlock: React.Dispatch<React.SetStateAction<Block>>,
  }

function PigMiscM({setBlock}:PigMiscProps) {

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
            <span className='text-[36px] font-bold bg-[#90E0EF] px-8 py-2 text-center'>Средства ухода</span>
            <div className='mt-10 w-full bg-white flex justify-center h-fit'>
                <div className='overflow-hidden w-[95%] h-fit grid grid-cols-2 space-y-2'>
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

function MiscItem({name, price, photo, moneyPrice, height = 500}: MiscItemProps) {
    
    const {alert, showAlert} = useAlert();
    
    return (
        <div className="flex max-w-[200px] h-auto flex-col bg-gray-100 rounded-3xl">
            <img className='w-full max-w-[200px] max-h-[200px] min-h-[200px] rounded-t-3xl object-cover' src={photo} />
            <div className='w-full relative h-full flex flex-col p-2'>
                <span className='text-[18px] font-bold'>{name}</span>
                <span className='text-[16px]'>{price + "₽"}</span>
                {alert?<span className='absolute bg-white p-1 top-[100%] -translate-y-[140%] translate-x-5'>Товар добавлен</span>:<></>}
                <div onClick={()=>{showAlert();store.addItem(new Item(name, moneyPrice, 1))}} className='flex mt-auto flex-row ml-auto mr-10 items-center space-x-2 cursor-pointer'>
                    <span>В корзину</span>
                    <button className='text-[30px] hover:bg-white border-[2px] border-gray-400 rounded-2xl px-2'>+</button>
                </div>
            </div>
        </div>
    )
}

export default PigMiscM;