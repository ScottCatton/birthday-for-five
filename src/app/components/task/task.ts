import { Component, Input, OnInit } from '@angular/core';
import { Task as ITask } from '../../interfaces/task';
import { TasksService } from '../../services/tasks-service';
@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {
  @Input() task!: ITask;
  constructor(private service: TasksService) {}
  ngOnInit() {}
}
