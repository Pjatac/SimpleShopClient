import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import ProductService from 'src/app/services/product.service';
import { MatDialog } from '@angular/material';
import { MydialogComponent } from '../mydialog/mydialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct: Product;
  prodForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    qnt: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
  });
  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  async onSubmit() {
    this.newProduct = {
      name: this.prodForm.controls["name"].value,
      qnt: this.prodForm.controls["qnt"].value.toFixed(0),
      currPrice: this.prodForm.controls["price"].value.toFixed(2)
    };
    try {
      await this.productService.addProduct(this.newProduct);
      for (var name in this.prodForm.controls) {
        (<FormControl>this.prodForm.controls[name]).setValue('');
        (<FormControl>this.prodForm.controls[name]).setErrors(null);
      }
    }
    catch (err){
      this.dialog.open(MydialogComponent, { data: err });
    }
  }
}
