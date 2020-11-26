import {Component, AfterViewInit, OnDestroy, Type} from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="overlay" (click)="onOverlayClicked($event)">
        <div class="overlay" (click)="onDialogClicked($event)">
        </div>
    </div>
  `,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  childComponentType: Type<any>;
  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {}

  onOverlayClicked(evt: MouseEvent): void {}

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

}
