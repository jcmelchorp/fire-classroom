import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
/* import { Item } from 'src/app/item/models/item.model';
 */ import { User } from '../../../auth/models/user.model';
/* import { Course } from 'src/app/courses/models/course.model';
 */
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  @Input() user: User | undefined;
  //@Input() items: Item[];
  @Input() userItemsLoading: boolean;
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() itemsLoad = new EventEmitter<any>();
  // @Output() itemDeleted = new EventEmitter<Item>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();
  left = faArrowLeft;
  circ = faCircle;

  constructor() {}

  ngOnInit(): void {}

  closeDetails(): void {
    this.detailsClosed.emit();
  }

  loadItems(): void {
    this.itemsLoad.emit();
  }

  /*  onItemsDelete(item: Item): void {
    this.itemDeleted.emit(item);
  }
 */
  onAddAdmin(): void {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin(): void {
    this.removeAdmin.emit(this.user);
  }
}
