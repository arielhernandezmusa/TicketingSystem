import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  template:  `
    <p>Dashboard</p>
  `
})
export class HomeDashboardComponent implements OnInit {
 

  constructor(
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit() {
    // Capture the session ID if available
  }
}

