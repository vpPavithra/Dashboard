import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
// import { AjaxService } from 'src/app/services/ajax/ajax.service';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { kiDesignations, kiNames, kiType, orgDesignation, orgNames } from 'src/app/app.constants';

@Component({
  selector: 'app-join-org',
  templateUrl: './join-org.page.html',
  styleUrls: ['./join-org.page.scss'],
})
export class JoinOrgPage implements OnInit, OnChanges {
  newField = { label: 'Level', id: 'level', type: 'select', options: [], placeholder: 'Select', required: true };
  itemsGov = [
    { label: 'Organization Type', id: 'organizationType', type: 'select', options: ["Government Organization", "Knowledge Institution"], placeholder: 'Select', required: true },
    { label: 'Sub Category', id: 'subCategory', type: 'select', options: ["Autonomous Body", "Block Panchayat", "communnity Health Centers", "Department", "District Hospital", "District Panchayat", "Ministry", "National Events", "Central Armed Police Force(CAPF)", "Police", "Primary Health Centers", "Rural Local Body", "States", "Urban Local Body"], placeholder: 'Select', required: true },
    { label: 'Type', id: 'type', type: 'select', options: ["type1", "tytpe2"], placeholder: 'Select', required: true },
    { label: 'Group', id: 'group', type: 'select', options: ["central", "state"], placeholder: 'Select', required: true },
    { label: 'Organization Name', id: 'organizationName', type: 'select', options: [], placeholder: 'Select', required: true },
    { label: 'Designation', id: 'designation', type: 'select', options: [], placeholder: 'Select', required: true }]

  itemsKI = [
    { label: 'Organization Type', id: 'organizationType', type: 'select', options: ["Government Organization", "Knowledge Institution"], placeholder: 'Select', required: true },
    { label: 'Institution Type', id: 'institutionType', type: 'select', options: ["Police", "Ministry", "Natioal Events", "States"], placeholder: 'Select', required: true },
    { label: 'Institution Name', id: 'institutionName', type: 'select', options: [], placeholder: 'Select', required: true },
    { label: 'Designation', id: 'kiDesignation', type: 'select', options: [], placeholder: 'Select', required: true },
    { label: 'Heirarchy Unit', id: 'heirarchyUnit', type: 'select', options: [], placeholder: 'Select', required: true }
  ]

  officalAdd = [
    { label: 'Name', id: 'screen_name', type: 'text', options: [], placeholder: '', disabled: true, value: '' },
    { label: 'Gender', id: 'gender', type: 'radio', options: ["Male", "Female", "Other"], placeholder: '', disabled: true, value: '' },
    { label: 'Address Line 1', id: 'addressLine1', type: 'text', options: [], placeholder: 'Enter Building number, Society', required: false },
    { label: 'Address Line 2', id: 'addressLine2', type: 'text', options: [], placeholder: 'Enter Area details', required: false },
    { label: 'State', id: 'state', type: 'select', options: [""], placeholder: 'Select', required: true },
    { label: 'District', id: 'district', type: 'select', options: [""], placeholder: 'Select', required: true },
    { label: 'Pincode', id: 'zip', type: 'number', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'Mobile Number', id: 'user_phone', type: 'tel', options: [""], placeholder: 'Enter Mobile Number', required: true },
    { label: 'E-mail', id: 'user_email', type: 'email', options: [""], placeholder: 'Enter Mobile Number', required: false },
  ]
  items: any = [];
  states: any
  districts: any
  selectedStates: any
  profile: any = "";
  orgType: string = ''
  dynamicForm!: FormGroup;
  orgStrtForm!: FormGroup;
  orgInfoForm!: FormGroup;
  showForm = false;
  constructor(private fb: FormBuilder,
    private navCtrl: NavController,
    private ajax: AjaxService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.orgType = 'gov';
    this.items = this.itemsGov;
    this.getProfile().then(profile => {
      console.log('profile ', profile)
      this.profile = profile
      this.setDefaultValues(['screen_name', 'gender', 'user_email', "user_phone", "zip"]);
    });
  }

  setDefaultValues(arr: Array<any>) {
    arr.forEach(a => {
      console.log('a ', a, this.profile[a])
      let nameCtrl = this.dynamicForm.get(a)
      nameCtrl?.setValue(this.profile[a])
      nameCtrl?.disable();
      this.cdr.detectChanges();
    })
  }

