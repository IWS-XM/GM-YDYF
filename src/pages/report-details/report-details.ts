import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { initBaseDB } from '../../providers/initBaseDB';

@Component({
  selector: 'page-report-details',
  templateUrl: 'report-details.html',
})
export class ReportDetailsPage {

  data = [];
  title = '';
  status = '';
  projid = '';
  batchid = '';
  buildingid = '';
  type = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public initBaseDB: initBaseDB) {
    this.status = this.navParams.get('Status');
    this.projid = this.navParams.get('ProjId'); 
    this.batchid = this.navParams.get('BatchId');
    this.buildingid = this.navParams.get('BuildingId');
    this.type = this.navParams.get('Type');
    this.initBaseDB.reportDetails(this.projid,this.type,this.batchid,this.buildingid,this.status).then((val:any)=>{
      console.log(val);
       this.data = val;
       console.log(this.data);
    })
    if (this.status == '已整改') {
      this.title = "已整改房间-工程师待复验问题统计";      
      // this.data = [
      //   {name:'李小龙',toReview:89,roomCount:12}, 
      //   {name:'李小龙',toReview:89,roomCount:12}, 
      //   {name:'李小龙',toReview:89,roomCount:12}, 
      //   {name:'李小龙',toReview:89,roomCount:12}, 
      //   {name:'李小龙',toReview:89,roomCount:12}];
    } else {
      this.title = "待整改房间-承建商剩余工作量统计";
      // this.data = [
      //   { name: '柏事特', toDistribute: 0, toReform: 4, roomCount: 3 },
      //   { name: '八达建凤', toDistribute: 2, toReform: 0, roomCount: 12 }];
    }

  }

  ionViewDidLoad() {

  }

}
