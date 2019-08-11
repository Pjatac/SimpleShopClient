import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { CardItem } from '../Models/cardItem';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export default class ProductService {

  products: Product[];

  constructor(private httpClient: HttpClient) { }

  async addProduct(product: Product): Promise<Product> {
    if (this.products === undefined) {
      this.products = new Array();
    }
    const newProd = await this.httpClient.post('http://localhost:8080/addProduct', product).toPromise();
    if (typeof (newProd) !== 'string') {
      return newProd as Product;
    } else {
      throw new Error(newProd);
    }
  }
  async getProducts() {
    let res = await this.httpClient.get<any>('http://localhost:8080/products').toPromise();
    if (res === undefined || res === null)
      this.products = new Array();
    else {
      this.products = res;
    }
    return this.products;
  }
  addToCard(cardItem: CardItem) {
    for (let prod of this.products)
      if (cardItem.name === prod.name) {
        if (prod.qnt > 0) {
          prod.qnt -= 1;
          return true;
        }
        else {
          return false;
        }
      }
  }
  removeFromCard(cardItem: CardItem) {
    for (let prod of this.products)
      if (cardItem.name === prod.name) {
        prod.qnt += cardItem.qnt;
      }
  }
  decInCard(cardItem: CardItem) {
    for (let prod of this.products)
      if (cardItem.name === prod.name) {
        if (cardItem.qnt > 1) {
          prod.qnt += 1;
          return true;
        }
        else {
          return false;
        }
      }
  }
  recalculate(products: Product[]) {
    for (let newProd of products)
      for (let oldProd of this.products)
        if (newProd.name === oldProd.name)
          oldProd.currPrice = newProd.currPrice;
    return this.products;
  }
  async purchase(card: CardItem[]): Promise<String> {
    let products = new Array();
    for (let item of card) {
      for (let prod of this.products)
        if (item.name === prod.name) {
          prod.qnt = item.qnt;
          products.push(prod);
        }
    }
    try {
      const str = await this.httpClient.post('http://localhost:8080/purchase', products).toPromise();
      return str as String;
    }
    catch (err) {
      return err.error.text;
    }
  }
}