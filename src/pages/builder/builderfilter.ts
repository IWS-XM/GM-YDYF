import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { initBaseDB } from '../../providers/initBaseDB';

@Component({
  selector: 'page-builderfilter',
  templateUrl: 'builderfilter.html'
})
export class BuilderFilterPage {
  filters: Array<any> = [];
  userids: Array<string>;
  projid: string;
  userid: string = '';
  groupbystr:string = '';
  constructor(public navCtrl: NavController, public localStorage: LocalStorage, public initBaseDB: initBaseDB, 
    private viewCtrl: ViewController, public params: NavParams) {
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
