import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer.model';
import {ErrorService} from './error.service';
import {SocialMediaService} from './social-media.service';
import {Router} from '@angular/router';

@Injectable()
export class ObjectivesService {
  private objectivesListener = new Subject<any>();
  private objective;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private socialMediaService: SocialMediaService,
              private errorService: ErrorService) {}

  getObjectivesListener() {
    return this.objectivesListener.asObservable();
  }

  getObjective() {
    return this.objective;
  }

  setObjective(objective) {
    return this.objective = objective;
  }

  getObjectives() {
    this.httpClient.get<Customer>('http://localhost:8080/api/users/')
      .subscribe(
        objectives => this.objectivesListener.next(objectives),
        err => {
          this.errorService.errorListener.next(err['message']);
          this.errorService.setErrorTimeOut();
        }
      );
  }

  saveObjective(body) {
    const url = 'http://localhost:8080/api/users/';

    this.httpClient.post(url, {
      firstName: body['firstName'],
      lastName: body['lastName']
    }).subscribe(
      (id: string) => {
        this.socialMediaService.updateTwitterProfile(+id, body['alias']);
      },
      err => {
        this.errorService.errorListener.next(err['message']);
        this.errorService.setErrorTimeOut();
      }
    );
  }

  updateObjective(id: number, body) {
    const url = `http://localhost:8080/api/users/${id}`;

    this.httpClient.patch(url, {
      firstName: body['firstName'],
      lastName: body['lastName']
    }).subscribe(
      () => {
        this.socialMediaService.updateTwitterProfile(id, body['alias']);
      },
      err => {
        this.errorService.errorListener.next(err['message']);
        this.errorService.setErrorTimeOut();
      }
    );
  }

  deleteObjective(id: number) {
    const url = `http://localhost:8080/api/users/${id}`;
    this.httpClient.delete(url)
      .subscribe(
        () => {
          this.router.navigate(['/objectives']);
        },
        err => {
          this.errorService.errorListener.next(err['message']);
          this.errorService.setErrorTimeOut();
        }
      );
  }
}
