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
  pageEvent: PageEvent;
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
      });
  }

  onPaginator() {
    const page = this.pageEvent ? this.pageEvent['pageIndex'] : 0;
    this.size = this.pageEvent.pageSize;

    this.tweetService.fetchTweets(page, this.size, this.orderBy, this.direction)
      .then(
        res => {
          this.totalCount = res['totalElements'];
          this.tweets = res['content'];
          document.querySelector('#header') .scrollIntoView();
        }
      );
  }

  onSortSelector() {
    this.tweetService.fetchTweets(0, this.size, this.orderBy, this.direction)
      .then(
        res => {
          this.totalCount = res['totalElements'];
          this.tweets = res['content'];
        }
      );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
