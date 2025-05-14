import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@app/shared/models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

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