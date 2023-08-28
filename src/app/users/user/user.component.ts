import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  //@Input() user!: { id: number; name: string };
  user!: { id: number; name: string };
  paramsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    // This is for when we want to change the user details without reloading the component
    //PARAMS IS AN OBSERVABLE
    this.paramsSubscription = this.route.params.subscribe((params) => {
      //console.log(params);
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
