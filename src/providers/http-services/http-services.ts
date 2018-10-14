import { Injectable } from '@angular/core';

import {Http,Jsonp} from "@angular/http";

import 'rxjs/add/operator/map';

//配置文件
import { ConfigProvider } from '../../providers/config/config';


/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {

  constructor(public http: Http,public jsonp:Jsonp,public config:ConfigProvider) {
    console.log('Hello HttpServicesProvider Provider');
  }
  
  //请求数据
  // apiUrl :   api/focus
  // apiUrl :   api/plist?page=1


  requestData(apiUrl,callback){

      if(apiUrl.indexOf('?')==-1){
        var api=this.config.apiUrl+apiUrl+'?callback=JSONP_CALLBACK'
      }else{
        var api=this.config.apiUrl+apiUrl+'&callback=JSONP_CALLBACK'
        //  http://39.108.159.135/api/plist?is_best=1&callback=JSONP_CALLBACK
      }
      this.jsonp.get(api).subscribe(function(data){
        // console.log(data);

        callback(data['_body']);        /*回调函数*/

      },function(err){
         console.log(err);
      })
  }



}
