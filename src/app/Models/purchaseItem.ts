export class PurchaseItem{
    name: String;
    qnt: number;
    price: number;
    cost: number;
    constructor(name: String, qnt: number, price: number, cost: number){
        this.name = name;
        this.qnt = qnt;
        this.price = price;
        this.cost = cost;
    }; 
}