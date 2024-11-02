import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detailsstage',
  templateUrl: './detailsstage.component.html',
  styleUrls: ['./detailsstage.component.css']
})
export class DetailsstageComponent {
  @Input() selectedStage: any;
}
