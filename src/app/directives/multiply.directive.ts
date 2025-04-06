import {
  Directive,
  Input,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMultiply]',
  standalone: false,
})
export class MultiplyDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set appMultiply(howManyTimes: number) {
    this.viewContainer.clear();
    for (let i = 0; i < howManyTimes; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
