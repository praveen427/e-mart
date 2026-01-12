import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './user/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CartComponent } from './user/cart/cart.component';
import { OrdersComponent } from '../orders/orders.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: DashboardComponent },
    { path: 'cart', component: CartComponent },
    { path: 'orders', component: OrdersComponent },
    { path: '**', redirectTo: '' }
];
