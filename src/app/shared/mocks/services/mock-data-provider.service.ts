import { Injectable } from '@angular/core';
import { Course } from '@app/shared/models/course.model';
import { mockedCoursesList, mockedAuthorsList } from 'src/app/shared/mocks/mocks';

@Injectable({
  providedIn: 'root'
})
export class MockCoursesDataProviderService {
  getMockCourses(): Course[] {
    return mockedCoursesList.map((course) => ({
      ...course,
      creationDate: new Date(course.creationDate),
      authors:  mockedAuthorsList.filter((author) => course.authors.includes(author.id)).map((author) => author.name)
    }));
  }
}
