import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-log-poop-form',
  templateUrl: './log-poop-form.component.html',
  styleUrls: ['./log-poop-form.component.scss']
})
export class LogPoopFormComponent implements OnInit {
  public poopForm: FormGroup;
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public isSaving = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Array<string> = ['shower needed'];

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.poopForm = this._formBuilder.group({
      isToday: new FormControl(),
      dateTime: new FormControl(),
      time: new FormControl(new Date(Date.now()).toTimeString()),
      rating: new FormControl(0)
    });
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  public submitForm(): void {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
    }, 3000);
    console.log(this.poopForm.controls);
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
