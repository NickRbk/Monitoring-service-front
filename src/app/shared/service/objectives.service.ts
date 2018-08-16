import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer.model';
import {ErrorService} from './error.service';

@Injectable()
export class ObjectivesService {
  objective = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private errorService: ErrorService) {}

  getObjectives() {
    this.httpClient.get<Customer>('http://localhost:8080/api/users/')
      .subscribe(
        objectives => objectives,
        err => {
          this.errorService.errorListener.next(err['message']);
          this.errorService.setErrorTimeOut();
        }
      );
  }
}
