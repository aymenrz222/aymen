import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  
    @Input() employeer: any;


    constructor() { }
    ngOnInit(){
      console.log('open pop-up' , this.employeer)
    }
    closeModal(): void {
      // Émettre un événement ou implémenter la logique pour fermer la boîte de dialogue pop-up
    }
  }
  

