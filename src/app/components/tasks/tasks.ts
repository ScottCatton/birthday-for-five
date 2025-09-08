import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  onDeleteTask(taskId: number) {
    this.service.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
    });
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
}
