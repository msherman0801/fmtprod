import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service'
import { compare } from '../shared/helpers/compare'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private mainService:MainService) { }

  originalEstablishmentList:Array<object>;
  establishmentList:Array<object>;
  errorMessage:string;
  loading:boolean = true;
  currentLocation:any;
  originalLocation:object = {name: 'Ashfield', administrative: "Massachusetts"};

  ngOnInit(): void {
    this.mainService.getEstablishmentsByLocation(this.originalLocation).subscribe(
      arr => {
        if (arr.length == 0) {
          this.errorMessage = "There are no food establishments in the selected location!"
        }
        this.originalLocation = arr[0].location
        this.currentLocation = this.originalLocation
        this.loading = false;
        this.establishmentList = arr
        this.originalEstablishmentList = arr
      },
      err => this.errorMessage = err
    )
  }

  updateFilters(arr) {
    this.loading = true
    this.errorMessage = null
    let filters = arr.map(e => e.filter)
    if (filters.length == 0) {
      this.loading = false
      this.establishmentList = this.originalEstablishmentList
      this.currentLocation = this.originalLocation;
    } else if (filters.length == 1) {
      switch (arr[0].type) {
        case "location": 
            this.establishmentList = null
            this.mainService.getEstablishmentsByLocation(filters[0]).subscribe(
                arr =>{ 
                  this.establishmentList = arr;
                  this.loading = false;
                  this.currentLocation = {name: filters[0].name, administrative: filters[0].administrative, type: filters[0].type}
                },
            err => console.log(err)
          );
          break;
        case "dateTime":
          this.filterSetBy("dateTime", filters)
          this.loading = false;
          break;
        case "cuisine": 
          this.filterSetBy("cuisine", filters)
          this.loading = false;
          break;
        }
    } else {
      this.filterSetBy("location", arr)
    }
  }

  filterSetBy(type, filters) {
     if (type == "dateTime") {
       this.establishmentList = this.filterSetByDateTime(this.originalEstablishmentList, filters[0])
     } else if (type == "cuisine") {
       this.establishmentList = this.filterSetByCuisine(this.originalEstablishmentList, filters[0])
     } else if (type == "location") {
       if (filters[0].type == "location") {
         let currLoc = {name: this.currentLocation['name'], administrative: this.currentLocation['administrative'], type: this.currentLocation['type']}
         let filterLoc = {name: filters[0].filter['name'], administrative: filters[0].filter['administrative'], type: filters[0].filter['type']}
         if (compare(currLoc, filterLoc)) {
            filters.shift()
            for (let filter of filters) {
              if (filter.type == "dateTime") this.establishmentList = this.filterSetByDateTime(this.establishmentList, filter.filter)
              else if (filter.type == "cuisine") this.establishmentList = this.filterSetByCuisine(this.establishmentList, filter.filter)
            }
            this.loading = false
         } else {
            this.mainService.getEstablishmentsByLocation(filters[0].filter).subscribe(
              arr => { 
                this.establishmentList = arr;
                this.loading = false;
                this.currentLocation = {name: filters[0].filter.name, administrative: filters[0].filter.administrative, type: filters[0].filter.type}
                filters.shift()
                for (let filter of filters) {
                  if (filter.type == "dateTime") this.establishmentList = this.filterSetByDateTime(this.establishmentList, filter.filter)
                  else if (filter.type == "cuisine") this.establishmentList = this.filterSetByCuisine(this.establishmentList, filter.filter)
                }
              },
              err => console.log(err)
            );
         }
       }
     }
  }

  filterSetByDateTime(list, filter) {
    return list.filter(e => {
      let dt = e.dateTime
      for (let j = 0; j < dt.length; j++) {
        if (this.checkDateTime(dt[j], filter)) return e
      }
    })
  }

  filterSetByCuisine(list, filter) {
    return list.filter(e => {
      return e.type == filter
    })
  }

  checkDateTime(obj1, obj2) {
    return obj1.day == obj2.day && obj1.openingTime.time == obj2.openingTime.time
    && obj1.openingTime.zone == obj2.openingTime.zone && obj1.closingTime.time == obj2.closingTime.time
    && obj1.closingTime.zone == obj2.closingTime.zone
  }


}
