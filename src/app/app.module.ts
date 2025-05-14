import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { HttpClientModule } from '@angular/common/http';
import { CoursesModule } from './features/courses/courses/courses.component.module';

import { AppLoader } from '@app/loader/loader.component';
import { CourseInfoModule } from './features/course-info/course-info.module';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent, AppLoader],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    CoursesModule,
    CourseInfoModule,
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
