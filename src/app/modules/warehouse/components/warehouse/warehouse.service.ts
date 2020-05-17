import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  public getWarehouseData(): Observable<any> {
    return this.http.get('assets/warehouse-data.json');
  }
}
