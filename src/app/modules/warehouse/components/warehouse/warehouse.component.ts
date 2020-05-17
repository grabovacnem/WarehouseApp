import { Component, OnInit } from '@angular/core';
import {WarehouseService} from './warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  whItems = [];
  filteredWhItems = [];
  whOccupiedSpace = {};
  filterId = '';
  searchQuery = '';
  editWhItem = false;
  editWhItemId;
  addWhItem = false;

  // could be moved to another file, such as constants
  occupiedSpace = {
    1: {
      1: '0',
      2: '0',
      3: '0',
    },
    2: {
      1: '0',
      2: '0',
      3: '0',
    },
    3: {
      1: '0',
      2: '0',
      3: '0',
    }
  };

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getWarehouseData();
  }

  cloneOccupiedSpace() {
    return JSON.stringify(this.occupiedSpace);
  }

  // Mapping available space by key/value pairs (key = floor, sectionAvailable ? '0' : '1';)
  mapAvailableWhSpace(items) {
    // deep clone to save reference for editing
    const occupiedSpaceCopy = JSON.parse(this.cloneOccupiedSpace());

    items.forEach(item => {
      occupiedSpaceCopy[item.floor][item.section] = item.section ? '1' : '0';
    });

    console.log(occupiedSpaceCopy);
    return occupiedSpaceCopy;
  }

  // Adding/editing list based on type and available space. If adding, just checks if the space is available.
  // If editing, checks if floor/section is changed, if yes then check the space, if not just save other changes.
  updateAndValidateList(item, type) {
    if (type === 'add') {
      if (this.whOccupiedSpace[item.floor] &&
        this.whOccupiedSpace[item.floor][item.section] &&
        this.whOccupiedSpace[item.floor][item.section] === '0') {

        this.whItems.push(item);
        this.whOccupiedSpace = this.mapAvailableWhSpace(this.whItems);
        this.closeModal();
      } else {
        // Usually I would handle these types of errors in some http service, with toaster messages
        alert('Warehouse floor/section is not available!');
      }
    }

    if (type === 'edit') {
      for (const whItem of this.whItems) {
        // Might be a lot of if's but seemed necessary to me, possibly could be improved.
        if (whItem.id === item.id) {
          if (whItem.floor !== item.floor || whItem.section !== item.section) {
            if (this.whOccupiedSpace[item.floor] &&
              this.whOccupiedSpace[item.floor][item.section] &&
              this.whOccupiedSpace[item.floor][item.section] === '0') {

              whItem.floor = item.floor;
              whItem.quantity = item.quantity;
              whItem.section = item.section;
              this.closeModal();
            } else {
              alert('Warehouse floor/section is not available!');
            }
          } else {
            whItem.floor = item.floor;
            whItem.quantity = item.quantity;
            whItem.section = item.section;
            this.closeModal();
          }
        }
      }

      this.filteredWhItems = this.whItems;
      this.whOccupiedSpace = this.mapAvailableWhSpace(this.whItems);
    }
  }

  // Filter based on floor/section and input field
  filterList(type, value, id) {
    if (this.filterId !== id) {
      // save filterId to know if filter should be toggled.
      this.filterId = id;
      type === 'floor' ?
        this.filteredWhItems =
          this.whItems.filter(item => item.floor === value && item.code.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0) :
        this.filteredWhItems =
          this.whItems.filter(item => item.section === value && item.code.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0);
    } else {
      // reset filterId
      this.filterId = '';
      this.filteredWhItems = this.whItems;
    }
  }

  // Filter only from input
  filterByQuery() {
    this.filteredWhItems = this.whItems.filter(item => item.code.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0);
  }

  // Get the initial data
  getWarehouseData() {
    this.warehouseService.getWarehouseData().subscribe(data => {
      this.whItems = data;
      this.filteredWhItems = data;
      this.whOccupiedSpace = this.mapAvailableWhSpace(this.whItems);
    });
  }

  // Set item ID to pass to modal for editing
  setItemId(id) {
    this.editWhItemId = id;
  }

  closeModal() {
    this.addWhItem = false;
    this.editWhItem = false;
  }
}
