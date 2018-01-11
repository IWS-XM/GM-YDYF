import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { initBaseDB } from '../../providers/initBaseDB';
import { MyTeamPage } from '../myteam/myteam';

@Component({
  selector: 'page-myteamvendor',
  templateUrl: 'myteamvendor.html'
})
export class MyTeamVendorPage {
  teams: Array<any> = [];
  userids: Array<string>;
  projid: string;
  userid: string = '';
  constructor(public navCtrl: NavController, public localStorage: LocalStorage, public initBaseDB: initBaseDB) {
    this.localStorage.getItem('curuser').then(v=>{
      this.userid = v.userid;
    })
  }

  ionViewDidEnter() {
    this.teams = []; this.userids = [];
    this.localStorage.getItem('curproj').then(val => {
      this.projid = val.projid;
      this.initBaseDB.getProjTeamVendors(this.projid).then(val => {
        if (val) {
          this.teams = val;
          //{ userid: v2.rows.item(i).UserId, name: v2.rows.item(i).Name, phone: v2.rows.item(i).Phone }
          // let items: Array<any>;
          // items = val;
          // items.forEach(element => {
          //   console.log(element); console.log(element.name);
          //   this.teams.push(element.name + "  /  " + element.managername);
          //   this.userids.push(element.phone);
          // });
        }
      })
    })
  }

  myteamclick(item:any){
    let ismanager = false;
    if (item.managerphone == this.userid){
      ismanager = true;
    }
    console.log(item);console.log(item.vendid);
    this.navCtrl.push(MyTeamPage,{"vendid":item.vendid,"ismanager":ismanager});
  }
}
