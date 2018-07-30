import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AboutPage } from '../about/about'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageEditorModal } from '../../pages/imageeditor/imageeditormodal';
import { ShowimgPage } from '../../pages/imageeditor/showimg';
import { NativeService } from "../../providers/nativeservice";

@Component({
  selector: 'page-issuereturn',
  templateUrl: 'issuereturn.html'
})
export class IssuereturnPage {
  returnreason: string;
  otherdesc: string;
  username: string;
  imagesreturn: Array<string>;
  type: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private camera: Camera, 
              private modalCtrl: ModalController, private nativeService: NativeService) {
    this.returnreason = "还未维修处理";
    this.otherdesc = '';
    this.username = navParams.get('username');
    this.imagesreturn = [];
    this.imagesreturn = navParams.get('imagesreturn');
    this.type = navParams.get('type');
  }

  confirmclick() {
    console.log(this.returnreason + this.otherdesc);
    if (this.type == 4 && this.imagesreturn.length == 0){
      this.nativeService.alert('必须拍照确认原因'); 
      return false;
      // this.imagesreturn.push("data:image/jpeg;base64,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")
    }
    let result:any;
    result = {returndesc:this.returnreason, imagesreturn:this.imagesreturn};
    if (this.returnreason == '其他') {
      result = {returndesc:this.otherdesc, imagesreturn:this.imagesreturn};
    }
    this.viewCtrl.dismiss(result);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.close();
  }

  cameraclick() {
    let now = new Date(); console.log("cameraclick start:" + now.toLocaleTimeString());
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 800,
      targetWidth: 480
    }

    this.camera.getPicture(options).then((imageData) => {
      let now1 = new Date(); console.log("getPicture:" + now1.toLocaleTimeString());
      var src = 'data:image/jpeg;base64,' + imageData;
      now1 = new Date(); console.log("src = :" + now1.toLocaleTimeString());
      const modal = this.modalCtrl.create(ImageEditorModal, {
        imageSrc: src, username: this.username
      });
      now1 = new Date(); console.log("getPicture end:" + now1.toLocaleTimeString());
      modal.onDidDismiss(result => {
        if (result) {
          this.imagesreturn.push(result);
        }
      });
      modal.present();
    }, (err) => {
      // Handle error
    });
  }

  deleteimage(imagesrc) {
    let i = 0;
    this.imagesreturn.forEach(element => {
      if (element == imagesrc)
        this.imagesreturn.splice(i, 1);
      i++;
    });
  }
  //点击图片放大
  showBigImage(imagesrc) {
    let i = 0;
    this.imagesreturn.forEach(element => {
      if (element == imagesrc) {
        this.navCtrl.push(ShowimgPage, { imgdata: this.imagesreturn, num: i });
      }
      i++;
    });
  };
}
