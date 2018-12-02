import { Component, OnInit } from '@angular/core';
import { Participant } from '../../models/participant';
import { FormControl } from '@angular/forms';
import { EmailFunctions } from '.././../lib/emailFunctions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private participants: Participant[] = [];
  private emailAddress = new FormControl('');
  private name = new FormControl('');

  constructor(private emailFunctions: EmailFunctions) { }

  ngOnInit() {
  }

  addParticipant() {
    let newParticipant = {
      id: 0,
      name: this.name.value,
      emailAddress: this.emailAddress.value,
      sendEmailTo: '',
      giveGiftTo: ''
    };
    this.participants.push(newParticipant);
  }

  sendEmail() {
    this.emailFunctions.sendEmail(this.participants);
  }

}
