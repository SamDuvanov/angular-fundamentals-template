import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MockDataService {
    public charactersLoader$ = new BehaviorSubject<boolean>(false);
    public planetsLoader$ = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {}

    getCharacters(searchTerm?: string): Observable<any> {
        this.charactersLoader$.next(true);
        const queryParams: string = searchTerm ? `?search=${searchTerm}` : '';
        return this.httpClient
            .get<any>(`https://swapi.py4e.com/api/people/${queryParams}`)
            .pipe(finalize(() => this.charactersLoader$.next(false)))
            .pipe(map((response) => response.results));
    }

    getPlanets(searchTerm?: string): Observable<any> {
        this.planetsLoader$.next(true);
        const queryParams: string = searchTerm ? `?search=${searchTerm}` : '';
        return this.httpClient
            .get<any>(`https://swapi.py4e.com/api/planets/${queryParams}`)
            .pipe(finalize(() => this.planetsLoader$.next(false)))
            .pipe(map((response) => response.results));
    }

    getCharactersLoader(): Observable<boolean> {
        return this.charactersLoader$;
    }

    getPlanetLoader(): Observable<boolean> {
        return this.planetsLoader$;
    }
}
