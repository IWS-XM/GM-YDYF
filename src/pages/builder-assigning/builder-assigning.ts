import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-builder-assigning',
  templateUrl: 'builder-assigning.html',
})
export class BuilderAssigning {
  staff: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    
  }

  ionViewDidEnter() {
    this.staff = this.navParams.get('staff');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.close();
  }

  submit(item:any) {
      // let results: Array<any>; results = [];
      // results.push({ selected: true, selectitem: item});
      console.log('confirmed:' + item);
      this.viewCtrl.dismiss(item);
  }

}
