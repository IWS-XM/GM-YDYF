import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { initBaseDB } from '../../providers/initBaseDB';
import { TabsPage } from '../tabs/tabs';
import { NativeService } from '../../providers/nativeservice';
import { APP_SERVE_URL } from '../../providers/Constants';
import { HttpService } from '../../providers/HttpService';
import { BuilderTabsPage } from '../buildertabs/buildertabs';
import { ChangePWPage } from '../changepw/changepw';
//import { PreinspectionPage } from '../preinspection/preinspection';
//import { AboutPage } from '../about/about';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  imgheight: any;
  userid: string;
  password: string;
  //images:Array<any> = [];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public localStorage: LocalStorage, public initBaseDB: initBaseDB,
    public nativeservice: NativeService, private httpService: HttpService) {
    console.log("login start app");

    this.imgheight = window.innerHeight / 1.8;
    this.localStorage.getItem('curuser').then(val => {
      if (val && val.userid) {
        this.userid = val.userid;
        console.log(val.userid);
      }
    })

    // this.images.push("assets/img/login.jpg");
    // this.images.push("assets/img/login.jpg");
    // console.log(this.nativeservice.encode64("12345678902$123456csA10fdB1ewA20"));
    // console.log(this.nativeservice.base64decode(this.nativeservice.encode64("12345678902$123456csA10fdB1ewA20")));
    // let userrole = [];
    // let value:string = this.nativeservice.base64decode("MDE5OEJEOEE1QjIzNjhENTY2MTg1M0U1NjFGOTY3NzLmn6XnnIvpl67popg=");
    // console.log(value);
    //       value = value.replace("CB2DEE59DAD310B98B76330AA024E3CA",'');
    //       console.log(value);

    //       while(value.length > 0){
    //         userrole.push(value.substr(2,2));
    //         value = value.substr(4,value.length-4);            
    //       } 
    //       console.log(userrole);

    // let d=[];
    // d.push("'ui'");d.push("'ee'");d.push("'2e'");d.push("'12'");
    // console.log('(#x#)'.replace('#x#', d.join(',')));
    //this.userid = '12345678901'; this.password = "123456";
    // let elements = document.querySelectorAll(".tabbar");
    // if (elements != null) {
    //   Object.keys(elements).map((key) => {
    //     elements[key].style.display = 'none';
    //   });
    // }
  }

  loginclick() {
    //this.navCtrl.push(PreinspectionPage); 
    // let promise = new Promise((resolve) => {
    //   resolve(100);
    // });
    // promise.then((v1) => {
    //   console.log(v1);
    //   return 10;
    // }).then((v2) => {
    //   console.log(v2);
    //   throw '';
    // }).then((v3) => {   
    //   console.log("v3:"+v3);   
    //   return 12;
    // }).then((v4) => {
    //   console.log(v4);
    //   return 11
    // }).catch(e=>{
    //   console.log(e);
    // })
    // this.navCtrl.push(AboutPage);
    //this.navCtrl.push(ShowimgPage,{ imgdata: ["assets/img/b1f2-103.jpg","assets/img/login.jpg"], num:1 });
    // this.images = [];
    // this.images.push(imageName);
    // this.httpService.post(APP_SERVE_URL + '/AppLogin/AddUser',{Token:"AFC5FA4E2E2C4D7F62D8D9EA82DB9A39",ProjId: "6a397ed5-3923-47e4-8f5a-033920062c02", 
    //                      UserId: "13545678905", Name: "TestProjAccount1"}).then(res=>{
    //       alert(res[0].Result);  
    //       console.log(res[0]);
    // }).catch(e=>{
    //    alert(e);
    //    console.log(e);  
    // })   
    // this.test().then(e => {
    //   console.log("e");
    // })
    //this.initBaseDB.testupdate();
    //data:image/jpg;base64,
    //this.initBaseDB.downloadimg('0f2b58a05f491323efd14a43bc095511.jpg');

    //this.initBaseDB.testsql();
    // let d = []; var i = 0; i++;
    // console.log('dde'+i.toString());
    // d.push('test1');
    // d.push('test2');
    // d.push('');
    // d.push('test3');
    // d.push('test4');
    // console.log(d.join(','));
    // let x = [];
    // x.push("(#row#)".replace("#row#", d.join(',')));
    // console.log(x);

    // let records = [{"BatchId":"8cc9d555-5c96-4791-8d22-31750ec2314a","IssueId":"20171115030031","RoomId":"1f295a7d-0cee-4dcc-b355-ae2c3069d579","PositionId":"524d516f-49d6-4ea8-b252-59b44645e8f3","CheckItemId":"f9ddc52c-81d7-4e65-9e00-b143aa736010_d0ff7","PlusDesc":"","IssueDesc":"表面划伤、破损","UrgencyId":"一般","ImgBefore1":"c8ba308147f4e23f918ef29de87c0600.jpeg","ImgBefore2":"","ImgBefore3":"","ImgAfter1":"","ImgAfter2":"","ImgAfter3":"","ID":"00347920-f65f-4914-9e3d-9c1ab71402e7","IssueStatus":"已整改","VendId":"5d2b2f04-8e24-4a3c-85ba-180abd64638c","ResponVendId":"c3617701-5ee2-4627-86de-29e24f725e19","ProjId":"d0ff76c0-0d9d-45f6-b16a-f9515ab7056c","Manager":"ca24386a-fb50-42be-8bdb-6cb745cdfbf6","ResponsibleId":"e0e6df26-1745-41b9-9df7-50fe63cacc99","IssueType":"","RegisterDate":"2017-11-15T10:33:42+08:00","AppointDate":"2017-11-16T10:52:32+08:00","LimitDate":"2017-11-20T23:59:59+08:00","ReFormDate":"2017-12-20T13:44:52+08:00","CloseDate":null,"CloseReason":"","CancelDate":null,"CancelReason":"","VersionId":161,"ImgClose1":"","ImgClose2":"","ImgClose3":"","ReturnDate":null,"ReturnReason":"","ReturnNum":0,"BuildingId":"2d7eaa62-2416-47bb-8bf0-ca303b4c5e4c","EngineerId":"750cb44e-efd7-4d62-8861-3379d03c09f4","ReviewDate":null,"X":280,"Y":637,"ResponsibleName":"李鑫荣","ResponsiblePhone":"13052275608","EngineerName":"孔玮刚","EngineerPhone":"13816751323","ManagerName":"杨福泉","ManagerPhone":"15959370046","ReassignDate":null,"ReassignDesc":"","ReasonbyOver":"#overreason#","FixedDesc":"undefined"},{"BatchId":"8cc9d555-5c96-4791-8d22-31750ec2314a","IssueId":"20171115030014","RoomId":"2536bd8e-fef4-4d85-9e2c-6212d6e7c0ec","PositionId":"41856665-caee-49df-a611-bf8d0c761e13","CheckItemId":"650d1329-ef1f-45c8-95f6-402259c0ad79_d0ff7","PlusDesc":"","IssueDesc":"不平整,有色差","UrgencyId":"一般","ImgBefore1":"e1cf6a6470126612f1e9867e62a9cc12.jpeg","ImgBefore2":"57ca2e69ab75728a30bbaf2b383f49d2.jpeg","ImgBefore3":"07845c5430e0b121c272bd97a9237a80.jpeg","ImgAfter1":"","ImgAfter2":"","ImgAfter3":"","ID":"00df0713-c784-4419-bdb2-deb982d67516","IssueStatus":"已整改","VendId":"5d2b2f04-8e24-4a3c-85ba-180abd64638c","ResponVendId":"c3617701-5ee2-4627-86de-29e24f725e19","ProjId":"d0ff76c0-0d9d-45f6-b16a-f9515ab7056c","Manager":"ca24386a-fb50-42be-8bdb-6cb745cdfbf6","ResponsibleId":"e0e6df26-1745-41b9-9df7-50fe63cacc99","IssueType":"","RegisterDate":"2017-11-15T10:03:44+08:00","AppointDate":"2017-11-16T10:52:32+08:00","LimitDate":"2017-11-18T23:59:59+08:00","ReFormDate":"2017-12-20T14:42:28+08:00","CloseDate":null,"CloseReason":"","CancelDate":null,"CancelReason":"","VersionId":161,"ImgClose1":"","ImgClose2":"","ImgClose3":"","ReturnDate":null,"ReturnReason":"","ReturnNum":0,"BuildingId":"2d7eaa62-2416-47bb-8bf0-ca303b4c5e4c","EngineerId":"316f887b-fdd7-45b7-97a6-83e5b7f5c7dd","ReviewDate":null,"X":653,"Y":595,"ResponsibleName":"李鑫荣","ResponsiblePhone":"13052275608","EngineerName":"陆小鹏","EngineerPhone":"13773866727","ManagerName":"杨福泉","ManagerPhone":"15959370046","ReassignDate":null,"ReassignDesc":"","ReasonbyOver":"#overreason#","FixedDesc":"undefined"}];
    // console.log(records);
    // console.log(records.length);
    // let sj = JSON.stringify(records);
    // console.log(sj.substr(3,1));
    // //console.log(JSON.stringify(records));
    // let tmpjs = [];
    // for (var i = 0; i < records.length; i++) {
    //    //console.log(records[i]);
    //    tmpjs.push({BatchId:records[i].BatchId,IssueId:records[i].IssueId,RoomId:records[i].RoomId,PositionId:records[i].PositionId,CheckItemId:records[i].CheckItemId,PlusDesc:records[i].PlusDesc,
    //   IssueDesc:records[i].IssueDesc,UrgencyId:records[i].UrgencyId,ImgBefore1:records[i].ImgBefore1,ImgBefore2:records[i].ImgBefore2,ImgBefore3:records[i].ImgBefore3,ImgAfter1:records[i].ImgAfter1,
    //   ImgAfter2:records[i].ImgAfter2,ImgAfter3:records[i].ImgAfter3,ID:records[i].ID,IssueStatus:records[i].IssueStatus,VendId:records[i].VendId,ResponVendId:records[i].ResponVendId,ProjId:records[i].ProjId,
    //   Manager:records[i].Manager,ResponsibleId:records[i].ResponsibleId,IssueType:records[i].IssueType,RegisterDate:records[i].RegisterDate,AppointDate:records[i].AppointDate,LimitDate:records[i].LimitDate,
    //   ReFormDate:records[i].ReFormDate,CloseDate:records[i].CloseDate,CloseReason:records[i].CloseReason,CancelDate:records[i].CancelDate,CancelReason:records[i].CancelReason,
    //   VersionId:records[i].VersionId,ImgClose1:records[i].ImgClose1,ImgClose2:records[i].ImgClose2,ImgClose3:records[i].ImgClose3,ReturnDate:records[i].ReturnDate,ReturnReason:records[i].ReturnReason,
    //   ReturnNum:records[i].ReturnNum,BuildingId:records[i].BuildingId,EngineerId:records[i].EngineerId,ReviewDate:records[i].ReviewDate,X:records[i].X,Y:records[i].Y,ResponsibleName:records[i].ResponsibleName,
    //   ResponsiblePhone:records[i].ResponsiblePhone,EngineerName:records[i].EngineerName,EngineerPhone:records[i].EngineerPhone,ManagerName:records[i].ManagerName,ManagerPhone:records[i].ManagerPhone,
    //   ReassignDate:records[i].ReassignDate,ReassignDesc:records[i].ReassignDesc,ReasonbyOver:records[i].ReasonbyOver,FixedDesc:records[i].FixedDesc});
    // }
    // console.log(tmpjs);
    // console.log(JSON.stringify(tmpjs));
    this.nativeservice.isConnecting().then((val: boolean) => {
      if (val == false) {
        throw '无网络登陆失败';
      } else {
        this.nativeservice.showLoading('加载中,请稍后...');
        this.httpService.get(APP_SERVE_URL + '/AppLogin', { userAct: this.userid, password: this.nativeservice.encode64(this.userid + "$" + this.password) }).then(res => {
          console.log(res[0]);
          this.initData(res[0]).then(v => {
            this.nativeservice.hideLoading();
          })
        }).catch(e => {
          this.nativeservice.hideLoading();
          console.log(e);
        })
      }
    })
  }


  initData(items): Promise<any> {
    return new Promise((resolve) => {
      let item = items[1];
      let userrole = [];
      let userrolestr: string = items[3][0];
      console.log(userrolestr);
      //if (item.VendRole == false) {
      let value: string = this.nativeservice.base64decode(userrolestr);
      if (value != '') {
        value = value.replace(item.Token, '');
        let tmpvalue: string;
        while (value.length > 0) {
          userrole.push(value.substr(2, 2));
          value = value.substr(4, value.length - 4);
        }
        console.log(userrole);
      }
      //}
      let promise = new Promise((resolve) => {
        resolve(100);
      });
      // userrole = ["A1","A2","A3","A4","A5","A6","A7","B1","C1"];
      resolve(promise.then((v1) => {
        return this.localStorage.setItem('curuser', { userid: this.userid, token: item.Token, duetime: item.AllowEnd, username: item.UserName, vendrole: item.VendRole, id: item.UserId, userrole: userrole });
      }).then((v2) => {
        return this.initBaseDB.initdb(this.userid + ".db", false);
      }).then((v3) => {
        if (item.VendRole == false && userrole.indexOf('A1') == -1) {
          return this.nativeservice.alert("没有APP授权，请联系管理员.").then(v => {
            return "no proj";
          }).catch(e => {
            return "no proj";
          })
        } else {
          return this.initBaseDB.initProjVersion(item.Token, item.VendRole);
        }
      }).then((v4) => {
        console.log(v4);
        // if (v4 == "no proj") {
        this.nativeservice.hideLoading();
        if (item.VendRole == true) {
          if (item.First == true) {
            this.navCtrl.push(ChangePWPage, { "first": item.first });
          } else {
            console.log(item.First);
            this.navCtrl.push(BuilderTabsPage);
          }
        } else {
          if (item.First == true && userrole.indexOf('B1') != -1) {
            this.navCtrl.push(ChangePWPage, { "first": item.first });
          } else {
            this.navCtrl.push(TabsPage);
          }
        }
        return 10;
        // } else {
        //   if (item.VendRole == true) {
        //     return this.initBaseDB.downloadbuilderdata(item.Token, v4).then(v => {
        //       this.nativeservice.hideLoading();
        //       if (item.First == true) {
        //         this.navCtrl.push(ChangePWPage, { "first": item.first });
        //       } else {
        //         console.log(item.First);
        //         this.navCtrl.push(BuilderTabsPage);
        //       }
        //     })
        //   } else {
        //     return this.initBaseDB.initbuildingversion(item.Token, v4).then(v => {
        //       this.nativeservice.hideLoading();
        //       if (item.First == true) {
        //         this.navCtrl.push(ChangePWPage, { "first": item.first });
        //       } else {
        //         this.navCtrl.push(TabsPage);
        //       }
        //     })
        //   }
        // }
      }).catch(err => {
        console.log(err);
        this.nativeservice.hideLoading();
        // return this.localStorage.setItem('curuser', { userid: 'admin', duetime: 1498121315683, token: "ejofwijfeoiwfjewi", username: 'adminname' }).then(v => {
        //   this.navCtrl.push(TabsPage);
        // })
      }))
      // }
      // else {
      //   let promise = new Promise((resolve) => {
      //     resolve(100);
      //   });
      //   resolve(promise.then((v1) => {
      //     return this.localStorage.setItem('curuser', { userid: this.userid, token: item.Token, duetime: item.AllowEnd, username: item.UserName, vendrole: item.vendrole });
      //   }).then((v2) => {
      //     return this.initBaseDB.initdb(this.userid + ".db", false);
      //   }).then((v3) => {
      //     return this.initBaseDB.initProjVersion(item.Token);
      //   }).then((v4) => {
      //     return this.navCtrl.push(BuilderTabsPage);
      //   }).catch(err => {
      //   console.log(err);
      //   return this.localStorage.setItem('curuser', { userid: 'admin', duetime: 1498121315683, token: "ejofwijfeoiwfjewi", username: 'adminname' }).then(v => {
      //     this.navCtrl.push(BuilderTabsPage);
      //   })
      // }))
      // }
    })
  }


}
