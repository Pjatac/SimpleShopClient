export class CardItem{
    _id?: number;
    name: String;
    qnt: number;
    price: number;
    constructor(name: String, qnt: number, price: number, _id?: number ){
        this._id = _id;
        this.name = name;
        this.qnt = qnt;
        this.price = price;
    };
}