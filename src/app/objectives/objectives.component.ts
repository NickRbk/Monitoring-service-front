import { Component, OnInit } from '@angular/core';
import {ObjectivesService} from '../shared/service/objectives.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {
  loading = true;
  objectives;

  constructor(private objectivesService: ObjectivesService) { }

  ngOnInit() {
    this.objectives = this.objectivesService.getObjectives();
  }

  shareObjective(objective) {
    console.log(objective);
    this.objectivesService.objective.next(objective);
  }
}
