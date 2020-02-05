import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data-service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('heroToken')) {
      this.dataService.changeAuthState(true);
    } else this.dataService.changeAuthState(false);
  }
}
