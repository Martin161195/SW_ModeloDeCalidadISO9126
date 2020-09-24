import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../../shared/services/header.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
  		private http:HttpClient,
		private headerService:HeaderService,
  	) { }
}
