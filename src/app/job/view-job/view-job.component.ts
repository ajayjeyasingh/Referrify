import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../service/job.service';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  jobId;
  job;

  isJobLoading: boolean;
  isError: boolean;
  isJobNotFound: boolean;
  
  displayApplication: boolean;

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params.jobId;

    this.getJob(this.jobId);
  }

  getJob(jobId) {
    this.isJobLoading = true;

    this.jobService.getJob(jobId).subscribe(result => {
      this.isJobLoading = false;

      this.job = result;
    },err => {
      this.isJobLoading = false;
      this.isError = true;

      if(err.status === 404)
      this.isJobNotFound = true;

    });
  }

}
