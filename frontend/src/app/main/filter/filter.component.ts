import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor() {
    this.dateTimeFilter = {day: '', openingTime: {time:'', zone:'' }, closingTime: {time:'', zone:'' }}
   }

  filterType:string;
  openingTime:boolean;
  closingTime:boolean;
  locFilter:object;
  dateTimeFilter;
  cuisineFilter:string;

  filtersIdCount:number = 1
  filterChips:Array<object> = []

  @Output()
  onChange = new EventEmitter();
  filters:Array<any> = [];

  changeFilterType(type) {
    this.filterType = type
  }

  addFilter() {
    let pendingFilter = this.setPendingFilter()
    let toBeConcatted = [{id: this.filtersIdCount, text: pendingFilter.text}]
    this.filterChips = this.filterChips.concat(toBeConcatted)
    if (pendingFilter.type == "location") this.filters.unshift({id: this.filtersIdCount, type: pendingFilter.type, filter: pendingFilter.filter})
    else this.filters.push({id: this.filtersIdCount, type: pendingFilter.type, filter: pendingFilter.filter})
    this.filtersIdCount += 1
    this.onChange.emit(this.filters)
  }

  setPendingFilter() {
    if (this.locFilter) return {type: 'location', filter: this.locFilter, text: this.locFilter['name']}
    if (this.checkDateTimeFilter()) return {type: 'dateTime', filter: this.dateTimeFilter, text: this.dateTimeFilter.day + " " + this.dateTimeFilter.openingTime.time + this.dateTimeFilter.openingTime.zone
    + " - " + this.dateTimeFilter.closingTime.time + this.dateTimeFilter.closingTime.zone}
    if (this.cuisineFilter) return {type: 'cuisine', filter: this.cuisineFilter, text: this.cuisineFilter}
  }

  removeChips() {
    // this.filterChips = this.filterChips.filter(a => a['id'] != id);
    // this.filters = this.filters.filter(a => a['id'] != id);
    this.filterChips = []
    this.filters = []
    this.onChange.emit(this.filters)
  }

  clearPendingFilters() {
    this.filterType = null, this.locFilter = null, this.cuisineFilter = null;
    this.dateTimeFilter = {day: '', openingTime: {time:'', zone:'' }, closingTime: {time:'', zone:'' }};
  }

  checkDateTimeFilter() {
    return this.dateTimeFilter.day.length > 0 && this.dateTimeFilter.openingTime.time.length > 0 && this.dateTimeFilter.openingTime.zone.length > 0
            && this.dateTimeFilter.closingTime.time.length > 0 && this.dateTimeFilter.closingTime.zone.length > 0
  }

  ngOnInit(): void {  }

}
