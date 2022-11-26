import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { QnaDetailService } from './qna-detail.service'
import { MatTableDataSource } from '@angular/material/table'
import { Editor, Toolbar } from 'ngx-editor';



@Component({
  selector: 'app-qna-detail',
  templateUrl: './qna-detail.component.html',
  styleUrls: ['./qna-detail.component.css']
})
export class QnaDetailComponent implements OnInit {

  editor!: Editor;
  html!: '';

  displayedColumns: string[] = ['task','checked', 'action'];
  dataSource : any;
  
  taskList = Array();
  questions = Array();
  users = Array();
  questionData: any;
  questionDetailGet: any;
  getQuestionAnswerByQuestionDetailId: any;

  constructor(private qnaDetailService : QnaDetailService) { }

  ngOnInit(): void {
    this.editor = new Editor()
    this.questions = ELEMENT_QUESTION
    this.users = ELEMENT_USER
    this.questionData = JSON.parse(localStorage.getItem('question')!)
    this.questionDetail(this.questionData)
    this.getQuestionAnswer()
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  questionAnswerForm = new FormGroup({
    questionAnswer: new FormControl("", Validators.required),
  })

  todoForm = new FormGroup({
    task: new FormControl("Lorem ipsum dolor sit amet", Validators.required),
    checklist:new FormControl(false)
  })

  getQuestionAnswer(){

    let id = this.questionDetailGet[0].id

    this.qnaDetailService.getQuestionAnswer().subscribe((res)=>{

      return this.getQuestionAnswerByQuestionDetailId = res.filter(function (el:any) {
        return id == el.questionDetailId
      })

    })
  }

  onSubmitQuestionAnswer() {
    let dataQuestionAnswer = {
      id:"",
      questionAnswer : this.questionAnswerForm.controls.questionAnswer.value!,
      questionDetailId : this.questionDetailGet[0].id
    }

    this.qnaDetailService.addQuestDetail(dataQuestionAnswer).then((dataQuestionAnswer)=>{
      if(dataQuestionAnswer){
        console.log("berhasil")
      }
    })
  }

  // onDelete(id:any){
  //   this.qnaDetailService.delete(id).then((user)=>{
  //     console.log(user)
  //     this.getQuestionAnswer
  //   })
  // }

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

  questionDetail(questionData:any){
    this.questions = ELEMENT_QUESTION
    this.questionDetailGet = this.questions.filter(function (el) {
      return questionData.id == el.id
    })
  }
}

export interface TaskElement {
  task: string
  action: string
  checklist: Boolean
}

export interface User {
  id:number
  name: string;
  username:string
  occupation: string;
}

const ELEMENT_USER: User[] = [
  {id: 1,username: "@felixx7", name: 'Aditya Radika', occupation: "Software Engineer" },
  {id: 2,username: "@stef20", name: 'Stef Anders', occupation: "BA Analyst" },
  {id: 3,username: "@alejandro55", name: 'Achrian Destro', occupation: "QC Engineer"},
];

export interface Question {
  id:number
  id_user:number
  title: string;
  question:string
  date: string;
  like:number
}

const ELEMENT_QUESTION: Question[] = [
  {id: 1,id_user:1,title:"ERROR 404", question: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', date: "21-10-2022", like: 11 },
  {id: 2,id_user:2,title:"NOT FOUND", question: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', date: "21-11-2022", like: 12 },
  {id: 3,id_user:3,title:"ALERT ESCAPE", question: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', date: "23-12-2022", like: 45},
];

interface QuestionAnswer {
  id: string,
  questionAnswer : string,
  questionDetailId : string
}
