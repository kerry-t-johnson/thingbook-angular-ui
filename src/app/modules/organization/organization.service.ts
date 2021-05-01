import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Organization, OrganizationDataSharingAgreement } from 'thingbook-api';
import { AbstractService } from "../abstract.service";
import { EnvironmentService } from "../environment/environment.service";

@Injectable({
    providedIn: 'root'
})
export class OrganizationService extends AbstractService {

    private baseUrl;

    constructor(private http: HttpClient, private env: EnvironmentService) {
        super();

        this.baseUrl = `${env.getValue('apiUrl')}/organization`;
    }

    getOrganization(id): Observable<Organization> {
        return this.http.get<Organization>(`${this.baseUrl}/${id}`)
            .pipe(
                catchError(this.handleError<Organization>('getOrganization', null))
            );
    }

    getOrganizationAgreements(id): Observable<OrganizationDataSharingAgreement[]> {
        return this.http.get<OrganizationDataSharingAgreement[]>(`${this.baseUrl}/${id}/agreement`)
            .pipe(
                catchError(this.handleError<OrganizationDataSharingAgreement[]>('getOrganizationAgreements', []))
            );
    }

    getOrganizations(): Observable<Organization[]> {
        return this.http.get<Organization[]>(this.baseUrl)
            .pipe(
                catchError(this.handleError<Organization[]>('getOrganizations', []))
            );
    }



}