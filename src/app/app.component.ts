import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(){
    return this.db.list('/asd').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        console.log(prod)
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }
}
