import React, { useEffect, useState } from 'react';
import cart from "./img/cart.svg"
import { Block } from './enums';
import Cart from './Cart';
import store from './store';
import { observer } from 'mobx-react';

interface HeaderProps{
    block: Block,
}

let Header = observer(({block}: HeaderProps) => {

    const [hidden, setHidden] = useState(false);
    const [showCart, setShowCart] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", (e)=>{
            let scroll = window.scrollY;
            if(scroll > 30) {
                setHidden(true);
            }else{
                setHidden(false);
            }
        })
    },[])

    return (
        <React.Fragment>
            {(!hidden)?
            <>
            <div className='w-full bg-[#023E8A] flex flex-row py-7 px-16'>
                <h1 className='text-[#CAF0F8] bg-[#0096C7] skew-y-3 font-bold italic text-[32px] ml-8 mr-24'>{"PigsFun :)"}</h1>
                <div className='flex-row flex space-x-6'>
                    <HButton choosen={block==Block.Pigbox} location='pigbox' hidden={false}>Пигбокс</HButton>
                    <HButton choosen={block==Block.Food} location='food' hidden={false}>Хрючева</HButton>
                    <HButton  choosen={block==Block.Misc} location='misc' hidden={false}>Разное</HButton>
                    <HButton choosen={block==Block.Opinions} location='opinions' hidden={false}>Отзывы</HButton>
                </div>
                <button onClick={()=>setShowCart((cart)=>!cart)} className='border-[2px] relative border-white px-2 mr-16 ml-auto rounded-full flex items-center justify-center'>{(store.items.length > 0)?<span className='absolute translate-x-5 -translate-y-5 bg-red-500 rounded-full w-[15px] h-[15px]'/>:<></>}<img className='h-[32px] w-[32px]' src={cart}/></button>
            </div>
            </>
            :
            <>
            <div className='w-full mt-24'></div>
            <div className='w-full z-30 fixed bg-[#023E8A] flex flex-row py-2 px-16'>
                <h1 className='text-[#CAF0F8] font-bold italic text-[22px] ml-8 mr-24'>{"PigsFun :)"}</h1>
                <div className='flex-row flex space-x-6'>
                    <HButton choosen={block==Block.Pigbox} location='pigbox' hidden={true}>Пигбокс</HButton>
                    <HButton choosen={block==Block.Food} location='food' hidden={true}>Хрючева</HButton>
                    <HButton choosen={block==Block.Misc} location='misc' hidden={true}>Разное</HButton>
                    <HButton choosen={block==Block.Opinions} location='opinions' hidden={true}>Отзывы</HButton>
                </div>
            <button onClick={()=>setShowCart((cart)=>!cart)} className='border-[2px] relative border-white mr-16 ml-auto rounded-full'>{(store.items.length > 0)?<span className='absolute translate-x-2 -translate-y-1 bg-red-500 rounded-full w-[10px] h-[10px]'/>:<></>}<img className='h-[28px] w-[28px] p-1' src={cart}/></button>
            </div>
            </>
            }
        {(showCart)?<Cart hidden={hidden}/>:<></>}
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

export default Header;
