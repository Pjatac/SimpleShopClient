export class Product{
    _id?: number;
    name: String;
    qnt: number;
    currPrice: number;
    priceChange?: number;
    constructor(name: String, qnt: number, currPrice: number, priceChange?: number, id?: number,){
        this.name = name;
        this.qnt = qnt;
        this.currPrice = currPrice;
        this.priceChange = priceChange;
        this._id = id;
    }; 
}