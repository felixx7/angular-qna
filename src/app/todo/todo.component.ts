import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TodoService } from './todo.service'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  displayedColumns: string[] = ['task','checked', 'action'];
  dataSource : any;
  
  taskList = Array();

  constructor(private todoService : TodoService) { }

  ngOnInit(){
    this.getTodos()
  }

  getTodos() {
    this.todoService.getTodos().subscribe({
      next: (v) => {
        this.dataSource = new MatTableDataSource<TaskElement>(v)
      },
      error: console.error
   }) 
  }

  todoForm = new FormGroup({
    task: new FormControl("Lorem ipsum dolor sit amet", Validators.required),
    checklist:new FormControl(false)
  });

  onSubmitTask() {

    let dataTodo = {
      task : this.todoForm.controls.task.value,
      checked : this.todoForm.controls.checklist.value
    }

    this.todoService.onSubmitTask(dataTodo).subscribe({
      next: () => {
        this.getTodos()
      },
      error: console.error,
      complete: () => console.info('complete')
    }) 
  }

  onDeleteTask(id:any){
    this.todoService.onDeleteTask(id).subscribe({
      next: () => {
        this.getTodos()
      },
      error: console.error,
      complete: () => console.info('complete')
    }) 
  }

  onChecklistTask(element: TaskElement) {
    element.checked = !element.checked
  }

}

export interface TaskElement {
  task: string
  action: string
  checked: Boolean
}
