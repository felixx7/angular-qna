import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'qna' 

  constructor(private firestore: Firestore) {

  }

  ngOnInit(){
    this.getItem().subscribe((res:Item[])=>{
      // console.log(res)
    })
  }

  getItem():Observable<Item[]>{
    let item = collection(this.firestore,'item')
    return collectionData(item) as Observable<Item[]>
  }

}

interface Item {
  name: string,
  username:string
}
