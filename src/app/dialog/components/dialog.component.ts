import {
  Component,
  AfterViewInit,
  OnDestroy,
  Type, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef
} from '@angular/core';
import {InsertionDirective} from '../directives/insertion.directive';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="overlay" (click)="onOverlayClicked($event)">
        <div class="overlay" (click)="onDialogClicked($event)">
          <ng-template appInsertion></ng-template>
        </div>
    </div>
  `,
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  // tslint:disable-next-line:variable-name
  private readonly _onClose = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();

  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    // Because we are using a reference to the view
    // in loadChildComponent, we need to make sure that
    // the view is fully loaded before we use it.
    // That is why we are calling the method in ngAfterViewInit.
    this.loadChildComponent(this.childComponentType);
    // We then trigger change detection, once our dynamic
    // child-component is loaded.
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent): void {}

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    // This method takes the type of the child-component as a parameter.
    // We then use this type to resolve the factory for this component.
    // With the help of the factory and the insertion point,
    // we then instantiate the dynamic child-component.
    // We do so by getting the ViewContainerRef of the directive
    // (we added that property to the directive before)
    // and using it to create the component.
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
