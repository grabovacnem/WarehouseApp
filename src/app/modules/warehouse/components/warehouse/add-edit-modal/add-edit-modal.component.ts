import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WhItemModel} from '../warehouse.model';
import {WarehouseService} from '../warehouse.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {
  @Input() addItem: boolean;
  @Output() addItemChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() editItem: boolean;
  @Output() editItemChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() whItemId: number;
  @Output() editedItem: EventEmitter<any> = new EventEmitter();
  @Output() addedItem: EventEmitter<any> = new EventEmitter();
  @Input() filteredList: any;

  whForm: FormGroup;
  whItemModel: WhItemModel;
  codePattern = '([A-Z]){2,4}[\\s]{1}([0-9]){4,6}';
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private warehouseService: WarehouseService) {
    this.whForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required, Validators.pattern(this.codePattern)])],
      quantity: ['', Validators.required],
      floor: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(3), ])],
      section: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(3), ])]
    });
  }

  ngOnInit(): void {
    if (this.editItem) {
      this.getItem();
    }
  }

  // get item based on ID. Usually we need ID to send to API, but here i just filtered the list.
  getItem() {
    this.whItemModel = this.filteredList.filter(item => item.id === this.whItemId);
    this.whForm.patchValue({
      code: this.whItemModel[0].code,
      quantity: this.whItemModel[0].quantity,
      floor: this.whItemModel[0].floor,
      section: this.whItemModel[0].section
    });
    this.whForm.controls['code'].disable();
  }

  closeModal() {
    this.addItem ? this.addItemChange.emit(false) : this.editItemChange.emit(false);
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.whForm.valid) {

      if (this.addItem) {
        this.whItemModel = this.whForm.value;
        this.whItemModel.id = Math.random(); // just add some random ID for now
        this.addedItem.emit(this.whItemModel);
      }

      if (this.editItem) {
        this.whItemModel = this.whForm.value;
        this.whItemModel.id = this.whItemId;
        this.editedItem.emit(this.whItemModel);
      }
    }
  }
}
