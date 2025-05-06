import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject, forkJoin, combineLatest, Subscription } from "rxjs";
import { MockDataService } from './mock-data.service';
import { distinctUntilChanged, switchMap, takeUntil, filter, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  charactersResults$!: Observable<any>;
  searchTermByCharacters = new BehaviorSubject<string>('');
  planetAndCharactersResults$!: Observable<any[]>;
  
  isLoading = false;

  private subscriptions: Subscription[] = [];
  private destroy$ = new Subject<void>();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      debounceTime(300),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.mockDataService.getCharacters(searchTerm);
      }),
      takeUntil(this.destroy$)
    );

    this.subscriptions.push(combineLatest([
      this.mockDataService.charactersLoader$, // Combine both loader observables
      this.mockDataService.planetsLoader$
    ])
    .pipe(
      takeUntil(this.destroy$) // Automatically unsubscribe when the component is destroyed
    )
    .subscribe(([charactersLoader, planetsLoader]) => {
      // Set isLoading to true if either loader is true
      this.isLoading = charactersLoader || planetsLoader;
    }));

    this.initLoadingState();
  }

  initLoadingState(): void {
    this.isLoading = false;
  }
  
  changeCharactersInput({ target }: Event): void {
    const inputElement = target as HTMLInputElement;
    const newValue = inputElement.value.trim();
    this.searchTermByCharacters.next(newValue);
  }

  loadCharactersAndPlanet(): void {
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(), // Fetch characters from the API
      this.mockDataService.getPlanets() // Fetch planets from the API
    ]).pipe(
      map(([characters, planets]) => {
        return [... characters, ... planets]; // Combine results into an object
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptions[0].unsubscribe();
  }
}
