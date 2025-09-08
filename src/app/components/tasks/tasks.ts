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
  sortByTitle(): void {
    this.tasks = [...this.tasks].sort((a, b) =>
      a.title.localeCompare(b.title.toString())
    );
  }
  sortByPriority(): void {
    const priorityOrder: { [key: string]: number } = {
      low: 1,
      medium: 2,
      high: 3,
    };

    this.tasks = [...this.tasks].sort(
      (a, b) =>
        priorityOrder[a.priority_level.toString()] -
        priorityOrder[b.priority_level.toString()]
    );
  }
  sortByDueDate(): void {
    this.tasks = [...this.tasks].sort((a, b) =>
      a.time.localeCompare(b.time.toString())
    );
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
