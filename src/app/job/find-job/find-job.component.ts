import { Component, OnInit } from '@angular/core';
import { JobService } from '../../service/job.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit {

  query: string = "";

  jobs: any[] = [];

  isJobsLoading: boolean;
  isError: boolean;
  isEmptyResult: boolean;

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.search();
  }

  search()
  {
    this.isJobsLoading = true;

    // Resetting alert boxes so they don't show up near the loading spinner
    this.isEmptyResult = false;
    this.isError = false;

    this.jobService.findJob(this.query).subscribe(result => {
      this.isJobsLoading = false;

      this.jobs = result;

      // Show empty result alert box
      if(this.jobs.length == 0)
      this.isEmptyResult = true;

    },err => {
      this.isJobsLoading = false;

      this.isError = true;
    });
  }

}
