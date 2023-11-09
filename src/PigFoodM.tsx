import React, { useEffect, useRef } from 'react';
import zhelud from "./img/zhelud.jpg"
import fly from "./img/fly.jpg"
import buter from "./img/buter.jpg"
import korm from "./img/korm.jpg";
import { Block } from './enums';
import store from './store';
import Item from './Item';
import useAlert from './useAlert';

interface PigFoodProps{
    setBlock: React.Dispatch<React.SetStateAction<Block>>,
  }

function PigFoodM({setBlock}:PigFoodProps) {

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
        <div ref={pigFoodRef} id='food' className="w-full mt-36 flex flex-col">
            <span className='text-[36px] font-bold bg-[#90E0EF] text-center px-8 py-2'>Вкусняшки</span>
            <div className='mt-10 bg-white p-1 flex mx-3 h-fit border-[#CAF0F8] rounded-3xl border-[2px]'>
                <div className='overflow-hidden w-full grid space-y-1 rounded-3xl'>
                    <FoodItem height={170} name='Желуди на развес' price='1кг - 100' moneyPrice={100} photo={zhelud}/>
                    <FoodItem height={170} name='Муха со стола' price='1шт - 1' moneyPrice={1} photo={fly}/>
                    <FoodItem height={220} name="Бутерброд" price='1шт - 700' moneyPrice={700} photo={buter}/>
                    <FoodItem height={170} name="Специальный свиной корм" price='1кг - 800' moneyPrice={800} photo={korm}/>
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

    const {alert, showAlert} = useAlert();

    return (
        <div style={{height: height}} className="flex flex-row bg-gray-100">
            <img className='h-full max-w-[250px] min-w-[250px] w-2/3 object-cover' src={photo} />
            <div className='w-full h-full flex items-center justify-center flex-col p-2 relative'>
                <span className='text-[18x] font-bold'>{name}</span>
                <span className='text-[16px]'>{price + "₽"}</span>
                {alert?<span className='absolute text-[14px] top-[100%] -translate-y-[140%] bg-white p-1'>Товар добавлен</span>:<></>}
                <div onClick={()=>{showAlert();store.addItem(new Item(name, moneyPrice, 1))}} className='flex flex-row ml-auto mb-4 mr-2 items-center space-x-2 cursor-pointer'>
                    <span className='text-[16px]'>В корзину</span>
                    <button className='text-[30px] hover:bg-white border-[2px] ml-auto border-gray-400 rounded-2xl px-2'>+</button>
                </div>
            </div>
        </div>
    )
}

export default PigFoodM;