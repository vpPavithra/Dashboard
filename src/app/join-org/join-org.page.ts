import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state_district } from '../app.constants';

@Component({
  selector: 'app-join-org',
  templateUrl: './join-org.page.html',
  styleUrls: ['./join-org.page.scss'],
})
export class JoinOrgPage implements OnInit {

  items = [{ label: 'Organization Type', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
  { label: 'Sub Category', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
  { label: 'Organization Name', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
  { label: 'Designation', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
  { label: 'Level', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
  { label: 'Designation', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
  { label: 'Level', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true }]

  officalAdd = [
    { label: 'Address Line 1', type: 'text', options: [], placeholder: 'Enter Building number, Society', required: false },
    { label: 'Address Line 2', type: 'text', options: [], placeholder: 'Enter Area details', required: false },
    { label: 'States', type: 'select', options: [""], placeholder: 'Select', required: true },
    { label: 'District', type: 'select', options: [""], placeholder: 'Select', required: true },
    { label: 'Pincode', type: 'number', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'Mobile Number', type: 'tel', options: [""], placeholder: 'Enter Mobile Number', required: true },
    { label: 'E-mail', type: 'email', options: [""], placeholder: 'Enter Mobile Number', required: false },
  ]
  states: any
  districts: any
  selectedStates: any
  joinOrgForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.states = state_district.filter(state => state.type === "State").map(item => item.name)
    console.log("states ", this.states)
    this.handleDistricts()
    this.buildForm();
  }

  handleDistricts() {
    this.districts = [...new Set(this.states.filter((dist: any) => dist.name === this.selectedStates && dist.districts).flatMap((obj: any) => obj.districts))];
    console.log("state_district ", this.districts)
  }

  buildForm() {
    const group: any = {};

    this.items.forEach(item => {
      group[item.label] = item.required ? ['', Validators.required] : [''];
    });

    this.officalAdd.forEach((item, i) => {
      if (item.label == 'States') {
        this.officalAdd[i].options = this.states
      }
      if (item.label == 'District') {
        this.officalAdd[i].options = this.states
      }
      group[item.label] = item.required ? ((item.type == 'tel') ? ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]] : ['', Validators.required]) : [''];
    });

    console.log("item ", this.officalAdd);
    console.log("group ", group);
    this.joinOrgForm = this.formBuilder.group(group);
  }

  onSubmit() {
    if (this.joinOrgForm.valid) {
      console.log('Form Submitted:', this.joinOrgForm.value);
      // api call to join org
    }
  }

}
