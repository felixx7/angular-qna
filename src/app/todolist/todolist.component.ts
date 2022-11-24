import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TodolistService } from './todolist.service'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  displayedColumns: string[] = ['task','checked', 'action'];
  dataSource : any;
  
  taskList = Array();

  constructor() { }

  ngOnInit(): void {

  }

  todoForm = new FormGroup({
    task: new FormControl("Lorem ipsum dolor sit amet", Validators.required),
    checklist:new FormControl(false)
  });

  onSubmitTask() {

    let dataTodo = {
      task : this.todoForm.controls.task.value,
      checklist : this.todoForm.controls.checklist.value
    }

    this.taskList.push(dataTodo)
    this.dataSource = new MatTableDataSource<TaskElement>(this.taskList)
  }

  onDeleteTask(id:any){
    this.taskList.splice(id, 1)
    this.dataSource = new MatTableDataSource<TaskElement>(this.taskList)
  }

  onChecklistTask(element: TaskElement) {
    element.checklist = !element.checklist
  }

}

export interface TaskElement {
  task: string
  action: string
  checklist: Boolean
}
