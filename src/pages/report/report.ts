import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReportRoomPage } from '../report-room/report-room';
import { NativeService } from '../../providers/nativeservice';
import { initBaseDB } from '../../providers/initBaseDB';

@Component({
  selector: 'page-reporrt',
  templateUrl: 'report.html'
})
export class ReportPage  {
  @ViewChild('charDoughnut') charDoughnut: ElementRef;

  ZGMCL= 0.00;
  HJQXL= 0.00;
  SLFSL= 0.00;
  HJSLFSL= 0.00;

  reportType = "1";
  projid = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeservice: NativeService, public initBaseDB: initBaseDB) {
    this.projid = navParams.get('ProjId');
    var t = navParams.get('ReportType');
    if(t) this.reportType=t;
  }

  ionViewDidEnter() {
    //TODO: 此处需要加入获取数据有代码
    this.initBaseDB.reportZGTGL(this.projid).then(val=>{
      console.log(val);
      this.ZGMCL = val;
      var cvs = this.charDoughnut.nativeElement;
      var ctx = this.charDoughnut.nativeElement.getContext("2d");
  
      var x = cvs.width / 2;
      var y = cvs.height / 2;
      var r = cvs.height / 2 - 40;
      var p0 = (0 - .5) * Math.PI;
  
      ctx.beginPath();
      ctx.lineWidth = 36;
      ctx.strokeStyle = "gray";
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = "Lime";
      ctx.lineWidth = 34;
      ctx.arc(x, y, r, p0, ((2 * this.ZGMCL / 100 ) - 0.5) * Math.PI);
      ctx.stroke();
      ctx.closePath();
  
      ctx.font = "bolder 26px arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline="middle";
      ctx.fillText(this.ZGMCL + "%", x+4, y);
    })
    this.initBaseDB.reportHJSLFSL(this.projid).then(val=>{
      this.HJSLFSL = val;
    })
    this.initBaseDB.reportSLFSL(this.projid).then(val=>{
      this.SLFSL = val;
    })
    this.initBaseDB.reportHJQXL(this.projid).then(val=>{
      this.HJQXL = val;
    })
    //this.ZGMCL = this.params.get('ZGMCL');
    //this.HJQXL = this.params.get('');
    //this.SLFCL = this.params.get('');
    //this.HJSLFCL = this.params.get('');
    
  }

  ReportRoom(){
    this.navCtrl.push(ReportRoomPage,{ProjId: this.projid, ReportType: this.reportType});
  }

  ShowHelp(){
    this.nativeservice.alert("整改完成率=已通过问题数／问题总数*100%； 户均缺陷率=问题总数／房间总数； 渗漏发生率=渗漏房间数／房间总数*100%； 户均渗漏发生率=渗漏问题数／房间总数。");
  }

}
