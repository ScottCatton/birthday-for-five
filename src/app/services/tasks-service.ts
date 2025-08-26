import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task as ITask } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getTasks(): Observable<{ tasks: ITask[] }> {
    //if doesnt work, switch back to "getTasks(): Observable<ITask[]> {"
    const headers = new HttpHeaders({
      'Content-Type': 'applications/json',
      Accept: 'applications/json',
    });
    const options = { headers: headers };

    return this.http.get<{ tasks: ITask[] }>(
      'http://localhost:3000/tasks/',
      options
    ); // add "<ITask[]>" after get if doesnt work
  }

  addTask(form: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const options = { headers: headers };
    // console.log(JSON.stringify(form));
    // let taskToAdd: ITask = form.value; // this is undefined, trying to go form -> task
    // let taskToAdd2: ITask = {
    //   title: form.title,
    //   description: form.description,
    //   date: form.date,
    //   time: form.time,
    //   priority_level: form.priority_level,
    //   category: form.category,
    //   progress_level: form.progress_level,
    // };
    // console.log('taskToAdd: ', taskToAdd);
    // console.log('taskToAdd2: ', taskToAdd2);
    console.log('Value of form before post: ', form);
    console.log(JSON.stringify(form));
    // console.log(
    //   'Stringified value of form before post: ',
    //   JSON.stringify(form)
    // );

    return this.http.post('http://localhost:3000/tasks', form, options);
  }

  editTask() {}
  deleteTask() {}
}
