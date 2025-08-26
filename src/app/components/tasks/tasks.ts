import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { Task as ITask } from '../../interfaces/task';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks!: ITask[];
  constructor(private service: TasksService) {
    // this.service = service;
  }

  ngOnInit() {
    this.service.getTasks().subscribe(
      (res: any) => {
        this.tasks = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  // ngOnInit() {
  //   this.service.getTasks().subscribe(
  //     (result: { tasks: [] }) => {
  //       this.tasks = result.tasks;
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
