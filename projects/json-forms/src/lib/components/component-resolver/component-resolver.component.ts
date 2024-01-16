import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { componentMapping } from '../fieldComponents';

@Component({
  standalone: true,
  selector: 'libs-component-resolver',
  template: '<ng-template #container></ng-template>',
})
export class ComponentResolverComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @Input() controlType: any;
  @Input() data: any;
  @Input() formGroup: any;

  private componentRef: any;

  constructor() {}

  ngOnInit() {
    this.initComponent(this.controlType);
  }

  initComponent(type: string) {
    const component = componentMapping[type];
    if (component) {
      this.componentRef = this.container.createComponent(component);
      this.componentRef.instance.data = this.data;
      this.componentRef.instance.formGroup = this.formGroup;
    }

    return component;
  }
}