  getStateList() {
    let url = environment.getStates
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, {}, {}).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getDistritList(id: any) {
    let url = environment.getdistrictList
    let formDataObject: any = {};
    var formData = new FormData()
    formData.append('parent_id', id);
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': "Bearer " + this.auth.getToken(),
    });
    return new Promise((resolve, rej) => {
      this.http.post(url, { 'parent_id': id }, { headers }).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  async ngOnInit() {
    await this.getStateList().then((state: any) => {
      console.log('states ', state, Object.values(state))
      this.states = state
    })
    this.combineFormGroups()
  }

  combineFormGroups() {
    let form2 = this.createFormGroup(this.officalAdd, this.orgInfoForm)
    if (this.orgType == 'gov') {
      let form1 = this.createFormGroup(this.itemsGov, this.orgStrtForm)
      console.log('for1 ', form1.controls)
      this.dynamicForm = new FormGroup({
        ...form1.controls,
        ...form2.controls
      });
    } else if (this.orgType == 'ki') {
      let form1 = this.createFormGroup(this.itemsKI, this.orgStrtForm);
      this.dynamicForm = new FormGroup({
        ...form1.controls,
        ...form2.controls
      });
    }
    console.log("dynamicForm", this.dynamicForm);
    this.onFormChanges();
    this.showForm = true
  }

  createFormGroup(data: Array<any>, form: any) {
    console.log('createFormGroup ******** ', form)
    const group: any = {};
    data.forEach((item, i) => {
      if (item.id == 'screen_name') {
        group[item.id] = new FormControl({ value: '', disabled: true }, { updateOn: 'blur' });
      } else if (item.id == 'gender') {
        group[item.id] = new FormControl({ value: '', disabled: true }, { updateOn: 'blur' });
      } else if (item.id == 'user_phone') {
        group[item.id] = new FormControl('', { validators: [Validators.required, Validators.pattern(/^\d{10}$/)], updateOn: 'blur' })
      } else if (item.id == 'user_email') {
        group[item.id] = new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' })
      } else if (item.id == 'state') {
        data[i].options = Object.values(this.states)
        group[item.id] = item.required ? new FormControl('', { validators: [Validators.required], updateOn: 'change' }) : new FormControl('');
      } else {
        group[item.id] = item.required ? new FormControl('', { validators: [Validators.required], updateOn: 'change' }) : new FormControl('');
      }
    });
    form = this.fb.group(group);
    console.log("group ", group, form);
    return form
  }

  ngOnChanges(changes: any) {
    console.log('life cycle ', changes);
  }
  getProfile(): Promise<any> {
    let url = environment.getYuvaProfile
    let headers = {
      "content-type": "application/json"
    }
    let param = {}
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, param, headers).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  onFormChanges(): void {
    this.dynamicForm.valueChanges.pipe(
      tap((v: any) => {
        console.log('Form changed:', v);
        // console.log(this.dynamicForm);
        // this.handleFormChange(v);
      })
    ).subscribe();

    this.dynamicForm.get('organizationType')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        if (v == 'Government Organization') {
          if (this.orgType !== 'gov') {
            this.orgType = "gov";
            this.combineFormGroups();
          }
          this.setDefaultValues(['screen_name', 'gender', 'user_email', "user_phone", "zip"]);
          this.cdr.detectChanges();
          // TODO:
          // make API call to get Organization
          let org = await this.getOrgization(v)
          this.itemsGov.forEach((item: any, i: any) => {
            if (item.id == "organizationName") {
              console.log(typeof (orgNames), orgNames);
              item.options = orgNames.map(org => org.name)
            }
          })
        } else if (v == 'Knowledge Institution') {
          if (this.orgType !== 'ki') {
            this.orgType = "ki"
            this.combineFormGroups();
          }
          this.setDefaultValues(['screen_name', 'gender', 'user_email', "user_phone", "zip"]);
          this.cdr.detectChanges();
          // TODO:
          // make API call to get Organization
          // let org = await this.getKIInstitutionType()
          this.itemsKI.forEach((item: any, i: any) => {
            if (item.id == "institutionType") {
              console.log(typeof (kiType), kiType);
              item.options = kiType.map(org => org.label)
            }
          })
        }
      })
    ).subscribe();

    this.dynamicForm.get('institutionType')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api, https://devyuva.dl6.in/ministries/KI_join_institution_list, payload = state_id: 8, district_id: 193, institution_type: College
        this.itemsKI.forEach((item: any, i: any) => {
          if (item.id == "institutionName") {
            item.options = kiNames.map(org => org.label)
          }
        })
      })
    ).subscribe();

    this.dynamicForm.get('institutionName')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api- https://devyuva.dl6.in/ministries/KI_designation, payload = udise_aishe_code: OC-9632, selected_designation_id: null
        this.itemsKI.forEach((item: any, i: any) => {
          if (item.id == "kiDesignation") {
            item.options = kiDesignations.map(org => org.label)
          }
        })
      })
    ).subscribe();

    this.dynamicForm.get('kiDesignation')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api- https://devyuva.dl6.in/ministries/KI_designation, payload = udise_aishe_code: OC-9632, selected_designation_id: null
        this.itemsKI.forEach((item: any, i: any) => {
          if (item.id == "heirarchyUnit") {
            let unit: any = kiDesignations.find(org => org.label == v)
            item.options = unit['data-division_name'] ? unit['data-division_name']?.split(',') : ['']
          }
        })
      })
    ).subscribe();

    this.dynamicForm.get('organizationName')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        this.orgType = "gov"
        // TODO:
        // orgNames.filter(org => org.name == v)
        // make API call to get Organization
        let org = await this.getDesignation('')
        // console.log('org ', org)
        this.itemsGov.forEach((item: any, i: any) => {
          if (item.id == "designation") {
            item.options = orgDesignation.map(org => org.designation)
          }
        })
      })
    ).subscribe();

    this.dynamicForm.get('designation')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        this.orgType = "gov"
        // TODO:
        // orgNames.filter(org => org.name == v)
        // make API call to get Organization
        // let org = await this.getDivision('')
        // payload partner_type: Government, org_id: 112446, designation_id: 1141, rank: 1, parent_id: 0
        // console.log('org ', org)
        let res = orgDesignation.filter(org => org.designation === v)[0]
        let loop = Number(res.division_level)
        let item = this.itemsGov
        for (let i = 0; i <= loop - 1; i++) {
          item.push({ label: res.division_name + (i + 1), id: res.division_name.toLowerCase() + (i + 1), type: 'select', options: ["All"], placeholder: 'select', required: true })
        }
        this.itemsGov = item;
        this.itemsGov.forEach((item: any, i: any) => {
          if (item.id == "designation") {
            item.options = orgDesignation.map(org => org.designation)
          }
        })
      })
    ).subscribe();

    this.dynamicForm.get('state')?.valueChanges.pipe(
      tap(async (v: any) => {
        let res = Object.keys(this.states).find(key => this.states[key] === v);
        console.log('value on state change ', res);
        // api call
        this.districts = await this.getDistritList(res);
        console.log("district ", this.districts);
        this.officalAdd.forEach((ls, i) => {
          if (ls.id == 'district') {
            ls.options = this.districts.map((item: any) => item.name);
            this.officalAdd[i].options = this.districts.map((item: any) => item.name);
          }
        })
      })
    ).subscribe();
  }

  async getOrgization(type?: string) {
    console.log("api call ", type)
    try {
      let headers = {
        "accept": "*",
        "x-requested-with": "XMLHttpRequest",
        "responseType": 'text',
        'content-type': 'application/json',
        'Authorization': "Bearer " + this.auth.getToken(),
      }
      let param = { "org_type": "Government" }
      return new Promise((resolve, rej) => {
        this.http.post(environment.getOrganisations, param, { headers }).subscribe((res: any) => {
          console.log("res ", res);

          if (res.status_code == 200) {
            return resolve(res.data);
          }
        });
      })
      // await this.ajax.postMethod(environment.getOrganisations, param,
      //   headers).subscribe((res: any) => {
      //     const parser = new DOMParser();
      //     const doc = parser.parseFromString(res, 'text/html');

      //     console.log('res ', doc)
      //     this.dynamicForm.get('organizationName')?.setValue(res);
      //   })
      // this.http.post('https://devyuva.dl6.in/ministries/getOrganisation', "partner_type=Government", { headers }).subscribe(res => {
      //   console.log('res ', res);
      // }
      // );
    }
    catch (err) {
      console.log("error ", err);
      return;
    }
  }

  getDesignation(id: string) {
    console.log('designation ******* ');
    let headers = {
      "accept": "*",
      "x-requested-with": "XMLHttpRequest",
      "responseType": 'text',
      'content-type': 'application/json',
      'Authorization': "Bearer " + this.auth.getToken(),
    }
    let url = environment.getDesignation
    return new Promise((resolve, rej) => {
      return new Promise((resolve, rej) => {
        this.http.post(url, { "org_id": "13" }, { headers }).subscribe((res: any) => {
          console.log("res ", res);

          if (res.status_code == 200) {
            return resolve(res.data);
          }
        });
      })
      // this.ajax.postMethod(url, {
      //   "org_id": "13"
      // }, {}).subscribe((res: any) => {
      //   if (res.status_code == 200) {
      //     return resolve(res.data);
      //   }
      // });
    })
  }

  getKIInstitutionType() {
    let url = environment.getKiInstitutionType
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, {
        "selected_institution_type": null
      }, {}).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form Submitted', this.dynamicForm.value);
      // Handle form submission, e.g., sending data to server
    } else {
      console.log('Form is invalid');
    }
  }

  navigateBack() {
    this.navCtrl.back()
  }
}
