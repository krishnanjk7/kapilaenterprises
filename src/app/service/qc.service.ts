import { Injectable } from '@angular/core';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class QcService {

  constructor(private apiManager: ApiManagerService) { 

  }

  public getAllQc() {
    return this.apiManager.getRequest('/getAllQc');
  }

  public getQc(id) {
    return this.apiManager.postRequest('/getQc', { qc_id: id});
  }

  public getQcGroup(id) {
    return this.apiManager.postRequest('/getQcGroup', { qc_id: id});
  }

  public addQc(data) {
    return this.apiManager.postRequest('/addQc', data);
  }

  public updateQc(data) {
    return this.apiManager.postRequest('/updateQc', data);
  }
}
