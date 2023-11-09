import store from "./store";
import {useEffect, useState} from 'react';
import { observer } from "mobx-react";

interface CartProps{
    hidden: boolean,
    setOrder: React.Dispatch<React.SetStateAction<boolean>>
}

function CartM({hidden, setOrder}: CartProps){

    const [price, setPrice] = useState(0)

    function getItems(){
        let items: JSX.Element[] = []
        let prices = 0;
        for(let i = 0; i < store.items.length; i++){
            let item = store.items[i]
            prices += item.price * item.quantity;
            items.push(<CartItem key={i} name={item.name} price={item.price} quantity={item.quantity}/>)
        }
        if(prices != price){
            setPrice(prices);
        }
        return items
    }

    return(
        <div onClick={(e)=>e.stopPropagation()} style={{marginTop: (!hidden)? "84px":"49px"}} 
        className='fixed text-[20px] z-40 bg-white border-[2px] flex p-3 flex-col rounded-3xl border-[#ADE8F4] w-[98%] translate-x-1 h-fit'>
            <h1>Ваш заказ</h1>
            <div className='w-full h-[1px] bg-gray-400 mb-1'></div>
            <div className="space-y-1 w-full overflow-y-scroll max-h-[450px]">{getItems()}</div>
            <div className="mt-12"></div>
            <div className="mt-auto flex w-full justify-center mb-2">
                <span className="">Полная стоимость: {price + "₽"}</span>
                <button onClick={()=>{if(price>0)setOrder(true)}} className='px-6 ml-4 w-fit border-[2px] border-[#ADE8F4] rounded-3xl'>Оформить</button>
            </div>
        </div>
    )
}

interface CartItemProps{
    name: string;
    price: number;
    quantity: number;
}

function CartItem({name, price , quantity}: CartItemProps){
    return(
        <div className="w-full border-b-[2px] border-blue-100 h-fit items-center flex flex-row">
            <div className="flex-col ml-4 mr-2 flex">
                <span>{name}</span>
                <span>{price*quantity + "₽"}</span>
            </div>
            <span className="ml-auto flex">Всего: <input className="w-[24px]" onChange={(e)=>store.setValue(name, e.target.value)} value={quantity}/></span>
            <button onClick={()=>store.increaseQ(name)} className="text-[20px] ml-2 px-2 bg-gray-50">+</button>
            <button onClick={()=>store.decreaseQ(name)} className="text-[20px] px-2 ml-1 bg-gray-50">-</button>
            <button onClick={()=>store.removeItem(name)} className="text-[14px] ml-1">Убрать</button>
        </div>
    )
}

let observedCartM = observer(CartM);
export default observedCartM;