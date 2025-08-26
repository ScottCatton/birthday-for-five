import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Tasks } from './components/tasks/tasks';
import { AddTask } from './components/add-task/add-task';

const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'tasks', component: Tasks },
  { path: 'tasks/add-task', component: AddTask },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
