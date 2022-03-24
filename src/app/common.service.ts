import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // userData! : Array<any>;
  userData: any[] = []
  pageTitle: string = "";

  constructor() { }

  saveUserDate(userData:any) {
    let currentIndex = this.userData?.length+1;
    userData.id = currentIndex;
    this.userData?.push(userData);
  }

  getUserData() {
    return this.userData;
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
  }

  getPageTitle() {
    return this.pageTitle;
  }
}
