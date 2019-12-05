import { Component, OnInit, NgModuleFactoryLoader } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  owed: number;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<IContact> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) {
  }

  async ngOnInit() {
  }


  async loadContacts() {
    const contacts = await this.http.get('assets/contacts.json').toPromise();
    this.contacts = contacts.json();
    return contacts.json();
  }

  addContacts() {
    const contacts: IContact = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      owed: null
    };
    this.contacts.push(contacts);
    this.saveToLocalStorage();
  }
  delete(index: number) {
    this.contacts.splice(index, 1);
    console.log('index ', index);
  }

finalize() {
  const data = this.calculate();
  this.router.navigate(['home', data]);
}

  calculate() {
    let owed = 0;
    for (let i = 0; i < this.contacts.length; i++) {
      owed += this.contacts[i].owed;
    } return {
      numberOfContacts: this.contacts.length,
      subTotal: owed,
      taxAmount: owed * .12,
      total: owed + (owed * .12)
    };


  }


  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }



}
