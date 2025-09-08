import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task as ITask } from '../../interfaces/task';
import { TasksService } from '../../services/tasks-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {
  @Input() task!: ITask;
  @Output() deleteTask = new EventEmitter<number>();
  constructor(private service: TasksService, private router: Router) {}
  ngOnInit() {}

  onDelete(id: number) {
    this.deleteTask.emit(id);
  }
}
