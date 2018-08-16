import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer.model';

@Injectable()
export class ObjectivesService {
  objectives = new Subject<any>();
  objective = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  getObjectives() {
    this.httpClient.get<Customer>('http://localhost:8080/api/users/')
      .subscribe(
        res => {
            this.objectives.next(res);
            console.log(res);
            return res;
          },
        err => console.log(err)
      );
  }
}
