import { Component } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from 'src/app/shared/mocks/mocks';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  coursesList: Course[];

  constructor() {
    this.coursesList = mockedCoursesList.map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
      authors:  mockedAuthorsList.filter((author) => course.authors.includes(author.id)).map((author) => author.name)
    }));  
  }
}
