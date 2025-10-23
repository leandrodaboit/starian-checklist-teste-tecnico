import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'search' = 'text';
  @Input() disabled: boolean = false;
  @Input() styleClass: string = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.enter.emit();
    }
  }
}
