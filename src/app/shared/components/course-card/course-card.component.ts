import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DateService } from '@app/utils/date.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() isEditable!: boolean;
  
  @Output() clickOnShow = new EventEmitter<void>();

  constructor(private dateService: DateService) {}

  onShowCourseClicked()
  {
    this.clickOnShow.emit();
  }

  getFormattedDate(date: Date): string {
    return this.dateService.getFormattedDate(date);
  }
}
