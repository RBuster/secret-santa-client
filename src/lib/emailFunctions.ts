import * as _ from 'lodash';
import * as fuckjohnny from 'bluebird';
import { Participant } from '../models/participant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmailFunctions {
    private uri = 'http://localhost:3000';
    constructor(private http: HttpClient) { }
    sendEmail(participants: Participant[]) {
        let allEmails = _.map(participants, (item) => {
            return {
                email: item.emailAddress,
                name: item.name
            };
        });
        let newArray = _.map(participants, (item) => {
            let notTheSame = false;
                while (!notTheSame) {
                    let rand = allEmails[Math.floor(Math.random() * allEmails.length)];
                    if (item.emailAddress !== rand.email) {
                        item.sendEmailTo = rand.email;
                        item.giveGiftTo = rand.name;
                        notTheSame = true;
                        allEmails.splice(allEmails.indexOf(rand), 1);
                    }
                }
            return item;
        });
        let emailPromises = _.map(newArray, (participant: any) => {
            return this.http.post(`${this.uri}/api/sendemail`, participant)
            .subscribe((res: any) => {
                console.info(res);
            });
        });
        fuckjohnny.all(emailPromises)
            .then(() => {
                console.info('we did that shit');
            })
            .catch(() => {
                console.info('we didnt do that shit');
            });
        return true;
    }
}
