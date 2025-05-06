import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { MockDataService } from './mock-data.service';
import { distinctUntilChanged, switchMap, takeUntil, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  charactersResults$!: Observable<any>;
  searchTermByCharacters$ = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.charactersResults$ = this.searchTermByCharacters$.pipe(
      debounceTime(300),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.mockDataService.getCharacters(searchTerm);
      }),
      takeUntil(this.destroy$)
    );
  }

  changeCharactersInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value.trim();
    this.searchTermByCharacters$.next(newValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
