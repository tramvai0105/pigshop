import store from "./store";
import {useState} from 'react';
import { observer } from "mobx-react";

interface CartProps{
    hidden: boolean
}

function Cart({hidden}: CartProps){

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
        <div style={{marginTop: (!hidden)? "84px":"49px"}} className='fixed text-[20px] z-40 bg-white border-[2px] flex p-3 flex-col rounded-3xl border-[#ADE8F4] ml-[100%] -translate-x-[125%] w-[600px] h-fit'>
            <h1>Ваш заказ</h1>
            <div className='w-full h-[1px] bg-gray-400 mb-1'></div>
            {getItems()}
            <div className="mt-12"></div>
            <div className="mt-auto flex w-full justify-center mb-2">
                <span className="">Полная стоимость: {price + "₽"}</span>
                <button className='px-6 ml-4 w-fit border-[2px] border-[#ADE8F4] rounded-3xl'>Оформить</button>
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
        <div className="w-full h-fit items-center flex flex-row">
            <span className="ml-4">{name}</span>
            <span className="ml-1 mr-3">:</span>
            <span>{price*quantity + "₽"}</span>
            <span className="ml-auto flex">Всего: {quantity}</span>
            <button onClick={()=>store.increaseQ(name)} className="text-[20px] ml-2 px-2 bg-gray-50">+</button>
            <button onClick={()=>store.decreaseQ(name)} className="text-[20px] px-2 ml-1 bg-gray-50">-</button>
            <button onClick={()=>store.removeItem(name)} className="text-[14px] ml-1">Убрать</button>
        </div>
    )
}

let observedCart = observer(Cart);
export default observedCart;