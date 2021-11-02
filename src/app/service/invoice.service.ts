import { Injectable } from '@angular/core';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private apiManager: ApiManagerService) { 

  }

  public getAllInvoice() {
    return this.apiManager.getRequest('/getAllInvoice');
  }

  public getInvoice(id) {
    return this.apiManager.postRequest('/getInvoice', { invoice_id: id});
  }

  public getInvoiceGroup(id) {
    return this.apiManager.postRequest('/getInvoiceGroup', { invoice_id: id});
  }

  public addInvoice(data) {
    return this.apiManager.postRequest('/addInvoice', data);
  }

  public updateInvoice(data) {
    return this.apiManager.postRequest('/updateInvoice', data);
  }
}
