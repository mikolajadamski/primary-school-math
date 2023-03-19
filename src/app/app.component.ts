import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
template: `
    <div class="wrapper">
      <div class="range-form">
        <div class="range-inputs">
          <div class="range-input">
            <label for="min-value">
              {{'Najmniejsza możliwa liczba w mnożeniu'}}
            </label>
            <input id="min-value" [formControl]="minValueForm"/>
          </div>
          <div class="range-input">
            <label for="max-value">{{'Największa możliwa liczba w mnożeniu'}}</label>
            <input id="max-value" [formControl]="maxValueForm"/>
          </div>
        </div>
      </div>
      <div>
        <span>
          {{'Prawidłowe odpowiedzi: '}}
        </span>
        <span class="correct-answers-count">
        {{correctAnswersCounter}}
        </span>
        <span *ngIf="previousAnswerIncorrect" class="error">
          {{'Błąd!'}}
        </span>
        <div class="equation">
          <div>
            {{firstValue + ' x ' + secondValue + ' = '}}
          </div>
          <input class='equation-result'
                 type="number"
                 [formControl]="answer"
                 (keydown)="checkValue($event)"/>
        </div>
      </div>

      <div *ngIf="correctAnswersCounter === 10">
        {{'Wolne!'}}
      </div>

    </div>

  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  multiplicationForm: FormGroup = new FormGroup({
    'minValue': new FormControl(3),
    'maxValue': new FormControl(15),
    'answer': new FormControl(null)
  });

  minValueForm: FormControl = this.multiplicationForm.get('minValue')! as FormControl;
  maxValueForm: FormControl = this.multiplicationForm.get('maxValue')! as FormControl;
  answer: FormControl = this.multiplicationForm.get('answer')! as FormControl;

  firstValue: number = 0;
  secondValue: number = 0;
  correctAnswersCounter: number = 0;
  previousAnswerIncorrect: boolean = false;

  ngOnInit(): void {
    const minVal = this.multiplicationForm.get('minValue')!.value;
    const maxVal = this.multiplicationForm.get('maxValue')!.value;
    this.firstValue = this.generateValueFromRange(minVal, maxVal);
    this.secondValue = this.generateValueFromRange(minVal, maxVal);
  }

  generateValueFromRange(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
  }

  checkValue($event: KeyboardEvent): void {
    if ($event.key == 'Enter') {
      if (this.answer.value === this.firstValue * this.secondValue) {
        this.correctAnswersCounter++;
        const minVal = this.multiplicationForm.get('minValue')!.value;
        const maxVal = this.multiplicationForm.get('maxValue')!.value;
        this.firstValue = this.generateValueFromRange(minVal, maxVal);
        this.secondValue = this.generateValueFromRange(minVal, maxVal);
        this.previousAnswerIncorrect = false;
        this.multiplicationForm.get('answer')!.setValue(null);
      } else {
        this.correctAnswersCounter = 0;
        this.previousAnswerIncorrect = true;
      }
    } else {
      this.previousAnswerIncorrect = false;
    }
  }
}
