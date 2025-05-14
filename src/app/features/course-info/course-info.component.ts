import { Component, Input } from '@angular/core';
import { MockCoursesDataProviderService } from '@app/shared/mocks/services/mock-data-provider.service';
import { DateService } from '@app/utils/date.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  title: string;
  description: string;
  id: string;
  creationDate: Date;
  duration: number;
  authors: string[];

  constructor(
    private dateService: DateService,
    private mockDataService: MockCoursesDataProviderService) {
    const course = this.mockDataService.getMockCourses()[0];
    this.title = course.title;
    this.description = course.description;
    this.id = course.id;
    this.creationDate = course.creationDate;
    this.duration = course.duration;
    this.authors = course.authors;
  }

  getFormattedDate(date: Date): string {
    return this.dateService.getFormattedDate(date);
  }
}
