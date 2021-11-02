import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private httpClient: HttpClient) { 

  }

  prepareUrl(endPoint: string) {
    return environment.url + endPoint;
  }

  getRequest(endPoint: string, option?) {
    const restUrl = this.prepareUrl(endPoint);
    if (option) {
      return this.httpClient.get(restUrl, option);
    } else {
      return this.httpClient.get(restUrl);
    }
  }

  postRequest(endPoint: string, bodyParam) {
    const restUrl = this.prepareUrl(endPoint);
    return this.httpClient.post(restUrl, bodyParam);
  }

}
