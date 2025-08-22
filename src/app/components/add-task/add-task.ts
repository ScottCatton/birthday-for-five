import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks-service';
import { Task as ITask } from '../../interfaces/task';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit {
  constructor(private service: TasksService, private router: Router) {}
  ngOnInit(): void {}
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    priority_level: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    progress_level: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }
  get date() {
    return this.form.get('date');
  }
  get time() {
    return this.form.get('time');
  }
  get priority_level() {
    return this.form.get('priority_level');
  }
  get category() {
    return this.form.get('category');
  }
  get progress_level() {
    return this.form.get('progress_level');
  }

  addTask() {
    // console.log(this.title?.value);
    // console.log(this.description?.value);
    let x = <ITask>this.form.value;
    x.time = x.date + ' ' + this.time?.value;
    this.service.addTask(x).subscribe(
      (result: any) => {
        console.log(result.task.title + ' has been added successfully!');
        this.form.reset();
        this.router.navigate(['home']);
      },
      (error: HttpResponse<AddTask>) => {
        console.log(error);
      }
    );
  }
}
