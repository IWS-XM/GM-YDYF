import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { initBaseDB } from '../../providers/initBaseDB';
import { ShowimgPage } from '../../pages/imageeditor/showimg';
import { IssuereturnPage } from '../../pages/issuereturn/issuereturn';
import { IssueclosedPage } from '../../pages/issueclosed/issueclosed';

@Component({
	selector: 'page-issueview',
	templateUrl: 'issueview.html'
})
export class IssueviewPage {
	roomname: string;
	position: string;
	checkitem: string;
	itdesc: string;
	descplus: string;
	uglevel: string;
	vend: string;
	resunit: string;
	images: Array<string>;
	imagesfixed: Array<string>;
	imagesadd: Array<string> = [];
	registertime: string;
	duetime: string;
	fixtime: string;
	hidden: boolean;
	// arrow: string;
	issueid: string;
	roomid: string;
	status: string;
	mousestouch: Array<any>;
	buildingname: string;
	projid: string;
	batchid: string;
	buildingid: string;
	userid: string;
	username: string;
	type: number;
	showbutton: boolean;
	versionid: number;
	ResponsibleId: string;
	userrole: Array<string> = [];
	closedreason: string = '';
	imagesclosed: Array<string> = [];
	closedtime: string = '';
    issuelist: any;
	constructor(public localStorage: LocalStorage, public initBaseDB: initBaseDB, public navCtrl: NavController, public alertCtrl: AlertController,
		public params: NavParams, private modalCtrl: ModalController) {
		this.issueid = this.params.get('issueid');
		this.projid = this.params.get('projid');
		this.buildingname = this.params.get('buildingname');
		this.roomid = this.params.get('roomid');
		//this.position = this.params.get('section');
		this.roomname = this.params.get('roomname');
		this.batchid = this.params.get('batchid');
		this.buildingid = this.params.get('buildingid');
		this.type = this.params.get('type');
		this.images = [];
		this.imagesfixed = [];
		this.hidden = true;
		// this.arrow = "∨";
		this.mousestouch = [];
		this.showbutton = false;
		this.initBaseDB.getissueinfo(this.issueid, this.type).then((val: any) => {
			
			this.issuelist = val.rows.item(0);
			console.log(JSON.stringify(val.rows.item(0)));
			this.position = this.issuelist.Position;
			this.checkitem = this.issuelist.Checkitem;
			this.itdesc = this.issuelist.IssueDesc;
			this.descplus = this.issuelist.PlusDesc;
			this.uglevel = this.issuelist.UrgencyId;
			this.vend = this.issuelist.Vendor;
			this.resunit = this.issuelist.Resunit;
			console.log(this.issuelist.RegisterDate);
			let dt = new Date(this.issuelist.RegisterDate);
			this.registertime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
			console.log(this.registertime);
			if (this.issuelist.LimitDate) {
				dt = new Date(this.issuelist.LimitDate)
				this.duetime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
			}

			if (this.issuelist.ReFormDate) {
				dt = new Date(this.issuelist.ReFormDate);
				this.fixtime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
			}

			this.status = this.issuelist.IssueStatus;
			this.versionid = this.issuelist.VersionId;
			this.ResponsibleId = this.issuelist.ResponsibleId;
			this.closedreason = this.issuelist.CloseReason;
			if (this.issuelist.CloseDate) {
				dt = new Date(this.issuelist.CloseDate);
				this.closedtime = this.initBaseDB.showdatetime(dt);//dt.toLocaleString();
			}
			
			if (this.status == '待派单' || this.status == '待整改' || this.status == '已整改') {
				this.showbutton = true;
			} 
			this.initimages();

			if (this.status == '非正常关闭') {
				if (this.issuelist.ImgClose1) {
					this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgClose1).then((v1: any) => {
						this.imagesclosed.push('data:image/jpeg;base64,' + v1.rows.item(0).src);
						console.log('data:image/jpeg;base64,' + v1.rows.item(0).src);
						if (this.issuelist.ImgClose2) {
							this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgClose3).then((v2: any) => {
								this.imagesclosed.push('data:image/jpeg;base64,' + v2.rows.item(0).src);
								if (this.issuelist.ImgClose3) {
									this.initBaseDB.getimagedata(this.projid, this.issuelist.ImgClose3).then((v3: any) => {
										this.imagesclosed.push('data:image/jpeg;base64,' + v3.rows.item(0).src);
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
		})
		//var now = new Date();
		//this.registertime=now.toLocaleDateString()+"  "+now.toLocaleTimeString();		
		this.localStorage.getItem('curuser').then(val => {
			this.userid = val.userid; this.username = val.username;
			this.userrole = val.userrole;
		})
	}

	plusinfo() {
		// document.getElementById("plusinfo").hidden = !document.getElementById("plusinfo").hidden;
		// if (document.getElementById("plusinfo").hidden)
		// 	this.arrow = "∨";
		// else
		// 	this.arrow = "∧";
	}

	ionViewWillEnter() {

	}

	passclick() {
		let tablename = this.initBaseDB.getissuetablename(this.type);
		let upltablename = this.initBaseDB.getuplissuetablename(this.type);
		let now = new Date();
		let curtime: string = now.toLocaleDateString() + " " + now.getHours().toString() + ":" + now.getMinutes() + ":" + now.getSeconds();

		if (this.versionid == 0) {
			let sql = "update #tablename# set IssueStatus = '已通过', ReviewDate = '" + curtime + "', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#'";
			sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#username#', this.username);
			this.initBaseDB.updateIssue([sql]).then(v => {
				this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type).then(v => {
					this.navCtrl.pop();
				})
			}).catch(err => {
				console.log('通过失败:' + err);
			})
		} else {
			let sql = "update #tablename# set IssueStatus = '已通过', ReviewDate = '" + curtime + "', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#' ";
			sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#username#', this.username);
			let uplsql = "select id from #upltablename# where id = '" + this.issueid + "'";
			uplsql = uplsql.replace('#upltablename#', upltablename);
			let promise = new Promise((resolve) => {
				resolve(100);
			});

			promise.then(v1 => {
				return this.initBaseDB.currentdb().executeSql(uplsql, []);
			}).then((val: any) => {
				let sqls = [];
				sqls.push(sql);
				if (val && val.rows.length > 0) {
					sql = "update #upltablename# set IssueStatus = '已通过', ReviewDate = '" + curtime + "', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#' ";
					sql = sql.replace('#upltablename#', upltablename).replace('#userid#', this.userid).replace('#issueid#', this.issueid).replace('#username#', this.username);
				} else {
					sql = "insert into #upltablename# (Id,BatchId,RoomId,ProjId,VersionId,BuildingId,IssueStatus,EngineerPhone,EngineerName,ReviewDate) values (#values#)";
					let value = [];
					value.push("'" + this.issueid + "'");
					value.push("'" + this.batchid + "'");
					value.push("'" + this.roomid + "'");
					value.push("'" + this.projid + "'");
					value.push(this.versionid);
					value.push("'" + this.buildingid + "'");
					value.push("'已通过'");
					value.push("'" + this.userid + "'");
					value.push("'" + this.username + "'");
					value.push("'" + curtime + "'");
					sql = sql.replace('#upltablename#', upltablename).replace('#values#', value.join(','));
				}
				sqls.push(sql);
				return this.initBaseDB.updateIssue(sqls);
			}).then(v => {
				return this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type);
			}).then(v => {
				this.navCtrl.pop();
			}).catch(err => {
				console.log('通过失败:' + err);
			})
		}
	}

	rejectclick() {
		let tablename = this.initBaseDB.getissuetablename(this.type);
		let upltablename = this.initBaseDB.getuplissuetablename(this.type);
		const modal = this.modalCtrl.create(IssuereturnPage, {
		});
		modal.onDidDismiss(result => {
			if (result) {console.log('return result:'+result);
				let now = new Date();
				let curtime: string = now.toLocaleDateString() + " " + now.getHours().toString() + ":" + now.getMinutes() + ":" + now.getSeconds();

				let status: string;
				if (this.ResponsibleId === '' || this.ResponsibleId === 'null') {
					status = '待派单';
				} else {
					status = '待整改';
				}
				if (this.versionid == 0) {
					let sql = "update #tablename# set IssueStatus = '#status#', ReturnDate = '" + curtime + "',ReturnReason = '#ReturnReason#', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '',ReturnNum = ReturnNum+1 where Id = '#issueid#'";
					sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#status#', status).replace('#ReturnReason#', result).replace('#username#', this.username);
					console.log(sql);
					this.initBaseDB.updateIssue([sql]).then(v => {
						console.log(sql);
						this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type).then(v => {
							this.navCtrl.pop();
						})
					}).catch(err => {
						console.log('退回失败:' + err);
					})
				} else {
					let sql = "update #tablename# set IssueStatus = '#status#', ReturnDate = '" + curtime + "', ReturnReason = '#ReturnReason#',EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '',ReturnNum = ReturnNum+1 where Id = '#issueid#' ";
					sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#status#', status).replace('#ReturnReason#', result).replace('#username#', this.username);
					let uplsql = "select id from #upltablename# where id = '" + this.issueid + "'";
					uplsql = uplsql.replace("#upltablename#", upltablename);

					let promise = new Promise((resolve) => {
						resolve(100);
					});
					console.log(uplsql);
					promise.then(v1 => {
						return this.initBaseDB.currentdb().executeSql(uplsql, []);
					}).then((val: any) => {
						let sqls = [];
						sqls.push(sql);
						if (val && val.rows.length > 0) {
							sql = "update #upltablename# set IssueStatus = '#status#', ReturnDate = '" + curtime + "', ReturnReason = '#ReturnReason#', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#' ";
							sql = sql.replace("#upltablename#", upltablename).replace('#userid#', this.userid).replace('#issueid#', this.issueid).replace('#status#', status).replace('#ReturnReason#', result).replace('#username#', this.username);
						} else {
							sql = "insert into #upltablename# (Id,BatchId,RoomId,ProjId,VersionId,BuildingId,IssueStatus,EngineerPhone,EngineerName,ReturnDate,ReturnReason) values (#values#)";
							let value = [];
							value.push("'" + this.issueid + "'");
							value.push("'" + this.batchid + "'");
							value.push("'" + this.roomid + "'");
							value.push("'" + this.projid + "'");
							value.push(this.versionid);
							value.push("'" + this.buildingid + "'");
							value.push("'" + status + "'");
							value.push("'" + this.userid + "'");
							value.push("'" + this.username + "'");
							value.push("'" + curtime + "'");
							value.push("'" + result + "'");
							sql = sql.replace("#upltablename#", upltablename).replace('#values#', value.join(','));
						}
						sqls.push(sql);
						console.log("reject:" + sqls);
						return this.initBaseDB.updateIssue(sqls);
					}).then(v => {
						return this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type);
					}).then(v => {
						this.navCtrl.pop();
					}).catch(err => {
						console.log('退回失败:' + err);
					})
				}
			}
		});
		modal.present();
	}

	closedclick() {
		const modal = this.modalCtrl.create(IssueclosedPage, {
			username: this.username
		});
		modal.onDidDismiss(result => {
			console.log(result);
			if (result) {
				console.log('if');
				let now = new Date();
				let curtime: string = now.toLocaleDateString() + " " + now.getHours().toString() + ":" + now.getMinutes() + ":" + now.getSeconds();

				let reason: string; reason = result[0].reason; console.log(reason);
				let imgs: Array<any>; imgs = []; imgs = result[0].img; console.log(imgs);
				let status: string; status = '非正常关闭';
				this.initBaseDB.updateImgData(this.projid, this.batchid, this.buildingid, imgs).then((v2: any) => {
					let tablename = this.initBaseDB.getissuetablename(this.type);
					let upltablename = this.initBaseDB.getuplissuetablename(this.type);
					if (this.versionid == 0) {
						let setimg = '';
						for (var i = 0; i < v2.length; i++) {
							setimg += ",ImgClose" + (i + 1).toString() + "='" + v2[i] + "'";
							console.log(setimg);
						}
						let sql = "update #tablename# set IssueStatus = '#status#', CloseDate = '" + curtime + "',CloseReason = '#CloseReason#', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' #img# where Id = '#issueid#'";
						sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#status#', status).replace('#CloseReason#', reason).replace('#img#', setimg).replace('#username#', this.username);
						this.initBaseDB.updateIssue([sql]).then(v => {
							this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type).then(v => {
								this.navCtrl.pop();
							})
						}).catch(err => {
							console.log('非正常关闭:' + err);
						})
					} else {
						let setimg = '';
						for (var i = 0; i < v2.length; i++) {
							setimg += ",ImgClose" + (i + 1).toString() + "='" + v2[i] + "'";
							console.log(setimg);
						}
						let sql = "update #tablename# set IssueStatus = '#status#', CloseDate = '" + curtime + "', CloseReason = '#CloseReason#',EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' #img#  where Id = '#issueid#' ";
						sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#status#', status).replace('#CloseReason#', reason).replace('#img#', setimg).replace('#username#', this.username);
						let uplsql = "select id from #upltablename# where id = '" + this.issueid + "'";
						uplsql = uplsql.replace('#upltablename#', upltablename);

						let promise = new Promise((resolve) => {
							resolve(100);
						});

						promise.then(v1 => {
							return this.initBaseDB.currentdb().executeSql(uplsql, []);
						}).then((val: any) => {
							let sqls = [];
							sqls.push(sql);
							if (val && val.rows.length > 0) {
								sql = "update #upltablename# set IssueStatus = '#status#', CloseDate = '" + curtime + "', CloseReason = '#CloseReason#',EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' #img#  where Id = '#issueid#' ";
								sql = sql.replace("#upltablename#", upltablename).replace('#userid#', this.userid).replace('#issueid#', this.issueid).replace('#status#', status).replace('#CloseReason#', reason).replace('#img#', setimg).replace('#username#', this.username);
							} else {
								sql = "insert into #upltablename# (Id,BatchId,RoomId,ProjId,VersionId,BuildingId,IssueStatus,EngineerPhone,EngineerName,CloseDate,CloseReason #imgfield#) values (#values#)";
								let value = [];
								value.push("'" + this.issueid + "'");
								value.push("'" + this.batchid + "'");
								value.push("'" + this.roomid + "'");
								value.push("'" + this.projid + "'");
								value.push(this.versionid);
								value.push("'" + this.buildingid + "'");
								value.push("'" + status + "'");
								value.push("'" + this.userid + "'");
								value.push("'" + this.username + "'");
								value.push("'" + curtime + "'");
								value.push("'" + reason + "'");
								let imgfields = '';
								for (var j = 0; j < v2.length; j++) {
									imgfields += ',ImgClose' + (j + 1).toString();
									value.push("'" + v2[j] + "'");
									console.log(imgfields);
								}
								sql = sql.replace("#upltablename#", upltablename).replace('#imgfield#', imgfields).replace('#values#', value.join(','));
							}
							sqls.push(sql);
							return this.initBaseDB.updateIssue(sqls);
						}).then(v => {
							return this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type);
						}).then(v => {
							this.navCtrl.pop();
						}).catch(err => {
							console.log('非正常关闭:' + err);
						})
					}
				})
			}
		});
		modal.present();
	}

	cancelclick() {
		let tablename = this.initBaseDB.getissuetablename(this.type);
		let upltablename = this.initBaseDB.getuplissuetablename(this.type);
		let now = new Date();
		let curtime: string = now.toLocaleDateString() + " " + now.getHours().toString() + ":" + now.getMinutes() + ":" + now.getSeconds();

		if (this.versionid == 0) {
			let sql = "update #tablename# set IssueStatus = '已作废', CancelDate = '" + curtime + "', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#'";
			sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#username#', this.username);
			this.initBaseDB.updateIssue([sql]).then(v => {
				this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type).then(v => {
					this.navCtrl.pop();
				})
			}).catch(err => {
				console.log('通过失败:' + err);
			})
		} else {
			let sql = "update #tablename# set IssueStatus = '已作废', CancelDate = '" + curtime + "', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#' ";
			sql = sql.replace("#tablename#", tablename).replace("#userid#", this.userid).replace('#issueid#', this.issueid).replace('#username#', this.username);
			let uplsql = "select id from #upltablename# where id = '" + this.issueid + "'";
			uplsql = uplsql.replace('#upltablename#', upltablename);

			let promise = new Promise((resolve) => {
				resolve(100);
			});

			promise.then(v1 => {
				return this.initBaseDB.currentdb().executeSql(uplsql, []);
			}).then((val: any) => {
				let sqls = [];
				sqls.push(sql);
				if (val && val.rows.length > 0) {
					sql = "update #upltablename# set IssueStatus = '已作废', CancelDate = '" + curtime + "', EngineerName = '#username#',EngineerPhone = '#userid#',EngineerId = '' where Id = '#issueid#' ";
					sql = sql.replace("#upltablename#", upltablename).replace('#userid#', this.userid).replace('#issueid#', this.issueid).replace('#username#', this.username);
				} else {
					sql = "insert into #upltablename# (Id,BatchId,RoomId,ProjId,VersionId,BuildingId,IssueStatus,EngineerPhone,EngineerName,CancelDate) values (#values#)";
					let value = [];
					value.push("'" + this.issueid + "'");
					value.push("'" + this.batchid + "'");
					value.push("'" + this.roomid + "'");
					value.push("'" + this.projid + "'");
					value.push(this.versionid);
					value.push("'" + this.buildingid + "'");
					value.push("'已作废'");
					value.push("'" + this.userid + "'");
					value.push("'" + this.username + "'");
					value.push("'" + curtime + "'");
					sql = sql.replace("#upltablename#", upltablename).replace('#values#', value.join(','));
				}
				sqls.push(sql);
				return this.initBaseDB.updateIssue(sqls);
			}).then(v => {
				return this.initBaseDB.updateuploadflag(this.projid, this.batchid, this.buildingid, this.type);
			}).then(v => {
				this.navCtrl.pop();
			}).catch(err => {
				console.log('作废失败:' + err);
			})
		}
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
		this.initBaseDB.downloadissueimg(this.projid,this.issuelist,false).then(v=>{
		  this.initimages();
		})
	  }

	//点击图片放大
	// showBigImage(imageName) {  //传递一个参数（图片的URl）
	// 	this.navCtrl.push(ShowimgPage, { imgdata: imageName });
	// };

	showBigImage(imagesrc, fixedflag: number = 0) {  //传递一个参数（图片的URl）
		let i = 0;
		if (fixedflag == 0) {
			this.images.forEach(element => {
				if (element == imagesrc) {
					this.navCtrl.push(ShowimgPage, { imgdata: this.images, num: i });
				}
				i++;
			})
		} else {
			this.imagesfixed.forEach(element => {
				if (element == imagesrc) {
					this.navCtrl.push(ShowimgPage, { imgdata: this.imagesfixed, num: i });
				}
				i++;
			})
		}
	};

	// deleteimage(imagesrc) {
	// 	let i = 0;
	// 	this.imagesfixed.forEach(element => {
	// 		if (element == imagesrc)
	// 			this.imagesfixed.splice(i, 1);
	// 		i++;
	// 	});
	// 	let j = 0;
	// 	this.imagesadd.forEach(element => {
	// 		if (element == imagesrc)
	// 			this.imagesadd.splice(j, 1);
	// 		j++;
	// 	});
	// }
}
