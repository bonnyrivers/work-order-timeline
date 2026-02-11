import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header-component/header-component';
import { TimelineTableComponent } from '../../components/timeline-table-component/timeline-table-component';

@Component({
  selector: 'app-shell-component',
  imports: [HeaderComponent, TimelineTableComponent],
  templateUrl: './shell-component.html',
  styleUrl: './shell-component.scss',
})
export class ShellComponent {

}
