import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ServicioBusqueda {
  private urlBase = "https://www.tvmaze.com/api"

  constructor(private http:HttpClient)
  {

  }

  buscarShows(query : string): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase + encodeURIComponent(query))
  }

}

