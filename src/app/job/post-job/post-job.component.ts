import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IndustryService } from '../../service/industry.service';
import { AuthService } from './../../service/auth.service';
import { JobService } from './../../service/job.service';
import { ConfirmationService } from 'primeng/api';
import { FunctionalAreaService } from './../../service/functional-area.service';
import { LocationService } from './../../service/location.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  job: any = { minWorkExperience: -1, maxWorkExperience: -1, jobLocation: -1, industry: -1, functionalArea: -1 };

  workExMinRange: number[] = [];
  workExMaxRange: number[] = [];

  isWorkExMaxDropDownDisabled: boolean = true;

  locations: any;
  industries: any;
  functionalAreas: any;

  isJobLocationLoading: boolean;
  isIndustryLoading: boolean;
  isFunctionalAreaLoading: boolean;

  isJobGettingPosted: boolean;

  isError: boolean;

  constructor(private locationService: LocationService, 
              private industryService: IndustryService, 
              private functionalAreaService: FunctionalAreaService,
              private confirmationService: ConfirmationService,
              private jobService: JobService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    // Populate workExMinRange on page load
    this.populateWorkExMinRange();

    // Populate locations on page load
    this.populateLocations();

    // Populate industries on page load
    this.populateIndustries();

    // Populate functionalAreas on page load
    this.populateFunctionalAreas();
 
  }

  // Opens a pop up to get the confirmation of a job post
  confirmPost() {
    this.confirmationService.confirm({
      message: "Are you sure you want to post this job?",
      header: "Post Job - Confirmation",
      icon: 'pi pi-question',
      accept: () => {
        this.postJob();
      }
    });
  }

  postJob() {
    let job = {
      title: this.job.jobTitle,
      description: this.job.jobDescription,
      minWorkExperience: this.job.minWorkExperience,
      maxWorkExperience: this.job.maxWorkExperience,
      locationId: this.job.jobLocation,
      industryId: this.job.industry,
      functionalAreaId: this.job.functionalArea,
      requisitionId: this.job.jobRequisitionId,
      userId: this.authService.getUserId()
    };

    this.isJobGettingPosted = true;

    this.jobService.postJob(job).subscribe(result => {
      this.isJobGettingPosted = false;

      let jobId = result;      
      this.router.navigate(['Job', jobId]);
    },err => {
      this.isJobGettingPosted = false;

      this.isError = true;
    });
  }

  // Enables or Disalbes the maxWorkExperiene dropdown based on the value selected for minWorkExperience
  workExMinValueChanged(minWorkExperience) {
    if(minWorkExperience.value != -1)
    {
      this.populateWorkExMaxRange(minWorkExperience.value);
      this.isWorkExMaxDropDownDisabled = false;
    }
    else
    {
      this.isWorkExMaxDropDownDisabled = true;
    }
  }

  // Populates the workExMinRange with 11 numbers (0-10)
  populateWorkExMinRange() {
    let i: number;

    for(i=0; i<=10; i++)
    {
      this.workExMinRange[i] = i;
    }

  }

  // Populates the workExMaxRange array based on the seleted minWorkExperience
  populateWorkExMaxRange(minWorkExperience) {
    let i: number;

    let maxWorkExStartValue = minWorkExperience + 1;

    for(i=0; i< 10; i++)
    {
      this.workExMaxRange[i] = maxWorkExStartValue;
      maxWorkExStartValue++;
    }
  }

  // Gets locations from db and populates the locations variable
  populateLocations() {
    this.isJobLocationLoading = true;

    this.locationService.getLocations().subscribe(result => {
      this.isJobLocationLoading = false;

      this.locations = result;
    },err => {
      this.isJobLocationLoading = false;

      this.isError = true;
    })
  }

  // Gets all the industries from db and populates the industries variable
  populateIndustries() {
    this.isIndustryLoading = true;

    this.industryService.getIndustries().subscribe(result => {
      this.isIndustryLoading = false;

      this.industries = result;
    },err => {
      this.isIndustryLoading = false;

      this.isError = true;
    })
  }

  // Gets all the functional areas from db and populates the functionalAreas variable
  populateFunctionalAreas() {
    this.isFunctionalAreaLoading = true;

    this.functionalAreaService.getFunctionalAreas().subscribe(result => {
      this.isFunctionalAreaLoading = false;
      
      this.functionalAreas = result;
    },err => {
      this.isFunctionalAreaLoading = false;
      
      this.isError = true;
    })
  }


}
