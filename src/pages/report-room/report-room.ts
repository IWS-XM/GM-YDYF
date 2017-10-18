import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';
import { initBaseDB } from '../../providers/initBaseDB';
import { ReportPage } from '../report/report';
import { ReportDetailsPage } from '../report-details/report-details';

@Component({
  selector: 'page-report-room',
  templateUrl: 'report-room.html',
})
export class ReportRoomPage {
  @ViewChild('chartPie') chartPie: ElementRef;
  colors = ["#CCCCCC", "#FF6384", "#36A2EB", "#FFCE56", "#3030FF"];
  config = {
    type: 'pie',
    data: {
      datasets: [{
        data: [],
        backgroundColor: this.colors,
        label: 'Dataset 1'
      }],
      labels: []
    },
    options: {
      responsive: true,
      legend: {
        display: false
      }

    }
  };

  data = [];
  valuesum = 0;
  reportType = "1";
  projid = '';
  projname = '';
  statuses = [];
  chartdata = [];
  datasource = [];
  reportlevel = 0;
  detailTitle = '';
  reportTitle = '';
  reporttypestr = '';
  calleritem:Array<any>;
  batchid = '';
  buildingid = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public initBaseDB: initBaseDB) {
    this.reportType = navParams.get('ReportType');
    this.projid = navParams.get('PorjId');
    this.reportlevel = this.navParams.get('ReportLevel');
    this.statuses = ['待检查', '待整改', '已整改', '已通过'];
    this.projname = navParams.get('ProjName');
    this.calleritem = [];
    if (this.reportType == '1')
       this.reporttypestr = '内部验房';
    else if (this.reportType == '2')
       this.reporttypestr = '工地开放';
    else if (this.reportType == '3')
       this.reporttypestr = '正式交付';
  }

  fetchdata() {
    // this.initBaseDB.reportFJZTFB(this.projid, Number.parseInt(this.reportType)).then((val: any) => {
    //   this.data = val[0];
    //   this.config.data.datasets[0].data.length = 0;
    //   this.config.data.labels.length = 0;
    //   this.valuesum = val[1];
    //   //this.data.forEach(e=> this.valuesum+= e.value );
    //   this.data.forEach(element => {
    //     this.config.data.datasets[0].data.push(element.value);
    //     this.config.data.labels.push(element.name);
    //   });
      
    // })
    switch (this.reportlevel) {
      case 0:
        //首层报表
        this.initBaseDB.reportFJZTFB(this.projid, Number.parseInt(this.reportType)).then((val: any) => {
           this.chartdata = val;
           this.valuesum = 0;
           if (this.chartdata != null) this.chartdata.forEach(e => this.valuesum += e);
        })
        this.initBaseDB.reportFJZTFBPC(this.projid, Number.parseInt(this.reportType)).then((val: any) => {
           this.datasource = val;
        })
        this.detailTitle = this.projname + '-' + this.reporttypestr + '批次统计';
        this.buildingid = '';
        this.batchid = '';
        break;
      case 1:
        this.calleritem = this.navParams.get('Item');
        //按批次统计的报表
        this.chartdata = this.calleritem[0].issues;
        this.valuesum = 0;
        if (this.chartdata != null) this.chartdata.forEach(e => this.valuesum += e);
        this.initBaseDB.reportFJZTFBLD(this.projid, Number.parseInt(this.reportType), this.calleritem[0].id).then((val:any)=>{
          this.datasource = val;
        })
        this.reportTitle = this.projname + '/' + this.calleritem[0].dataname;
        this.detailTitle = this.calleritem[0].dataname + '楼栋统计';
        this.batchid = this.calleritem[0].id;
        this.buildingid = '';
        break;
      case 2:        
        this.calleritem = this.navParams.get('Item');
        //按楼统计的报表
        this.chartdata = this.calleritem[0].issues;
        this.valuesum = 0;
        if (this.chartdata != null) this.chartdata.forEach(e => this.valuesum += e);
        this.reportTitle = this.projname + '/' + this.navParams.get('BatchName') + '/' + this.calleritem[0].dataname;
        this.batchid = this.navParams.get('BatchId');
        this.buildingid = this.calleritem[0].id;
        break;
      default:
        alert('ReportLevel必须是数字0~2');
        return;
      //break;
    }
    
    //  this.data = [
    //    { name: '待检查', value: 932 },
    //    { name: '待整改', value: 726 },
    //    { name: '已整改', value: 321 },
    //    { name: '已通过', value: 530 }];
  }

  ionViewDidLoad() {
    this.config.data.datasets[0].data = this.chartdata;
    this.config.data.labels = this.statuses;
    this.fetchdata();
    
    new Chart(this.chartPie.nativeElement.getContext("2d"), this.config);
  }

  changetab() {
    console.log(this.reportType);
    this.fetchdata();
  }

  DetailReport(item, batchName) {
    this.navCtrl.push(ReportRoomPage, {
      ReportLevel: this.reportlevel + 1, ProjectName: this.projname, ProjId: this.projid,
      ReportType: this.reportType, Item: item, BatchName: batchName, BatchId: this.batchid
    })
  }

  ShowReportDetail(status) {
    this.navCtrl.push(ReportDetailsPage, { Status: status, Type: Number.parseInt(this.reportType), ProjId: this.projid, BatchId:this.batchid, BuildingId:this.buildingid });
  }
}
