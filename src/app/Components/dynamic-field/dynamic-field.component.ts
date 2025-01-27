import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss']
})
export class DynamicFieldComponent {
  @Input() field!: FormGroup;

  get type() {
    return this.field.get('type')?.value;
  }
}
