import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoComponent } from './todo/todo.component';
import { QnaComponent } from './qna/qna.component';
import { QnaDetailComponent } from './qna-detail/qna-detail.component';

const routes: Routes = [
  { path: '', component: QnaComponent },
  { path: 'todolist', component: TodolistComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'qna', component: QnaComponent },
  { path: 'qna-detail', component: QnaDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
