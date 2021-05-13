import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.css']
})
export class ProdsComponent implements OnInit {
  prods_ar: any[] = [];
  @ViewChild("f") myForm: any;
  //afs: angular.fire.store
  constructor(private afs: AngularFireDatabase) { }

  ngOnInit(): void {
    this.getRealFoods()
  }

  addProd(): void {
    // console.log(this.myForm.form)
    if (this.myForm.form.status == "VALID") {
      //אוסף כאובייקט את המוצר החדש לפי השמות של האינפוטים בטופס כמאפיינים
      let newprod = this.myForm.form.value;
      //מוסיף למסד נתונים את המידע החדש
      this.afs.list("testdb").push(newprod);
    }
  }

  //מחיקת רשומה לפי איי די
  delProd(_idDel: any): void {
    if (confirm("Are you sure?")) {
      this.afs.list("testdb/" + _idDel).remove();
    }
  }

  getObserProds(): any {
    //מחזיר את כל המידע מהמסד נותנים מהקולקשיין טסט די בי שיצרנו
    // וגם מאזין ברגע שנניח מוסיפים למסד נתונים מידע חדש הוא מתעדכן אוטומטית.
    return this.afs.list("testdb").snapshotChanges()
  }

  //אוסף את המידע מהמסד נתונים של הפייר בייס
  getRealFoods(): void {
    this.getObserProds().subscribe((res: any) => {
      // console.log(res);
      this.prods_ar.splice(0, this.prods_ar.length);
      res.map((item: any) => {
        //שולף את המידע של אותו דוקומנט במערך במסד של הקולקשיין
        let newItem = item.payload.val();
        // חשוב לדעת מה האיי די בשביל מחיקה ועריכה בהמשך
        newItem.id = item.payload.key;
        // console.log(newItem);
        this.prods_ar.push(newItem);
      })
      console.log(this.prods_ar);
    })
  }

}
