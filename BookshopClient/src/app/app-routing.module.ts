import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Početna'}},

  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},

  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Prodavnica'}},

  {path: 'admin', canActivate:[AuthGuard, RoleGuard], loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), data: {breadcrumb: 'Admin'}},

  {path: 'cart', loadChildren: () => import('./shopping-cart/shopping-cart.module').then(mod => mod.ShoppingCartModule), data:{breadcrumb: 'Korpa'}},

  {path: 'wishlist', loadChildren: () => import('./wish-list/wish-list.module').then(mod => mod.WishListModule), data: {breadcrumb: 'Lista želja'}},
  
  {path: 'checkout', canActivate:[AuthGuard], loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'Plaćanje'}},

  {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},

  {path: 'orders', canActivate:[AuthGuard], loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule), data: {breadcrumb: 'Porudžbine'}},

  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
