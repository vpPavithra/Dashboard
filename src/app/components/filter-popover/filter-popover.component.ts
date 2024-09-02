import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { state_district } from '../../app.constants';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss']
})
export class FilterPopoverComponent implements OnInit {
  selectedStates = "all"
  selectedDistrict = "all"
  states: any
  districts: any
  filteredData = []
  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.states = state_district.filter(state => state.type === "State")
    console.log("states ", this.states)
  }

  handleDistricts() {
    this.districts = [...new Set(this.states.filter((dist: any) => dist.name === this.selectedStates && dist.districts).flatMap((obj: any) => obj.districts))];
    console.log("state_district ", this.districts)
  }

  async close() {
    await this.popoverCtrl.dismiss()
  }

  async applyFilter() {
    console.log("selceted state ", this.selectedStates, this.selectedDistrict)
    let data = []
    if (this.selectedDistrict !== "all") {
      data.push(this.selectedDistrict)
    }
    if (this.selectedStates !== "all") {
      data.push(this.selectedStates)
    }
    await this.popoverCtrl.dismiss(data)
  }
}
