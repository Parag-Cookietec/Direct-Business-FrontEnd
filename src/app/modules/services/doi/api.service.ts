import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlModel } from 'src/app/shared/constants/doi/doi-api.constants';
export const enum RequestTypes {
    GET,
    POST,
    PUT,
    DELETE
}

@Injectable({
    providedIn: 'root'
})

export class ApiService {
private headers = { headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })};
constructor(private readonly httpClient: HttpClient) { }

request(url: urlModel, body?: any): Observable<any> {
    switch(url.type) {
        case RequestTypes.GET:
            return this.httpClient.get(url.url,this.headers);
        case RequestTypes.POST:
            return this.httpClient.post(url.url, body, this.headers);
        case RequestTypes.PUT:
            break;
        case RequestTypes.DELETE:
            break;
        default:
            return undefined;
    }
}

}
