import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {DialogComponent} from '../components/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  appendDialogComponentToBody(): void {
    // To get the factory of our DialogComponent we can use
    // the ComponentFactoryResolver provided by angular.
    // This service is using the type of the component to look up the factory.
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(DialogComponent);

    // Once we have the factory, we can use it to create
    // an instance of our DialogComponent.
    // We are passing in the injector we requested
    // in the constructor. This enables the dynamic component
    // to make use of dependency injection itself.
    const componentRef = componentFactory.create(this.injector);

    // Afterward, we need to attach the new component to
    // the angular component tree (which is separate from the DOM).
    // We do so by using the ApplicationRef we requested.
    this.appRef.attachView(componentRef.hostView);

    // We get the root DOM-element of our DialogComponent
    // and attach it to the HTML-body. Also, we assign the
    // componentRef to our property.
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    this.dialogComponentRef = componentRef;
  }

  // We also need a way to remove the component once the dialog is closed.
  removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  // Now that we are able to add the dialog to the DOM,
  // all we need to do to open the dialog is to call our method.
  // To do that, we define a public method called "open".
  public open(): void {
    // we call our appendDialogComponentToBody-method
    // to open the empty dialog.
    this.appendDialogComponentToBody();
  }
}
