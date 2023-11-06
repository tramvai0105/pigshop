
class Item{
    name: string;
    price: number;
    quantity: number;
    place: number;

    constructor(name: string,price: number, quantity: number = 1, place: number = -1){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.place = place;
    }
}

export default Item;