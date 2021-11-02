import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  url = environment.url;
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get(this.url+'/getProducts');
  }
}
