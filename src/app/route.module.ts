import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { AddProductComponent} from './Components/add-product/add-product.component';
import { PriceHistoryComponent} from './Components/price-history/price-history.component';
import { PurchaseHistoryComponent} from './Components/purchase-history/purchase-history.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const appRoutes: Routes = [ 
    { path: '', redirectTo: '/main', pathMatch: 'full'},
	{ path: 'main', component: MainPageComponent, pathMatch: 'full'}, 
    { path: 'addproduct', component: AddProductComponent, pathMatch: 'full' },
    { path: 'pricehistory', component: PriceHistoryComponent, pathMatch: 'full'},
    { path: 'purchasehistory', component: PurchaseHistoryComponent, pathMatch: 'full'},
    { path: '**', component: NotFoundComponent}
];
export const routing = RouterModule.forRoot(appRoutes);