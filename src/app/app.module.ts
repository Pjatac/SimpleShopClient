import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './route.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { PriceHistoryComponent } from './Components/price-history/price-history.component';
import { PurchaseHistoryComponent } from './Components/purchase-history/purchase-history.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { PurchaseCardComponent } from './Components/purchase-card/purchase-card.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MydialogComponent } from './Components/mydialog/mydialog.component';
import ProductService from './Services/product.service';
import PurchaseCardService from './Services/purchaseCard.service';
import HistoryService from './Services/history.serviсe';
import ConnectService from './Services/connect.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    PriceHistoryComponent,
    PurchaseHistoryComponent,
    MainPageComponent,
    ProductListComponent,
    PurchaseCardComponent,
    NotFoundComponent,
    MydialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [ProductService, PurchaseCardService, HistoryService, ConnectService],
  bootstrap: [AppComponent],
  entryComponents: [MydialogComponent]
})
export class AppModule { }
