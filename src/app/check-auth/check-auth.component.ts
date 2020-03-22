import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-check-auth',
  templateUrl: './check-auth.component.html',
  styleUrls: ['./check-auth.component.css']
})
export class CheckAuthComponent implements OnInit {

  constructor(private location: Location
             ) { }

  ngOnInit() {
    this.location.back();
  }
}
