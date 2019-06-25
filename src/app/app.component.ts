import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items$: Observable<any[]>;
  searchTerm: string;
  filteredList = [];
  constructor(private db: AngularFireDatabase) {
    this.items$ = db.list('/towers').valueChanges();
  }

  NetworkType(item): string {
    if (item.Ci !== undefined) { return '4G'; }
    if (item.Rnc !== undefined) { return '3G'; }
    return '2G';
  }

  search() {
    if (this.searchTerm === undefined) {return; }
    this.items$ = this.db.list('/towers', ref => ref.orderByChild('Id').equalTo(+this.searchTerm))
      .valueChanges();
  }
  reset() {
    this.items$ = this.db.list('/towers').valueChanges();
  }
}
