import { Component, OnInit } from '@angular/core';

import { MyClass } from './decorators/my-class.decorator';
import { MyService } from './services/my.service';

@Component({
    templateUrl: 'home.component.html'
})
@MyClass()
export class HomeComponent /*implements OnInit*/ {

    // If you try to comment this property, and try to create the property into decorator,
    // AoT mode doesn't work.
    myProperty: string;

    constructor(public myService: MyService) { }

    // If you uncomment the ngOnInit method and implements OnInit, it works also in AoT mode.
    /*ngOnInit(): void {
        console.log("ngOnInit");
    }*/

}
