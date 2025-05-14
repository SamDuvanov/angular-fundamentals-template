import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [ CoursesComponent, CoursesListComponent],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}