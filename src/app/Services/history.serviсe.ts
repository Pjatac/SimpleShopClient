import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseItem } from '../Models/purchaseItem';
import { PriceChangeItem } from '../Models/priceChangeItem';


@Injectable({
    providedIn: 'root'
})

export default class HistoryService {

    purchases: PurchaseItem[][];
    changes: PriceChangeItem[];

    constructor(private httpClient: HttpClient) { }

    addNewPurchase(purchase: PurchaseItem[]) {
        if (this.purchases === undefined) {
            this.purchases = new Array();
        }
        if (localStorage.getItem("purchases") !== null) {
            this.purchases = JSON.parse(localStorage.getItem("purchases"));
            this.purchases.push(purchase);
            localStorage.setItem("purchases", JSON.stringify(this.purchases));
        }
        else {
            this.purchases = new Array();
            this.purchases.push(purchase);
            localStorage.setItem("purchases", JSON.stringify(this.purchases));
        }
        this.purchases.push(purchase);
    }
    
    async getPurchases() {
        const newPurchases = await this.httpClient.get<any[]>('http://localhost:4000/api/purchases').toPromise();
        this.purchases = newPurchases.map(o => o.purchases);
        return this.purchases;
    }

    async getPriceChanges() {
        const newPriceChanges = await this.httpClient.get<PriceChangeItem[]>('http://localhost:4000/api/prices').toPromise();
        this.changes = newPriceChanges as PriceChangeItem[];
        return this.changes;
    }
}