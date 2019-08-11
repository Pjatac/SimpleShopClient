import { CardItem } from '../Models/cardItem';
import { Product } from '../Models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export default class PurchaseCardService {

    card: CardItem[];

    constructor(private httpClient: HttpClient) {
        this.card = new Array();
    }

    async getPurchaseCardItems() {
        let res = await this.httpClient.get<any>('http://localhost:8080/card').toPromise();
        if (res === undefined || res === null)
            this.card = new Array();
        else {
            this.card = res.card;
        }
        return this.card;
    }

    recalculate(products: Product[]) {
        if (this.card.length > 0)
            for (let prod of products)
                for (let i = 0; i < this.card.length; i++)
                    if (prod.name === this.card[i].name)
                        this.card[i].price = prod.currPrice;
    }

    async addToCard(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>('http://localhost:8080/card', cardItem).toPromise();
    }

    async removeFromCard(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>('http://localhost:8080/card/remove', cardItem).toPromise();
    }

    async incQnt(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>('http://localhost:8080/card/inq', cardItem).toPromise();
    }

    async decQnt(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>('http://localhost:8080/card/deq', cardItem).toPromise();
    }

    purchase() {
        this.card = new Array();
    }
}