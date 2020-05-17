import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModulesRoutingModule} from './modules-routing.module';
import {RouterModule} from '@angular/router';
import {LayoutModule} from './layout/layout.module';
import {WarehouseModule} from './warehouse/warehouse.module';
import {WarehouseService} from './warehouse/components/warehouse/warehouse.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    ModulesRoutingModule,
    WarehouseModule,
  ],
  declarations: [],
  providers: []
})
export class ModulesModule {
}
