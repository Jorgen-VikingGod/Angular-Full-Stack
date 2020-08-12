import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-check-all',
  templateUrl: './select-check-all.component.html',
  styleUrls: ['./select-check-all.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectCheckAllComponent implements OnInit {
  @Input() model: NgModel;
  @Input() values = [];
  @Input() text = 'Select All';

  constructor() {}

  ngOnInit() {}

  isChecked(): boolean {
    return this.model?.value?.length === this.values?.length;
  }

  isIndeterminate(): boolean {
    return this.model?.value?.length === 0
      ? false
      : this.model?.value?.length < this.values?.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.update.emit(this.values);
    } else {
      this.model.update.emit([]);
    }
  }
}
