import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';
import {Business} from "./business";
import {Category} from "./category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  businesses: Business[];
  categories: Category[];
  appState: string;
  activeKey: string;

  activeCompany: string;
  activeCategory: string;
  activeYearsInBusiness: string;
  activeDescription: string;
  activePhone: string;
  activeEmail: string;
  activeStreetAddress: string;
  activeState: string;
  activeZipcode: string;

  constructor(private _firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this._firebaseService.getBusinesses().subscribe(businesses => {
      this.businesses = businesses;
    });

    this._firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  changeState(state, key) {
    console.log('Changing state to: ' + state);
    if (key) {
      console.log('Changing key to: ' + key);
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category) {
    if (category !== '0') {
      this._firebaseService.getBusinesses(category).subscribe(businesses => {
        this.businesses = businesses;
      });
    }
    if (category === '0') {
      this._firebaseService.getBusinesses().subscribe(businesses => {
        this.businesses = businesses;
      });
    }
  }

  addBusiness(category: string,
              company: string,
              description: string,
              email: string,
              phone: string,
              state: string,
              street_address: string,
              years_in_business: number,
              zipcode: string) {

    const created_at = new Date().toString();

    const newBusiness = {
      category: category,
      company: company,
      description: description,
      email: email,
      phone: phone,
      state: state,
      street_address: street_address,
      years_in_business: years_in_business,
      zipcode: zipcode,
      created_at: created_at
    };


    this._firebaseService.addBusiness(newBusiness);

    this.changeState('default', '');
  }

  showEdit(business) {
    this.changeState('edit', business.$key);
    this.activeCategory = business.category;
    this.activeCompany = business.company;
    this.activeDescription = business.description;
    this.activeEmail = business.email;
    this.activePhone = business.phone;
    this.activeState = business.state;
    this.activeStreetAddress = business.street_address;
    this.activeYearsInBusiness = business.years_in_business;
    this.activeZipcode = business.zipcode;

  }

  updateBusiness() {
    var updBusiness = {
      category: this.activeCategory,
      company: this.activeCompany,
      description: this.activeDescription,
      email: this.activeEmail,
      phone: this.activePhone,
      state: this.activeState,
      street_address: this.activeStreetAddress,
      years_in_business: this.activeYearsInBusiness,
      zipcode: this.activeZipcode
    };

    this._firebaseService.updateBusiness(this.activeKey, updBusiness);

    this.changeState('default', '');
  }

  deleteBusiness(key) {
    this._firebaseService.deleteBusiness(key);

    this.changeState('default', '');
  }
}
