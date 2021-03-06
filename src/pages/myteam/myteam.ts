import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { NativeService } from '../../providers/nativeservice';
import { AddteammemberPage } from '../addteammember/addteammember';
import { ActionSheetController } from 'ionic-angular'
import { AddmembermanualPage } from '../addmembermanual/addmembermanual';
import { AddphonecontactsPage } from '../addphonecontacts/addphonecontacts';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { initBaseDB } from '../../providers/initBaseDB';

@Component({
  selector: 'page-myteam',
  templateUrl: 'myteam.html'
})
export class MyTeamPage {
  teams: Array<string>;
  userids: Array<string>;
  projid: string;
  iosdevice: boolean = false;
  ismanager: boolean = false;
  vendid : string = '';
  constructor(public navCtrl: NavController, public localStorage: LocalStorage, public nativeservice: NativeService, public actionSheetCtrl: ActionSheetController,
    public initBaseDB: initBaseDB, public params: NavParams, private contacts: Contacts) {
    this.iosdevice = this.nativeservice.isIos();
    this.vendid = this.params.get('vendid');
    this.ismanager = this.params.get('ismanager');
  }

  ionViewDidEnter() {
    this.teams = []; this.userids = [];
    this.localStorage.getItem('curproj').then(val => {
      this.projid = val.projid;
      this.initBaseDB.getProjTeam(this.projid,[this.vendid]).then(val => {
        if (val) {
          //{ userid: v2.rows.item(i).UserId, name: v2.rows.item(i).Name, phone: v2.rows.item(i).Phone }
          let items: Array<any>;
          items = val;
          items.forEach(element => {
            console.log(element); console.log(element.name);
            this.teams.push(element.name + "    " + element.phone);
            this.userids.push(element.phone);
          });
        }
      })
    })
  }


  addclick() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择添加方式',
      buttons: [
        {
          text: '添加手机联系人',
          //role: 'destructive',
          handler: () => {
            this.getcontacts();
            //this.navCtrl.push(AddphonecontactsPage);
          }
        },
        {
          text: '添加新成员',
          handler: () => {
            this.navCtrl.push(AddmembermanualPage, { "projid": this.projid, "vendid": this.vendid });
          }
        },
        {
          text: '取消',
          //role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  getcontacts() {
    console.log('test');
    let contacts: Array<any>;
    let options: any;
    options = { filter: "", multiple: true }; this.nativeservice.showLoading("加载中,请稍侯...");
    this.contacts.find(["displayName"], options).then(val => {
      let items: Array<any>;
      items = val;
      contacts = [];
      items.forEach(contact => {
        if (contact) {
          console.log(JSON.stringify(contact));
          console.log(contact.displayName);
          let name: string = "";
          if (this.iosdevice) {
            name = contact.name.formatted;
          } else {
            name = contact.displayName;
          }
          if (contact.phoneNumbers) {
            let phones: Array<any>;
            phones = contact.phoneNumbers;
            console.log('phones:' + phones);
            if ((phones[0].type == "mobile" || this.iosdevice == true) && phones[0].value != 'null' && phones[0].values != '') {
              console.log(phones[0].value);
              let phonenum: string = phones[0].value;
              if (phonenum.substr(0, 1) == "1") {
                phonenum = phonenum.replace('-', '').replace('-', '').replace('+86', '').replace(' ','').replace(' ','');
                let pn = 0; pn = parseInt(phonenum);
                let pnstr = ''; pnstr = pn.toString();
                if (pnstr == phonenum && pnstr.length == 11){
                  if (this.userids.indexOf(phones[0].value) == -1)
                     contacts.push({ name: name, phone: pnstr, added: false, btnname: "添加" });
                  else
                     contacts.push({ name: name, phone: pnstr, added: true, btnname: "已添加" });
                }      
              }
            }
          }
        }
      });
      this.nativeservice.hideLoading();
      this.navCtrl.push(AddphonecontactsPage, { "projid": this.projid, "items": contacts, "vendid":this.vendid });
    }).catch(e => {
      console.log(e);
      this.nativeservice.hideLoading();
    })
  }
}
