import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-messenger-container',
  templateUrl: './messenger-container.component.html',
  styleUrls: ['./messenger-container.component.scss']
})
export class MessengerContainerComponent implements OnInit {

  constructor(public messageSrv: MessengerService) { }

  ngOnInit() {
  }

}
