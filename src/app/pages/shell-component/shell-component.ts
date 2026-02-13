import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header-component/header-component';
import { TimelineTableComponent } from '../../components/timeline-table-component/timeline-table-component';
import { PopoutMenuComponent } from '../../components/popout-menu-component/popout-menu-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell-component',
  imports: [CommonModule, HeaderComponent, TimelineTableComponent, PopoutMenuComponent],
  templateUrl: './shell-component.html',
  styleUrl: './shell-component.scss',
})
export class ShellComponent {
  constructor() {}
}
