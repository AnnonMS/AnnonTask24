import { Component, OnInit } from '@angular/core';
import { MessengerState } from '@appstore/messenger/messenger.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messenger-container',
  templateUrl: './messenger-container.component.html',
  styleUrls: ['./messenger-container.component.scss']
})
export class MessengerContainerComponent implements OnInit {


  @Select(MessengerState.getMessages) public messages$: Observable<string[]>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
