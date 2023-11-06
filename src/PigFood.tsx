import React, { useEffect, useRef } from 'react';
import zhelud from "./img/zhelud.jpg"
import fly from "./img/fly.jpg"
import buter from "./img/buter.jpg"
import korm from "./img/korm.jpg";
import { Block } from './enums';
import store from './store';
import Item from './Item';

interface PigFoodProps{
    setBlock: React.Dispatch<React.SetStateAction<Block>>,
  }

function PigFood({setBlock}:PigFoodProps) {

    const pigFoodRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
        if(pigFoodRef.current){
            let dif = pigFoodRef.current.offsetTop - window.scrollY;
            if(dif < 40 && dif > -100){
            setBlock(Block.Food)
            }
        }
        })
  }, [])

    return (
        <div ref={pigFoodRef} id='food' className="w-full flex mt-36 flex-col">
            <span className='text-[40px] font-bold bg-[#90E0EF] text-center px-8 py-2'>Хрючева</span>
            <div className='mt-10 ml-auto mr-auto bg-white p-1 flex mx-36 w-[80%] h-fit border-[#CAF0F8] rounded-3xl border-[2px]'>
                <div className='overflow-hidden w-full grid space-y-1 rounded-3xl'>
                    <FoodItem height={200} name='Желуди на развес' price='1кг - 100' moneyPrice={100} photo={zhelud}/>
                    <FoodItem height={200} name='Муха со стола' price='1шт - 1' moneyPrice={1} photo={fly}/>
                    <FoodItem height={250} name="Бутерброд" price='1шт - 700' moneyPrice={700} photo={buter}/>
                    <FoodItem height={200} name="Специальный свиной корм" price='1кг - 800' moneyPrice={800} photo={korm}/>
                </div>
            </div>
        </div>
    );
}

interface FoodItemProps{
    height?: number,
    name: string,
    price: string,
    moneyPrice: number,
    photo: string,
}

function FoodItem({name, price, photo, moneyPrice, height = 150}: FoodItemProps) {
    return (
        <div style={{height: height}} className="flex flex-row bg-gray-100">
            <img className='h-full w-2/3 object-cover' src={photo} />
            <div className='w-1/3 h-full flex flex-col p-10'>
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

export default PigFood;