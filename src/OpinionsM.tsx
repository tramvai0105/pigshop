import { useEffect, useRef } from "react";
import { Block } from "./enums";
import farmer from "./img/farmer.jpg";
import elvis from "./img/elvis.jpg";
import gang from "./img/gang.jpg";
import idiot from "./img/idiot.jpg";

interface OpinionsProps{
    setBlock: React.Dispatch<React.SetStateAction<Block>>,
}

function OpinionsM({setBlock}:OpinionsProps){

    const opinionsRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
        if(opinionsRef.current){
            let dif = opinionsRef.current.offsetTop - window.scrollY;
            if(dif < 40 && dif > -100){
            setBlock(Block.Opinions)
            }
        }
        })
    }, [])

    return(
        <div ref={opinionsRef} id="opinions" className="w-full mt-36 text-center flex flex-col">
            <span className='text-[36px] font-bold bg-[#90E0EF] px-8 py-2'>Отзывы</span>
            <div className="w-[90%] ml-auto mr-auto mt-6">
                <div className="bg-[#0077B6] flex flex-col h-fit py-3 pl-2 bg-opacity-20 rounded-2xl">
                    <Opinion photo={farmer}>После покупки Пигбокса все хрюши на моей ферме стали
                    гораздо счастливее. Они радостно хрюкают и с аппетитом едят, поэтому при забое с них
                    выходит гораздо больше мяса. Я ни разу не пожалел о покупке Пигбокса и советую его всем любителям свиней!</Opinion>
                    <Opinion photo={elvis}>Когда mamy предложила торговать Пигбоксами, я сразу понял, что
                    это золотая гора. Хряки и их владельцы со всего мира: никто не откажется от коробочки
                    полной прекрасных подарков. Этот набор восхитителен!</Opinion>
                    <Opinion photo={gang}>Мы скинулись всем загоном на Пигбокс и хотим признаться это волшебно! Вкусняшки сладкие и питательные,
                    а щётки приятно чешут спинку и пузико. Всем кто ещё не купил Пигбокс советую скорее бежать оформлять заказ,
                    ибо вы только выйграете от такой покупки и любая свинка будет в восторге!</Opinion>
                    <Opinion photo={idiot}>{"ВИИИИИИИИИИИИ. ХРЮ ХРЮ ХРЮ... <Множественные звуки хрюков и стуков>"}</Opinion>
                </div>
            </div>
        </div>
    )
}

interface OpinionProps{
    children: string,
    photo: string,
}

function Opinion({children, photo}:OpinionProps){
    return(
        <div className="h-full w-full flex flex-row items-center p-2">
            <img className="rounded-full h-[100px] mb-auto min-h-[100px] min-w-[100px] object-cover" src={photo}/>
            <span className="text-[16px] bg-gray-50 rounded-2xl ml-1 text-left p-4">{children}</span>
        </div>
    )
}

export default OpinionsM;