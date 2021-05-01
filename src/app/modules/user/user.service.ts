import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { BehaviorSubject, Observable, of as ObservableOf, PartialObserver, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as api from 'thingbook-api';
import { AbstractService } from '../abstract.service';
import { EnvironmentService } from '../environment/environment.service';

export { User } from 'thingbook-api';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractService {

    private baseUrl;
    private user: BehaviorSubject<api.User> = new BehaviorSubject<api.User>(undefined);

    constructor(private authService: NbAuthService, private http: HttpClient, private env: EnvironmentService) {
        super();

        this.baseUrl = `${env.getValue('apiUrl')}/user`;

        this.authService.onTokenChange()
            .subscribe((token: NbAuthJWTToken) => {

                if (token.isValid()) {
                    const { iat, exp, sub } = token.getPayload();
                    this.getUser(sub).subscribe({
                        next: (v) => {
                            console.log('Updated user:');
                            console.log(v);
                            this.user.next(v);
                        },
                        error: (err) => {
                            console.log(err);
                        },
                    });
                }
                else {
                    this.user.next(undefined);
                }
            });
    }

    getUser(id): Observable<api.User> {
        return this.http.get<api.User>(`${this.baseUrl}/${id}`)
            .pipe(
                catchError(this.handleError<api.User>('getUser', null))
            );
    }

    public subscribeLoggedInUser(): Subject<api.User> {
        return this.user;
    }

}

