import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoComponent } from './todo/todo.component';
import { QnaComponent } from './qna/qna.component';
import { QnaDetailComponent } from './qna-detail/qna-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: QnaComponent },
  { path: 'todolist', component: TodolistComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'qna', component: QnaComponent },
  { path: 'qna-detail', component: QnaDetailComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
