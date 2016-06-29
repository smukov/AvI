import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'elastic-textarea',
  inputs: ['placeholder'],
  template:
  `
  <textarea #txtArea cols='1'
    placeholder='{{placeholder}}'
    (keyup)='expandText()'
    (keydown)='expandText();'
    [(ngModel)]="content"
    (ngModelChange)='onChange($event)'></textarea>
  `,
  queries: {
    txtArea: new ViewChild('txtArea')
  }
})
export class ElasticTextarea {
  constructor() {
    this.content = "";
  }

  onChange(newValue){
    console.log('new value');
    console.log(newValue);
  }

  expandText(){
    console.log('expand textarea');
    this.txtArea.nativeElement.style.height = "33px";
    this.txtArea.nativeElement.style.height =  this.txtArea.nativeElement.scrollHeight + "px";
  }
}
