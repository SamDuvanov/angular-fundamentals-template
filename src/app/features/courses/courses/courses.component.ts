import { Component } from '@angular/core';
import { MockCoursesDataProviderService } from '@app/shared/mocks/services/mock-data-provider.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  coursesList: Course[];

  constructor(private mockDataService: MockCoursesDataProviderService) {
    this.coursesList = this.mockDataService.getMockCourses();  
  }
}
