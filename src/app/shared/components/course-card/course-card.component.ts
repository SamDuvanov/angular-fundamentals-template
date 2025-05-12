import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
  @Input() isEditable: boolean;
  
  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  constructor() {
    this.title = '';
    this.description = '';
    this.creationDate = new Date();
    this.duration = 0;
    this.authors = [];
    this.isEditable = true;
  }

  onShowCourse()
  {
    this.showCourse.emit();
  }

  onEditCourse()
  {
    this.editCourse.emit();
  }

  onDeleteCourse()
  {
    this.deleteCourse.emit();
  }
}
