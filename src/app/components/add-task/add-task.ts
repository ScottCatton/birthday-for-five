import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../services/tasks-service';
import { Task as ITask } from '../../interfaces/task';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask implements OnInit {
  form!: FormGroup;
  constructor(
    private service: TasksService,
    private router: Router,
    private formBuilderInstance: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = formBuilderInstance.group({
      id: 0,
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      priority_level: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      progress_level: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    // get the course id from current URL via paramMap observable object
    this.route.paramMap.subscribe((params) => {
      // check if id is present in params
      let id = params.get('id');
      // If id is present, we can use it to get the course data from our API
      if (id) {
        // get course data using couse service class
        this.service.getTask(parseInt(id)).subscribe(
          (response: ITask) => {
            // update the form with course data
            this.form.patchValue({
              id: response.id,
              title: response.title,
              description: response.description,
              date: response.date,
              time: response.time,
              priority_level: response.priority_level,
              category: response.category,
              progress_level: response.progress_level,
            });
          },
          (error: Error) => {
            console.log(error);
          }
        );
      }
    });
  }
  // form: FormGroup = new FormGroup({
  //   title: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required]),
  //   date: new FormControl('', [Validators.required]),
  //   time: new FormControl('', [Validators.required]),
  //   priority_level: new FormControl('', [Validators.required]),
  //   category: new FormControl('', [Validators.required]),
  //   progress_level: new FormControl('', [Validators.required]),
  // });

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

  add_task() {
    let id = this.route.snapshot.paramMap.get('id');
    let x = <ITask>this.form.value;
    console.log(id);

    if (id) {
      //update task/edit task
      console.log('id is present');

      this.service.editTask(parseInt(id), x).subscribe(
        (response: ITask) => {
          console.log('Task Updated:', response);
          this.form.reset();
          this.router.navigate(['tasks']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      x.time = x.date + ' ' + this.time?.value;

      this.service.addTask(x).subscribe(
        (result: any) => {
          console.log(result.title + ' has been added successfully!');
          this.form.reset();
          this.router.navigate(['home']);
        },
        (error: HttpResponse<AddTask>) => {
          console.log(error);
        }
      );
    }
  }
}
