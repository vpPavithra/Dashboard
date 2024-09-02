import { Component, Input, OnInit } from '@angular/core';
import { govOrgStructure, orgContactInfo, orgOffDetails } from 'src/app/app.constants';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() formData: any
  constructor() { }
  desc = ''
  orgStr: any = []
  offAdd: any = []
  contactInfo: any = []
  nomineeInfo: any = []
  personalInfo: any = []
  ngOnInit() {
    console.log("formData ", this.formData);
    this.mapUIData()

  }

  mapUIData() {
    let val = this.formData?.value
    this.desc = val.about
    govOrgStructure.forEach(str => {
      let obj = { key: "", value: "" }
      obj.key = str.label;
      obj.value = val[str.id]
      this.orgStr.push(obj)
    })

    orgOffDetails.forEach(str => {
      let obj = { key: "", value: "" }
      obj.key = str.label;
      obj.value = val[str.id]
      this.offAdd.push(obj)
    })
    orgContactInfo.forEach(str => {
      let obj = { key: "", value: "" }
      obj.key = str.label;
      obj.value = val[str.id]
      this.contactInfo.push(obj)
    })
  }

  download() {

  }
}
