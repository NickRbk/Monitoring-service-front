import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {TweetService} from '../shared/service/tweet.service';
import {ErrorService} from '../shared/service/error.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SortCriteria} from '../shared/model/sort-criteria.model';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  onLoading = true;
  onPaginatorChange = false;
  private errorSub: Subscription;

  page = 0;
  size = 5;
  orderBy: string;
  direction = 'asc';

  pageSizeOptions: number[] = [5, 10, 15, 20];

  sortCriteriaOptions: SortCriteria[] = [
    {value: 'date', viewValue: 'tweet\'s date'},
    {value: 'fav', viewValue: 'favourites'},
    {value: 'share', viewValue: 'share'}
  ];

  directionOptions: string[] = ['desc', 'asc'];

  totalCount: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tweets: [any];

  error = '';

  constructor(private tweetService: TweetService,
              private route: ActivatedRoute,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.errorSub = this.errorService.errorListener
      .subscribe(error => this.error = error);

    this.tweetService.fetchTweets(this.page, this.size, this.orderBy, this.direction)
      .then((res) => {
        this.totalCount = res['totalElements'];
        this.tweets = res['content'];
        this.onLoading = false;
      });
  }

  onPaginator(pageEvent: PageEvent) {
    document.querySelector('#header').scrollIntoView();
    this.page = pageEvent['pageIndex'];
    this.size = pageEvent['pageSize'];

    this.onPaginatorChange = true;
    this.tweetService.fetchTweets(this.page, this.size, this.orderBy, this.direction)
      .then(
        res => {
          this.totalCount = res['totalElements'];
          this.tweets = res['content'];
          this.onPaginatorChange = false;
        }
      );
  }

  onSortSelector() {
    this.onLoading = true;
    this.tweetService.fetchTweets(0, this.size, this.orderBy, this.direction)
      .then(
        res => {
          this.totalCount = res['totalElements'];
          this.tweets = res['content'];
          this.onLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
