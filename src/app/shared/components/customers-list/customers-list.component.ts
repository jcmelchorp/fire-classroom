import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../customers/models/customer.model';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[];
  @Output() customerDeleted = new EventEmitter<Customer>();
  @Output() customerEdited = new EventEmitter<Customer>();
  trash = faTrashAlt;
  edit = faEdit;

  constructor() { }

  ngOnInit() { }

  onEdit(customer: Customer) {
    this.customerEdited.emit(customer);
  }

  onDelete(customer: Customer) {
    this.customerDeleted.emit(customer);
  }

  trackByFn(index: any) {
    return index;
  }
}
