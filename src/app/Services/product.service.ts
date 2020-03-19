import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export default class ProductService {

  products: Product[];
  SERVER_URL = 'http://localhost:8080';
  //SERVER_URL = 'https://pjatak-simple-shop.azurewebsites.net';
  constructor(private httpClient: HttpClient) { }

  async addProduct(product: Product): Promise<Product> {
    if (this.products === undefined) {
      this.products = new Array();
    }
    const newProd = await this.httpClient.post(this.SERVER_URL + '/addProduct', product).toPromise();
    if (typeof (newProd) !== 'string') {
      return newProd as Product;
    } else {
      throw new Error(newProd);
    }
  }

  async getProducts() {
    let res = await this.httpClient.get<any>(this.SERVER_URL + '/products').toPromise();
    if (res === undefined || res === null)
      this.products = new Array();
    else {
      this.products = res;
    }
    return this.products;
  }

  recalculate(products: Product[]) {
    for (let newProd of products)
      for (let oldProd of this.products)
        if (newProd.name === oldProd.name){
          oldProd.qnt = newProd.qnt;
          oldProd.priceChange = newProd.priceChange;
          oldProd.currPrice = newProd.currPrice;
        }
    return this.products;
  }
}