import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { DataLoadRequest } from "thingbook-api/lib";
import { AbstractService } from "../abstract.service";
import { EnvironmentService } from "../environment/environment.service";


@Injectable({
    providedIn: 'root'
})
export class DevelopmentService extends AbstractService {

    private baseUrl;

    constructor(private http: HttpClient, private env: EnvironmentService) {
        super();

        this.baseUrl = `${env.getValue('apiUrl')}/development`;
    }

    getDataLoadRequests(type): Observable<DataLoadRequest[]> {
        return this.http.get<DataLoadRequest[]>(`${this.baseUrl}/sensor-things-test-data`)
            .pipe(
                catchError(this.handleError<DataLoadRequest[]>('getDataLoadRequests', null))
            );
    }
}