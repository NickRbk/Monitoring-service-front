import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  errorListener = new Subject<string>();

  setErrorTimeOut() {
    setTimeout(() => {
      this.errorListener.next('');
    }, 2000);
  }
}
