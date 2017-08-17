import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Dialogs } from '@ionic-native/dialogs';
import 'rxjs/add/operator/toPromise';
import { LoginPage } from '../pages/login/login';
import { LocalStorage } from '../providers/local-storage';
import { NavController, App } from 'ionic-angular';
import { MysettingsPage } from '../pages/mysettings/mysettings';
//import {NativeService } from '../providers/nativeservice';

@Injectable()

export class HttpService {
  private navCtrl: NavController;
  constructor(private http: Http, private dialogs: Dialogs, private localStorage: LocalStorage, private app: App) {  //,public nativeservice: NativeService
    
 }

 private logout() {
   this.app.getActiveNav().push(LoginPage);
   throw '';
 }

  public get(url: string, paramObj: any) {
    console.log(url + this.toQueryString(paramObj));
    return this.http.get(url + this.toQueryString(paramObj))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public getimg(url: string, paramObj: any) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url + this.toQueryString(paramObj), new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccessImg(res))
      .catch(error => this.handleError(error));
  }

  public post(url: string, paramObj: any) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postimg(url: string, paramObj: any) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccessImg(res))
      .catch(error => this.handleError(error));
  }

  public postBody(url: string, paramObj: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(url, paramObj, new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public fetchurl(url: string, paramObj: any): string {
    return url + this.toQueryString(paramObj);
  }

  private handleSuccessImg(result) {
    let body = result._body;
    let data = JSON.parse(body);
    if (data.errcode == 0) {
      return data.data.list;
    }
    else {
      console.log(data.errmsg);
    }
  }

  private handleSuccess(result) {
    console.log(result);
    if (result && result[0][0][0] == "false") {//由于和后台约定好,所有请求均返回一个包含success,msg,data三个属性的对象,所以这里可以这样处理
      console.log(result[0][0][1]);//这里使用ToastController
      let err: string = result[0][0][1];
      console.log('err'+err);
      if (err == "用户不存在" || err == "登陆已失效" || err == "未找到用户") {
        console.log('uuuuu');
        this.dialogs.alert(err, '提示', '确定')
          .then(() => {
            this.localStorage.removeitem('curuser').then(v=>{
              this.localStorage.removeitem('curproj').then(v=>{
                 this.logout();
                 //this.app.getActiveNav().push(LoginPage);
              })
            })
          })
          .catch(e => {
            console.log('Error displaying dialog', e);
            // this.localStorage.removeitem('curuser').then(v=>{
            //   this.localStorage.removeitem('curproj').then(v=>{
            //      this.logout();
            //   })
            // })
          })
      } else if (err == "用户不在此项目中") {
        this.dialogs.alert(err + ",请到‘我’=>'设置'里选择其他项目.", '提示', '确定')
          .then(() => {
            throw err;
          })
          .catch(e => {
            console.log('Error displaying dialog', e);
            throw err;
          })
      } else {
        this.dialogs.alert(err, '提示', '确定').then(() => {
          throw err;
        }).catch(e => {
          throw err;
        })
      }
    }
    else
      return result;
  }

  private handleError(error: Response | any) {
    let msg = '请求失败';

    if (error.status == 0) {
      msg = '请求地址错误';
    }
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    //this.nativeservice.hideLoading();
    console.log(msg);//这里使用ToastController
    //return { success: false, msg: msg };
    throw msg;
  }

  /**
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  /**
   *
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    //console.log(ret);
    let b = ret.join('&');
    // console.log(b);
    return b;//ret.join('&');
  }

  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}