import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { BuilderCloseIssue } from '../../pages/builder-close-issue/builder-close-issue';
import { BuilderIssuePosition } from '../../pages/builder-issue-position/builder-issue-position';
import { initBaseDB } from '../../providers/initBaseDB';
import { ShowimgPage } from '../../pages/imageeditor/showimg';
import { AssignreturnPage } from '../../pages/assignreturn/assignreturn';
import { NativeService } from '../../providers/nativeservice';
import { LocalStorage } from '../../providers/local-storage';
import { BuilderAssigning } from '../builder-assigning/builder-assigning';

@Component({
  selector: 'page-builder-issue-detail',
  templateUrl: 'builder-issue-detail.html',
})
export class BuilderIssueDetail {

  issueid: string;
  projid: string;
  projname: string;
  status = 'pending';
  status_name = '待整改';
  return_log: Array<any>;
  // return_log = [
  //   { return_person: '吴宁', return_date: '2017-06-17 18:49', return_message: '维修后仍然有缺陷' },
  //   { return_person: '肖振宇', return_date: '2017-06-19 08:25', return_message: '维修后仍然有缺陷' },
  //   { return_person: '吴宁', return_date: '2017-06-25 10:08', return_message: '维修后仍然有缺陷' }
  // ];
  userid: string;
  username: string;
  issue: any;
  registertime: string;
  duetime: string;
  assigntime: string;
  fixedtime: string = "";
  fixeddesc: string = "";
  images: Array<any>;
  imagesfixed: Array<any>;
  teammembers: Array<any>;
  userrole: Array<string> = [];
  vendid: string = '';
  descplus: string = '';
  issuelist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public initBaseDB: initBaseDB, public localStorage: LocalStorage, private modalCtrl: ModalController, public nativeservice: NativeService, public actionSheetCtrl: ActionSheetController) {
    this.issueid = navParams.get('Id');
    this.projid = navParams.get('projid');
    this.projname = navParams.get('projname');
    this.userid = navParams.get('userid');
    this.username = navParams.get('username');
    this.issue = navParams.get('issue');
    this.teammembers = []; this.teammembers = navParams.get('teammembers');
    this.userrole = navParams.get('userrole');
  }
 
  loadissueinfo() {
    this.images = []; this.imagesfixed = [];
    this.return_log = [];
    this.initBaseDB.getbuilderissueinfo(this.issueid, this.issue.type).then((v: any) => {
     console.log(v); console.log(v[1]);
      let val: any; val = v[0];
      this.issuelist = val.rows.item(0);
      console.log(JSON.stringify(val.rows.item(0)));
      this.descplus = this.issuelist.PlusDesc;
      if (this.descplus == 'undefined') {
        this.descplus = '';
      }
      this.vendid = this.issuelist.VendId;
      if (this.vendid == 'undefined') {
        this.vendid = '';
      }
      this.fixeddesc = this.issuelist.fixedDesc;
      if (this.fixeddesc == 'undefined') {
        this.fixeddesc = '';
      }
      let dt = new Date(this.issuelist.RegisterDate);
      this.registertime = this.initBaseDB.showdatetime(dt);// dt.toLocaleString();
      if (this.issuelist.LimitDate) {
        dt = new Date(this.issuelist.LimitDate)
        this.duetime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
      }

      if (this.issuelist.AppointDate) {
        dt = new Date(this.issuelist.AppointDate);
        this.assigntime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
      }

      if (this.issuelist.ReFormDate) {
        dt = new Date(this.issuelist.ReFormDate);
        this.fixedtime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
      }

      this.initimages();
      console.log("log:" + v[1]);
      let log: any; log = v[1];
      for (var i = 0; i < log.rows.length; i++) {
        console.log(JSON.stringify(log.rows.item(i)));
        dt = new Date(log.rows.item(i).LogDate);
        this.return_log.push({ return_person: log.rows.item(i).UserName, return_date: this.initBaseDB.showdatetime(dt), return_message: log.rows.item(i).ReturnReason })
      }
    })
  }

  ionViewDidLoad() {
    this.loadissueinfo();
  }
  //results.push({ reason: result, img: this.imagesafter,fixeddesc:this.fixeddesc });
  fixedclick() {
    const modal = this.modalCtrl.create(BuilderCloseIssue, {
      username: this.username, images: this.images, overdays: this.issue.overdays
    });
    modal.onDidDismiss((result: any) => {
      console.log(result);
      if (result) {
        console.log('if');
        if (result[0].img != null && result[0].img[0] != '')
          this.initBaseDB.updateFixedCompleteSingle(this.projid, this.issueid, result[0].img, result[0].fixeddesc, result[0].reason, this.username, this.userid).then(v => {
            if (this.issue.status == "待派单") {
              this.localStorage.setItem('builderissue', { issue: this.issue, status: '直接整改' }).then(v1 => {
                this.nativeservice.showToast('完成整改成功.');
                this.navCtrl.pop();
              })
            } else {
              this.localStorage.setItem('builderissue', { issue: this.issue, status: '整改' }).then(v1 => {
                this.nativeservice.showToast('完成整改成功.');
                this.navCtrl.pop();
              })
            }
          })
      }
    });
    modal.present();
  }

  assignchange() {
    console.log('assignchange');
    this.initBaseDB.getProjTeam(this.projid, [this.vendid]).then(v => {
      this.teammembers = v;
      const modal = this.modalCtrl.create(BuilderAssigning, {
        staff: this.teammembers
      });
      modal.onDidDismiss((result: any) => {
        console.log(result);
        if (result) {
          console.log('selected');
          this.assignto(result);
        }
      });
      modal.present();
      //this.presentActionSheet();
    })
  }

  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: '选择负责人',
  //     buttons: [{ text: '取消', role: 'cancel' }]
  //   });
  //   for (let s of this.teammembers) {
  //     actionSheet.addButton({ text: s.phone + ' ' + s.name, handler: () => { this.assignto(s); } });
  //   }
  //   // for (let s of this.staffs) {
  //   //   actionSheet.addButton({ text: s.id + ' ' + s.name, handler: () => { this.assignto(s); } });
  //   // }
  //   actionSheet.present();
  // }

  assignto(staff: any) {
    this.initBaseDB.updateResponsible(this.projid, "'" + this.issueid + "'", staff, this.username, this.userid).then(v => {
      if (this.issue.status == "待派单") {
        this.localStorage.setItem('builderissue', { issue: this.issue, status: '指派' }).then(v1 => {
          this.nativeservice.showToast('指派负责人成功.');
          this.navCtrl.pop();
        })
      } else {
        this.issue.ResponsibleName = staff.name;
        this.localStorage.setItem('builderissue', { issue: this.issue, status: '重派' }).then(v1 => {
          this.nativeservice.showToast('变更负责人成功.');
          this.navCtrl.pop();
        })
      }
    })
  }

  positionview() {
    this.navCtrl.push(BuilderIssuePosition, { "issueid": this.issueid, "type": this.issue.type });
  }

  returnassign() {
    const modal = this.modalCtrl.create(AssignreturnPage, {
    });
    modal.onDidDismiss(result => {
      if (result) {
        console.log(result);
        if (this.issue.status == "待派单") {
          this.initBaseDB.returnbuilderassign(this.projid, this.issueid, this.username, this.userid, result, this.issue.type).then(val => {
            this.nativeservice.showToast('退回成功.');
            this.navCtrl.pop();
          })
        } else {
          this.initBaseDB.returnassign(this.projid, this.issueid, this.username, this.userid, result, this.issue.type).then(val => {
            this.localStorage.setItem('builderissue', { issue: this.issue, status: '退回' }).then(v1 => {
              this.nativeservice.showToast('退回成功.');
              this.navCtrl.pop();
            })
          })
        }
      }
    });
    modal.present();
  }

  initimages(){
		this.images = [];
		if (this.issuelist.ImgBefore1) {
			this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgBefore1).then((v1: any) => {
				if (v1 && v1.rows && v1.rows.length > 0){
					this.images.push('data:image/jpeg;base64,' + v1.rows.item(0).src);
				}
				if (this.issuelist.ImgBefore2) {
					this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgBefore2).then((v2: any) => {
						if (v2 && v2.rows && v2.rows.length > 0){
							this.images.push('data:image/jpeg;base64,' + v2.rows.item(0).src);
						}
						if (this.issuelist.ImgBefore3) {
							this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgBefore3).then((v3: any) => {
								if (v3 && v3.rows && v3.rows.length > 0){
									this.images.push('data:image/jpeg;base64,' + v3.rows.item(0).src);
								}
							}).catch(err => {
								console.log('图片3加载失败' + err);
							})
						}
					}).catch(err => {
						console.log('图片2加载失败' + err);
					})
				}

			}).catch(err => {
				console.log('图片1加载失败' + err);
			})
		}
        this.imagesfixed = [];
		if (this.issuelist.ImgAfter1) {
			this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgAfter1).then((v1: any) => {
				if (v1 && v1.rows && v1.rows.length > 0){
				this.imagesfixed.push('data:image/jpeg;base64,' + v1.rows.item(0).src);
				}
				console.log('data:image/jpeg;base64,' + v1.rows.item(0).src);
				if (this.issuelist.ImgAfter2) {
					this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgAfter2).then((v2: any) => {
						if (v2 && v2.rows && v2.rows.length > 0){
						this.imagesfixed.push('data:image/jpeg;base64,' + v2.rows.item(0).src);
						}
						if (this.issuelist.ImgAfter3) {
							this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgAfter3).then((v3: any) => {
								if (v3 && v3.rows && v3.rows.length > 0){
								this.imagesfixed.push('data:image/jpeg;base64,' + v3.rows.item(0).src);
								}
							}).catch(err => {
								console.log('图片3加载失败' + err);
							})
						}
					}).catch(err => {
						console.log('图片2加载失败' + err);
					})
				}

			}).catch(err => {
				console.log('图片1加载失败' + err);
			})
		}
	}

  imgdownload(){
    this.initBaseDB.downloadissueimg(this.projid,this.issuelist,true).then(v=>{
      this.initimages();
    })
  }

  showBigImage(imagesrc, fixedflag: number = 0) {  //传递一个参数（图片的URl）
    let i = 0;
    console.log(fixedflag);
    if (fixedflag == 0) {
      this.images.forEach(element => {
        if (element == imagesrc) {
          console.log('ee');
          this.navCtrl.push(ShowimgPage, { imgdata: this.images, num: i });
        }
        i++;
      })
    } else {
      this.imagesfixed.forEach(element => {
        if (element == imagesrc) {
          console.log('ee');
          this.navCtrl.push(ShowimgPage, { imgdata: this.imagesfixed, num: i });
        }
        i++;
      })
    }
  };

}
