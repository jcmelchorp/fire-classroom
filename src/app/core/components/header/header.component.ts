import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  faEllipsisV,
  faGlobe,
  faHome,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/auth/models/user.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() deviceXs: boolean;
  @Input() user: User;
  @Input() isLoggedIn: boolean;
  @Input() isLoading: boolean;
  @Input() isAdmin: boolean;
  @Output() logout = new EventEmitter<User>();

  plus = faPlus;
  question = faQuestionCircle;
  dots = faEllipsisV;
  lang = faGlobe;
  home = faHome;
  userIcon = faUser;
  constructor() {}
  ngOnInit(): void {}
  onLogout(): void {
    this.logout.emit(this.user);
  }
}
