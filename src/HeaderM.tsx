import React, { useEffect, useRef, useState } from 'react';
import cart from "./img/cart.svg"
import { Block } from './enums';
import Cart from './Cart';
import store from './store';
import { observer } from 'mobx-react';
import CartM from './CartM';

interface HeaderProps{
    block: Block,
    setOrder: React.Dispatch<React.SetStateAction<boolean>>,
    order: boolean,
}

let HeaderM = observer(({setOrder, block, order}: HeaderProps) => {

    const [hidden, setHidden] = useState(false);
    const hiddenRef = useRef(hidden)
    const [showCart, setShowCart] = useState(false);
    const [nav, setNav] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll", (e)=>{
            let scroll = window.scrollY;
            if(scroll > 30) {
                setHidden(true);
                hiddenRef.current = true;
            }else{
                if(hiddenRef.current){
                    window.scroll(0, 0)
                }
                setHidden(false);
                hiddenRef.current = false;
            }
        })
        window.addEventListener("click",()=>{
            setShowCart(false);
        })
    },[])

    return (
        <React.Fragment>
            <div className='w-full fixed z-10 bg-[#023E8A] flex justify-between flex-row py-2 px-6 items-center'>
                <h1 className='text-[#CAF0F8] bg-[#0096C7] skew-y-3 font-bold italic text-[24px]'>{"PigsFun :)"}</h1>
                <span onClick={()=>setNav(nav=>!nav)} className='text-[#CAF0F8] text-[18px]'>Навигация</span>
                <button onClick={(e)=>{e.stopPropagation();setShowCart((cart)=>!cart)}} className='border-[2px] relative border-white px-2 rounded-full flex items-center justify-center'>{(store.items.length > 0)?<span className='absolute translate-x-5 -translate-y-4 bg-red-500 rounded-full w-[10px] h-[10px]'/>:<></>}<img className='h-[32px] w-[32px]' src={cart}/></button>
            </div>
            {nav?<div className='flex-col z-10 fixed bg-[#023E8A] p-4 left-[30%] top-[52px] translate-x-4 flex space-y-6'>
                <HButton choosen={block===Block.Pigbox} location='pigbox' hidden={false}>Пигбокс</HButton>
                <HButton choosen={block===Block.Food} location='food' hidden={false}>Вкусняшки</HButton>
                <HButton  choosen={block===Block.Misc} location='misc' hidden={false}>Разное</HButton>
                <HButton choosen={block===Block.Opinions} location='opinions' hidden={false}>Отзывы</HButton>
            </div>:<></>}
        {(showCart && !order)?<CartM setOrder={setOrder} hidden={hidden}/>:<></>}
        </React.Fragment>
    );
})

interface HButtonProps{
    children: string,
    hidden: boolean,
    location?: string,
    choosen?: boolean,
}

function HButton({children, hidden, location, choosen}: HButtonProps){
        function goToLocation(){
            window.location.href = "#"
            window.location.href = `#${location}`;
        }

        if(!hidden){
            return<button
                onClick={goToLocation}
                style={{borderColor: (choosen)?"yellow":"white"}}
                className='px-6 border-[2px] text-white  rounded-3xl'>
                {children}</button>
        }else{
            return<button 
                onClick={goToLocation}
                style={{borderColor: (choosen)?"yellow":"white"}}
                className='px-6 border-[2px] text-[15px] text-white rounded-3xl'>
                {children}</button>
        }
}

export default HeaderM;