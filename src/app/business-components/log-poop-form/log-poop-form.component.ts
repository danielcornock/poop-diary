import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

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

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.poopForm = this._formBuilder.group({
      dateTimeGroup: this._formBuilder.group(
        {
          isToday: new FormControl(),
          dateTime: new FormControl('')
        },
        { validators: this._dateTimeValidator.bind(this) }
      ),
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
    console.log(this.poopForm);

    if (this.poopForm.invalid) {
      return;
    }

    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this._router.navigateByUrl('/home');
    }, 1500);
  }

  public isDateTimeInvalid(): boolean {
    console.log(this.poopForm.controls.dateTimeGroup.status === 'INVALID');
    console.log(this.poopForm.controls.dateTimeGroup);

    return (
      this.poopForm.controls.dateTimeGroup.status === 'INVALID' &&
      this.poopForm.controls.dateTimeGroup.get('dateTime').touched
    );
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public displayDateField(): boolean {
    return !this.poopForm.controls.dateTimeGroup.get('isToday').value;
  }

  private _dateTimeValidator(group: FormGroup): ValidationErrors | null {
    console.log(group);

    if (group.controls.isToday.value || group.controls.dateTime.value) {
      return null;
    } else {
      return {
        required: true
      };
    }
  }
}
