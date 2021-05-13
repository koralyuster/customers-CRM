import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminComponent } from './comps/app-admin/app-admin.component';

import { LoginComponent } from './comps/login/login.component';
import { ProdsComponent } from './firecomps/prods/prods.component';
import { CustomersListComponent } from './comps/customers-list/customers-list.component';
import { AddCustomersComponent } from './comps/add-customers/add-customers.component';
import { CustomerInfoComponent } from './comps/customer-info/customer-info.component';
import { CustomerEditComponent } from './comps/customer-edit/customer-edit.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "fire", component: ProdsComponent },
  {
    path: "admin", component: AppAdminComponent, children: [
      { path: "", component: CustomersListComponent },
      { path: "addCustomer", component: AddCustomersComponent },
      { path: "customersInfo/:id", component: CustomerInfoComponent },
      { path: "customersEdit/:id", component: CustomerEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
