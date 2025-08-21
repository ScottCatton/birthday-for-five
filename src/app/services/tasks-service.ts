import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task as ITask } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getTasks(): Observable<ITask[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'applications/json',
      Accept: 'applications/json',
    });
    const options = { headers: headers };

    return this.http.get<ITask[]>('http://localhost:3000/tasks', options);
  }
}
