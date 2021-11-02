import { Injectable } from '@angular/core';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiManager: ApiManagerService) { 

  }

  public getAllClient() {
    return this.apiManager.getRequest('/getAllClient');
  }

  public addClient(data) {
    return this.apiManager.postRequest('/addClient', data);
  }

  public updateClient(data) {
    return this.apiManager.postRequest('/updateClient', data);
  }

  public getClient(id) {
    return this.apiManager.postRequest('/getClient', {client_id: id});
  }
}
