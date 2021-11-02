import { Injectable } from '@angular/core';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private apiManager: ApiManagerService) { }

  getAllCity() {
    return this.apiManager.getRequest('/getAllCity');
  }

  getAllDistrict() {
    return this.apiManager.getRequest('/getAllDistrict');
  }

  getAllState() {
    return this.apiManager.getRequest('/getAllState');
  }

  getAllTax() {
    return this.apiManager.getRequest('/getAllTax');
  }

  getAllMou() {
    return this.apiManager.getRequest('/getAllMou');
  }

  getShipToAddress(id) {
    return this.apiManager.postRequest('/getShipToAddress', {invoice_id: id});
  }
  
}
