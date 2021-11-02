import { Injectable } from '@angular/core';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiManager: ApiManagerService) { 

  }

  public getAllProduct() {
    return this.apiManager.getRequest('/getAllProduct');
  }

  public addProduct(data) {
    return this.apiManager.postRequest('/addProduct', data);
  }

  public updateProduct(data) {
    return this.apiManager.postRequest('/updateProduct', data);
  }
}
