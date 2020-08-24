import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { MockApiService } from 'src/app/services/mock-api-service/mock-api.service';

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
  public daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Array<string> = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _mockApiService: MockApiService
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
    if (this.poopForm.invalid) {
      return;
    }

    let date: string;
    let time: string;

    const dateValue = new Date(
      this.poopForm.controls.dateTimeGroup.get('dateTime').value ||
        new Date(Date.now())
    );

    const dateTime = this._extractDateAndTime(dateValue);

    date = dateTime.date;
    time = dateTime.time;

    this._mockApiService.addPoop({
      date,
      time,
      rating: this.poopForm.controls.rating.value,
      tags: this.tags
    });

    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this._router.navigateByUrl('/home');
    }, 1500);
  }

  public isDateTimeInvalid(): boolean {
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

  private _extractDateAndTime(date: Date): { date: string; time: string } {
    return {
      date: `${this.daysOfWeek[date.getDay()]} ${date.getDate()} ${
        this.monthNames[date.getMonth()]
      }`,
      time: `${date.getHours()}:${
        date.getMinutes() < 10 ? '0' : ''
      }${date.getUTCMinutes()}`
    };
  }

  private _dateTimeValidator(group: FormGroup): ValidationErrors | null {
    if (group.controls.isToday.value || group.controls.dateTime.value) {
      return null;
    } else {
      return {
        required: true
      };
    }
  }
}
