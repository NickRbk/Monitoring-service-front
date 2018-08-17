import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class SocialMediaService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private errorService: ErrorService) {}

  updateTwitterProfile(id: number, alias) {
    const url = `http://localhost:8080/api/users/${id}/media`;
    console.log(url);
    this.httpClient.post(url, {alias})
      .subscribe(
        () => { },
        err => {
          this.errorService.errorListener.next(err['message']);
          this.errorService.setErrorTimeOut();
          this.router.navigate(['/objectives']);
        }
      );
  }
}
