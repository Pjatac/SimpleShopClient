import { CardItem } from '../Models/cardItem';
import { Product } from '../Models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export default class PurchaseCardService {

    card: CardItem[];
    SERVER_URL = 'http://localhost:8080';
    //SERVER_URL = 'https://pjatak-simple-shop.azurewebsites.net';
    constructor(private httpClient: HttpClient) {
        this.card = new Array();
    }

    async getPurchaseCardItems() {
        let res = await this.httpClient.get<any>(this.SERVER_URL + '/card').toPromise();
        if (res === undefined || res === null)
            this.card = new Array();
        else {
            this.card = res.card;
        }
        return this.card;
    }

    recalculate(products: Product[]) {
        if (this.card && this.card.length > 0)
            for (let prod of products)
                for (let i = 0; i < this.card.length; i++)
                    if (prod.name === this.card[i].name)
                        this.card[i].price = prod.currPrice;
    }

    async addToCard(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>(this.SERVER_URL + '/card', cardItem).toPromise();
    }

    async removeFromCard(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>(this.SERVER_URL + '/card/remove', cardItem).toPromise();
    }

    async incQnt(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>(this.SERVER_URL + '/card/inq', cardItem).toPromise();
    }

    async decQnt(cardItem: CardItem) {
        this.card = await this.httpClient.post<CardItem[]>(this.SERVER_URL + '/card/deq', cardItem).toPromise();
    }

    async purchase() {
        const str = await this.httpClient.get(this.SERVER_URL + '/purchase').toPromise();
        if ( typeof (str) === 'string' ){
            this.card = new Array();
            return str;
        }
    }
}