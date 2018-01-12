import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-builderfilter',
  templateUrl: 'builderfilter.html'
})
export class BuilderFilterPage {
  filters: Array<any> = [];
  groupbystr:string = '';
  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public params: NavParams) {
  }

  ionViewDidEnter() {
    this.groupbystr = this.params.get('groupbystr');
    this.filters = this.params.get('filters');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.close();
  }

  // cancelclick() {
  //   let results: Array<any>; results = [];
  //   results.push({ selected: false, selectitem: item});
  //   console.log('confirmed:' + results);
  //   this.viewCtrl.dismiss(results);
  // }

  submit(item:any) {
      // let results: Array<any>; results = [];
      // results.push({ selected: true, selectitem: item});
      console.log('confirmed:' + item);
      this.viewCtrl.dismiss(item);
  }

}
