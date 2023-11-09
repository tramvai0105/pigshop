import React, { useRef, useState } from "react";
import Cart from "./Cart";
import store from "./store";
import { useEffect } from 'react';

interface Props{
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

function Order({show, setShow}:Props){

    const [price, setPrice] = useState(0)
    const [sended, setSended] = useState(false);
    const showRef = useRef(show)

    useEffect(()=>{  
        showRef.current = show
        if(show){
            window.scroll(0,0);
            window.addEventListener("scroll", (e)=>{
                if(showRef.current){
                    window.scroll(0,0);
                }
            })
        }
    }, [show])

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

    function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(price < 1){
            return
        }
        console.log(e.target);
        setSended(true);
        setTimeout(()=>{window.location.reload()}, 1000)
    }

    return(
        <React.Fragment>
        {(show)?
        <div onClick={()=>{setShow(false)}} className="absolute cursor-pointer w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-40">
            <div onClick={(e)=>{e.stopPropagation()}} className="bg-white cursor-auto relative flex flex-col p-10 mb-auto mt-24 rounded-2xl">
                {!sended?
                <>
                <span className="text-center text-[22px] italic mb-4">Введите данные и поспешите скорее забрать свой ПигБоксик</span>
                <div className="relative text-[18px] h-fit grid grid-cols-2 space-x-10 w-fit ">
                    <div>
                        <form onSubmit={(e)=>submit(e)}>
                            <div className="space-y-4 flex flex-col">
                                <div className="space-x-2">
                                    <input required placeholder="Ваше имя" className="border-blue-500 pl-1 border-[2px] h-[40px] w-[170px] rounded-xl"/>
                                    <input required placeholder="Ваша фамилия" className="border-blue-500 pl-1 border-[2px] h-[40px] w-[170px] rounded-xl"/>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <input required placeholder="Адрес доставки" className="border-blue-500 pl-1 border-[2px] h-[40px] w-[350px] rounded-xl"/>
                                    <input required placeholder="Номер телефона" className="border-blue-500 pl-1 border-[2px] h-[40px] w-[350px] rounded-xl"/>
                                    <input required placeholder="Email" className="border-blue-500 pl-1 border-[2px] h-[40px] w-[350px] rounded-xl"/>
                                </div>
                                <div className="grid-cols-2 grid">
                                    <span>Способ оплаты:</span>
                                    <span></span>
                                    <span>Карта</span>
                                    <input required value={"Карта"} name="pay" type="radio"></input>
                                    <span>Перевод</span>
                                    <input required value={"Перевод"} name="pay" type="radio"></input>
                                    <span>Хрюки</span>
                                    <input required value={"Хрюки"} name="pay" type="radio"></input>
                                </div>
                                <button className="border-[2px] ml-auto mr-auto w-fit rounded-xl border-black text-[20px] px-6" type="submit">Заказать</button>
                            </div>
                        </form>
                    </div>
                    <div className="h-full flex flex-col">
                        {getItems()}
                        <div className="mt-auto flex w-full justify-center mb-2">
                        <span className="">Полная стоимость: {price + "₽"}</span>
                        </div>
                    </div>
                </div>
                </>:
                <span className="p-20 text-[32px]">Ваш заказ успешно оформлен.</span>}
            </div>
        </div>
        :<></>}
        </React.Fragment>
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
            <span className="ml-4">{name}</span>
            <span className="ml-1 mr-3">:</span>
            <span>{price*quantity + "₽"}</span>
            <span className="ml-auto flex">Всего: {quantity}</span>
        </div>
    )
}

export default Order;