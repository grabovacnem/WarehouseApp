import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import {WarehouseRoutingModule} from './warehouse-routing.module';
import { WhItemComponent } from './components/warehouse/wh-item/wh-item.component';
import {WarehouseService} from './components/warehouse/warehouse.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditModalComponent } from './components/warehouse/add-edit-modal/add-edit-modal.component';

@NgModule({
  declarations: [
    WarehouseComponent,
    WhItemComponent,
    AddEditModalComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WarehouseService]
})
export class WarehouseModule { }
