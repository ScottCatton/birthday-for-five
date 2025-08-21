import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { Task as ITask } from '../../interfaces/task';
import { Task } from '../task/task';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks!: ITask[];
  constructor(private service: TasksService) {
    this.service = service;
  }
  // ngOnInit() {
  //   this.service.getTasks().subscribe((result: any) => {
  //     this.tasks = result.tasks as ITask[];
  //   });
  //   console.log(this.tasks);
  // }
  ngOnInit() {
    this.service.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }
}
