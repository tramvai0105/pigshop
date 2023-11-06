import { makeAutoObservable } from "mobx"
import Item from "./Item";

class ShopStore{
    items: Item[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    addItem(item: Item){
        let items = this.items.filter(_item=> _item.name == item.name)
        let keep = this.items.filter(_item=> _item.name != item.name)
        if(items.length > 0){
            items[0].quantity += 1;
        }else{
            item.place = this.items.length;
            items.push(item);
        }
        let arr = [...items, ...keep]
        arr.sort((a, b)=> a.place - b.place);
        this.items = arr;
    }

    test(){
        console.log("test");
    }

    increaseQ(name: string){
        let items = this.items.filter(_item=> _item.name == name)
        let keep = this.items.filter(_item=> _item.name != name)
        if(items.length > 0){
            items[0].quantity += 1;
        }
        let arr = [...items, ...keep]
        arr.sort((a, b)=> a.place - b.place);
        this.items = arr;
    }

    decreaseQ(name: string){
        let items = this.items.filter(_item=> _item.name == name)
        let keep = this.items.filter(_item=> _item.name != name)
        if(items.length > 0){
            if(items[0].quantity > 0){
                items[0].quantity -= 1;
            }
        }
        let arr = [...items, ...keep]
        arr.sort((a, b)=> a.place - b.place);
        this.items = arr;
    }

    removeItem(name: string){
        this.items = this.items.filter(_item=> _item.name != name)
    }

}

let store = new ShopStore();

export default store;