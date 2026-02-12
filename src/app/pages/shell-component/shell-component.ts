import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header-component/header-component';
import { TimelineTableComponent } from '../../components/timeline-table-component/timeline-table-component';
import { PopoutMenuComponent } from '../../components/popout-menu-component/popout-menu-component';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-shell-component',
  imports: [CommonModule, HeaderComponent, TimelineTableComponent, PopoutMenuComponent],
  templateUrl: './shell-component.html',
  styleUrl: './shell-component.scss',
})
export class ShellComponent {
  isMenuOpen = false;

  constructor(private menuService: MenuService) {}

  popoutMenu() {
    this.menuService.openMenu();
  }

  closePopoutMenu() {
    this.isMenuOpen = false;
  }
}
