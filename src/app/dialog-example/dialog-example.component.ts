import { Component } from '@angular/core';
import {DialogConfig} from '../dialog/dialog-config';
import {DialogRef} from '../dialog/components/dialog-ref';

@Component({
  selector: 'app-dialog-example',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ config.data.message }}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a class="btn btn-primary mr-2" (click)="onClose()">CANCEL</a>
        <a class="btn btn-primary" (click)="onClose()">OK</a>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent {
  constructor(public config: DialogConfig, public dialog: DialogRef) {}

  onClose(): void {
    this.dialog.close('some value');
  }

}
