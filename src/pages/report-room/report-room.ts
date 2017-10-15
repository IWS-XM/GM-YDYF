import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';
import { initBaseDB } from '../../providers/initBaseDB';

@Component({
  selector: 'page-report-room',
  templateUrl: 'report-room.html',
})
export class ReportRoomPage {
  @ViewChild('chartPie') chartPie: ElementRef;
  colors =  ["#CCCCCC", "#FF6384", "#36A2EB", "#FFCE56", "#3030FF"];
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public initBaseDB: initBaseDB) {    
    this.reportType=navParams.get('ReportType');
    this.projid = navParams.get('PorjId');
  }

  fetchdata() {
    this.initBaseDB.reportFJZTFB(this.projid,Number.parseInt(this.reportType)).then((val:any)=>{
      this.data = val[0];
      this.config.data.datasets[0].data.length = 0;
      this.config.data.labels.length = 0;
      this.valuesum = val[1];
      //this.data.forEach(e=> this.valuesum+= e.value );
      this.data.forEach(element => {
        this.config.data.datasets[0].data.push(element.value);
        this.config.data.labels.push(element.name ) ;
      });  
      new Chart(this.chartPie.nativeElement.getContext("2d"), this.config);
   })
  //  this.data = [
  //    { name: '待检查', value: 932 },
  //    { name: '待整改', value: 726 },
  //    { name: '已整改', value: 321 },
  //    { name: '已通过', value: 530 }];
  }

  ionViewDidLoad() {    
    this.fetchdata();
  }

  changetab() {
    console.log(this.reportType);
    this.fetchdata();
  }
}
