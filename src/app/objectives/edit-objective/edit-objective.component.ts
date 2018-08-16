import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ObjectivesService} from '../../shared/service/objectives.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-objective',
  templateUrl: './edit-objective.component.html',
  styleUrls: ['./edit-objective.component.css']
})
export class EditObjectiveComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  objectiveForm: FormGroup;
  id: string;
  editMode = false;

  objective = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private objectivesService: ObjectivesService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
        }
      );

    if (this.editMode) {
      console.log('On EDIT');
      this.objectivesService.objective
        .subscribe(
          objective => {
            console.log('INSIDE');
            this.objective = objective;
            console.log(objective);
            this.initForm();
          }
        );
    }
    this.initForm();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  private initForm() {
    let firstName = '';
    let lastName = '';
    let alias = '';

    if (this.editMode && this.objective) {
      console.log('INIT FORM');
      console.log(this.objective);

      firstName = this.objective['firstName'];
      lastName = this.objective['lastName'];
      // alias = this.objective['socialMedia']['twitterProfile']['twitterUser']['screenName'];
      alias = 'dfg';
    }

    this.objectiveForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'alias': new FormControl(alias, Validators.required)
    });
  }

  onSubmit() {

  }

  onCancel() {

  }

  changeSaveButtonLabel() {
    return this.editMode ? 'Update' : 'Save';
  }

  onRemove() {

  }
}
