import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { PriceChangeItem } from 'src/app/Models/priceChangeItem';

const SERVER_URL = 'http://localhost:8080';
//const SERVER_URL = 'https://pjatak-simple-shop.azurewebsites.net';
@Injectable({
    providedIn: 'root'
})

export default class ConnectService {

    public socket;

    constructor() {
        this.socket = socketIo(SERVER_URL);
    }

    public emitGetProducts() {
        this.socket.emit('getProducts');
    }

    public emitGetPriceChanges() {
        this.socket.emit('getPriceChanges');
    }

    public emitGetPurchases() {
        this.socket.emit('getPurchases');
    }

    public subscribeToProductsUpdates = () => {
        return Observable.create((observer) => {
            this.socket.on('getProducts', (data) => {
                observer.next(data);
            });
        });
    }

    public subscribeToPurchasesUpdates = () => {
        return Observable.create((observer) => {
            this.socket.on('getPurchases', (data: any[]) => {
                data = data.map(o => o.purchases);
                observer.next(data);
            });
        });
    }

    public subscribeToPriceChanges = () => {
        return Observable.create((observer) => {
            this.socket.on('getPriceChanges', (data) => {
                observer.next(data);
            });
        });
    }

    findProducts(changes: PriceChangeItem[]){
        var unicProds = new Array();
        for (let prod of changes)
            if (unicProds.indexOf(prod.name) === -1)
                unicProds.push(prod.name);
        return unicProds;
    }

    buildChartDataSet(changes: PriceChangeItem[], selected: string){
        var data = new Array();
        for (let prod of changes)
            if (prod.name = selected) 
                 data.push(prod.price);
        return [{data: data, label: selected}];
    }
    
    buildChartLabels(changes: PriceChangeItem[], selected: string){
        var data = new Array();
        for (let prod of changes)
            if (prod.name = selected) 
                 data.push(prod.date);
        return data;
    }
}