import { Injectable } from '@angular/core';

@Injectable()
export class CommunicationService {

  isWarning = false;

  constructor() { }

  getIsWarning (): boolean {
    return this.isWarning;
  }

  setIsWarning (boolean: boolean) {
    this.isWarning = boolean;
  }

}
