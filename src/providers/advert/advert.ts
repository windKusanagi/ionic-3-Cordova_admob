import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular'
import { AdMob, AdMobOptions } from '@ionic-native/admob';

/*
  Generated class for the AdvertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AdvertProvider {
  
  private adMobId: { banner: string, interstitial: string };
  private adOptions: AdMobOptions = <AdMobOptions>{};
  
  //private adExtras: AdMobAdExtras = <AdMobAdExtras>{};
 
  constructor(private platform: Platform, private admob: AdMob) {
    this.platform.ready().then(() => {
      console.log('ready');
      this.initAds();
    });
  }
 
  private initAds():void {
    if (!this.admob) {
      console.log("AdMob not found.");
      return;
    }
    this.setAdMobIds();
    this.setAdMobOptions();
    this.registerAdMobEvents();
    this.showBanner();
  }
 
  private registerAdMobEvents():void {
    document.addEventListener('onAdFailLoad', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdLoaded', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdPresent', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdDismiss', data => console.log(JSON.stringify(data)));
    document.addEventListener('onAdLeaveApp', data => console.log(JSON.stringify(data)));
  }
 
  private setAdMobIds():void {
    /* 
      Replace IDs with supplied ones via AdMob.
      Different one per platform allows for better analytics
    */
    if (this.platform.is('android')) {
      this.adMobId = {
        banner: "ca-app-pub-7964685388872167/3178988739",
        interstitial: "ca-app-pub-7964685388872167/3178988739"
      }
    }
    else if (this.platform.is('ios')) {
      this.adMobId = {
        banner: "ca-app-pub-XXXXXXXXXXXXXXXXXXXXXX",
        interstitial: "ca-app-pub-XXXXXXXXXXXXXXXXXXXXXX"
      }
    }
  }
 
  private setAdMobOptions():void {
    this.adOptions = {
      position: this.admob.AD_POSITION.CENTER,
      isTesting: false,
      autoShow: true
      //adExtras: this.adExtras
    }
    this.admob.setOptions(this.adOptions)
  }
 
  public showInterstitial():boolean {
    if (!AdMob) return false;
    this.admob.prepareInterstitial({ adId: this.adMobId.interstitial });
    return true;
  }
 
  public showBanner():boolean {
    if (!AdMob) return false;
 
    this.admob.createBanner({ adId: this.adMobId.banner });
    return true;
  }
 
  public removeAds():void {
    if (this.admob) this.admob.removeBanner();
  }
}