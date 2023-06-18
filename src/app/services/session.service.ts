import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  // private sessionTimeout: number = 1 * 60 * 1000; // 1 minute
  private timer: any;

  constructor() { }

  startTimer(timeout: number, logoutCallback: () => void) {
    // console.log('startTimer called')
    this.timer = setTimeout(logoutCallback, timeout);
  }

  resetTimer() {
    // console.log('reset called')
    clearTimeout(this.timer);
  }

  stopTimer() {
    // console.log('Stop called')
    clearTimeout(this.timer);
    this.timer = null;
  }
}
