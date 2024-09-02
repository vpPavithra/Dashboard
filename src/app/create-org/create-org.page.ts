import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, GalleryPhotos } from '@capacitor/camera';
import { AlertController, NavController } from '@ionic/angular';
import { tap } from 'rxjs';
import { createOrgSeg, govOrgStructure, kiOrgStructure, kiSubCat, kiType, nomineeDetails, orgContactInfo, orgNames, orgOffDetails, personalDetails } from 'src/app/app.constants';
import { AjaxService } from 'src/app/services/ajax/ajax.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.page.html',
  styleUrls: ['./create-org.page.scss'],
})
export class CreateOrgPage implements OnInit {
  // Data import from connstants file
  segments = createOrgSeg
  itemsGov = govOrgStructure
  itemsKI = kiOrgStructure
  officalAdd = orgOffDetails
  contactInfo = orgContactInfo
  nomineeDet = nomineeDetails
  PersonalDet = personalDetails

  createGovForm!: FormGroup; // final form to submit
  createKIForm!: FormGroup; // final form to submit
  dynamicCreateForm!: FormGroup;
  // inner forms
  orgImgForm!: FormGroup;
  orgStrtForm!: FormGroup;
  orgInfoForm!: FormGroup;
  contactInfoForm!: FormGroup;
  // only for KI
  nomineeForm!: FormGroup;
  personalInfoForm!: FormGroup;
  docDetForm!: FormGroup;

  segment: string
  orgType: string
  orgStr: any = [];
  kiStr: any = [];
  selectedFile: any;
  preview = false
  states: any
  districts: any
  localBodies: any
  selectedStates: any
  profile: any = "";
  showNomineeDet = false;
  showForm = false;
  logoImg = 'assets/images/default-logo.jpg';
  imageUrl: any = 'https://publish.nstu.ru/bitrix/templates/aspro-scorp/images/background.png';
  searchQuery: any
  options: Array<any>
  uploadedFileList: Array<any> = []
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private ajax: AjaxService,
    private ngZone: NgZone,
    private auth: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController
  ) {
    this.options = [{ val: 'I am a Vice Chancellor of Institution', isChecked: false }]
    this.orgStr = govOrgStructure
    this.kiStr = kiOrgStructure
    this.segment = createOrgSeg[0].value
    this.orgType = "gov"
    this.getProfile().then(profile => {
      console.log('profile ', profile)
      this.profile = profile
      this.setDefaultValues(['screen_name', "user_email"], this.profile);
    });
  }
  setDefaultValues(arr: Array<any>, data: any) {
    arr.forEach(a => {
      console.log('a ', a, this.profile[a])
      let ctrlInfo = this.dynamicCreateForm?.get(a)
      if (a == 'screen_name' || a == 'person_name') {
        ctrlInfo?.setValue(data['screen_name'])
      }
      if (a == 'user_email' || a == 'person_email') {
        ctrlInfo?.setValue(data['user_email'])
      }
      if (a == 'person_mobile') {
        ctrlInfo?.setValue(data['user_phone'])
      }
      if (a == 'person_gender') {
        ctrlInfo?.setValue(data['gender'])
      }
      if (a == 'dob') {
        ctrlInfo?.setValue(data['dob'])
      }
      if (a == 'person_state') {
        // state_id = get state and bind
        ctrlInfo?.setValue(data['state'])
      }
      if (a == 'person_district') {
        // city_id = get district and bind
        ctrlInfo?.setValue(data['district'])
      }
      if (a == 'person_pincode') {
        ctrlInfo?.setValue(data['zip'])
      }
      if (a == 'person_address') {
        ctrlInfo?.setValue(data['address'])
      }
      ctrlInfo?.disable();
      this.cdr.detectChanges();
    })
  }

  async ngOnInit() {
    try {
      await this.getStateList().then((state: any) => {
        this.states = state
      })
      await this.getBlock().then();
      await this.getPanchayat().then();
      await this.getVillage().then();
      // await this.getLocalBody().then();

      // await this.getInstitutionType().then((res) => {
      //   console.log("val 1 ", res);
      // })
      // await this.getDivision().then((res) => {
      //   console.log("val 2 ", res);
      // })
      // await this.getDesignation().then((res) => {
      //   console.log("val 3 ", res);
      // })
      // await this.getOrgList().then((res) => {
      //   console.log("val 4 ", res);
      // })
    }
    catch (err) {
      console.log("error ", err);
    }
    this.combineFormGroups()
  }

  combineFormGroups() {
    let form0 = new FormGroup({
      banner: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      logo: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      orgTitle: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      about: new FormControl('', { validators: [Validators.required], updateOn: 'blur' })
    })
    let form6 = new FormGroup({
      fileUpload: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    })
    let form1 = this.createFormGroup(this.itemsGov, this.orgStrtForm)
    let form2 = this.createFormGroup(this.officalAdd, this.orgInfoForm);
    let form3 = this.createFormGroup(this.contactInfo, this.contactInfoForm);
    let form4 = this.createFormGroup(this.nomineeDet, this.nomineeForm);
    let form5 = this.createFormGroup(this.PersonalDet, this.personalInfoForm);
    let formKi = this.createFormGroup(this.itemsKI, this.orgStrtForm);
    console.log("form 5 personal info ", form5);
    if (this.orgType == 'gov') {
      this.dynamicCreateForm = new FormGroup({
        ...form0.controls,
        ...form1.controls,
        ...form2.controls,
        ...form3.controls,
        ...form6.controls
      });
    } else if (this.orgType == 'ki') {
      this.dynamicCreateForm = new FormGroup({
        ...form0.controls,
        ...formKi.controls,
        ...form2.controls,
        ...form3.controls,
        ...form4.controls,
        ...form5.controls,
        ...form6.controls
      });
    }
    console.log("dynamicCreateForm", this.dynamicCreateForm);
    if (this.orgType == 'ki') {
      console.log("control info ", this.dynamicCreateForm);
      // this.addPersonalInfo();
    }
    this.onFormChanges();
    this.showForm = true
  }

  // get personalInfoArray(): FormArray {
  //   return this.dynamicCreateForm.get('personalInfo') as FormArray;
  // }

  // addPersonalInfo(): void {
  //   this.personalInfoArray.push(this.createPersonalInfoGroup());
  //   console.log("control info after push ", this.dynamicCreateForm, this.personalInfoArray);
  // }

  createPersonalInfoGroup(): FormGroup {
    return new FormGroup({
      info: new FormControl(false, { validators: [Validators.required], updateOn: 'change' }),
    });
  }

  createFormGroup(data: Array<any>, form: any) {
    console.log('createFormGroup ******** ', form)
    const group: any = {};
    data.forEach((item, i) => {
      if (item.type == 'checkbox') {
        group[item.id] = new FormArray([new FormGroup({
          info: new FormControl(false, { validators: [Validators.required], updateOn: 'change' }),
        })])
        if (item.id == 'personalInfo') {
          console.log('group checkbox ', group);
        }
        if (item.id == 'instituteId') {
          group[item.id] = new FormArray([new FormGroup({
            instId: new FormControl(false, { validators: [Validators.required], updateOn: 'change' }),
          })])
          console.log('group checkbox ', group);
        }
      }
      if (item.id == 'instituteIdSearch') {
        group[item.id] = new FormControl({ value: '', disabled: true }, { updateOn: 'change' });
      }
      if (item.id == 'screen_name') {
        group[item.id] = new FormControl({ value: '', disabled: true }, { updateOn: 'blur' });
      } else if (item.id == 'gender') {
        group[item.id] = new FormControl({ value: '', disabled: true }, { updateOn: 'blur' });
      } else if (item.id == 'mobile' || item.id == 'person_mobile' || item.id == 'nomineeMobile') {
        group[item.id] = new FormControl('', { validators: [Validators.required, Validators.pattern(/^\d{10}$/)], updateOn: 'blur' })
      } else if (item.id == 'user_email' || item.id == 'person_email' || item.id == 'nomineeEmail') {
        group[item.id] = new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' })
      } else if (item.id == 'state' || item.id == 'person_state') {
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
    console.log("formData ", { 'parent_id': id }, JSON.stringify(formDataObject));

    return new Promise((resolve, rej) => {
      this.http.post(url, { 'parent_id': id }, { headers }).subscribe((res: any) => {
        console.log("res ", res);

        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getLocalBody(data: any) {
    let url = 'https://9e41-122-161-243-69.ngrok-free.app/api/getLocalBody'
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': "Bearer " + this.auth.getToken(),
    });

    return new Promise((resolve, rej) => {
      this.http.post(url, data, { headers }).subscribe((res: any) => {
        console.log("res ", res);

        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }


  getBlock(id?: any) {
    let url = 'https://9e41-122-161-243-69.ngrok-free.app/api/getBlockList'
    let formDataObject: any = {};
    var formData = new FormData()
    formData.append('parent_id', id);
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': "Bearer " + this.auth.getToken(),
    });
    console.log("formData ", { 'parent_id': id }, JSON.stringify(formDataObject));

    return new Promise((resolve, rej) => {
      this.http.post(url, {
        "district_id": "283"
      }, { headers }).subscribe((res: any) => {
        console.log("res ", res);

        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getPanchayat(id?: any) {
    let url = 'https://9e41-122-161-243-69.ngrok-free.app/api/getPanchayatList'
    let formDataObject: any = {};
    var formData = new FormData()
    formData.append('parent_id', id);
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': "Bearer " + this.auth.getToken(),
    });
    console.log("formData ", { 'parent_id': id }, JSON.stringify(formDataObject));

    return new Promise((resolve, rej) => {
      this.http.post(url, {
        "district_id": "283",
        "block_id": "6996"
      }, { headers }).subscribe((res: any) => {
        console.log("res ", res);

        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getVillage(id?: any) {
    let url = 'https://9e41-122-161-243-69.ngrok-free.app/api/getVillageList'
    let formDataObject: any = {};
    var formData = new FormData()
    formData.append('parent_id', id);
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': "Bearer " + this.auth.getToken(),
    });
    console.log("formData ", { 'parent_id': id }, JSON.stringify(formDataObject));

    return new Promise((resolve, rej) => {
      this.http.post(url, {
        "panchayat_name": "Anderhama"
      }, { headers }).subscribe((res: any) => {
        console.log("res ", res);

        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }
  getOrgList() {
    let url = environment.getOrganisations
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, { "org_id": 125, "list_type": 1 }, {}).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getDesignation() {
    let url = environment.getDesignation
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, {
        "org_id": "13"
      }, {}).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getDivision() {
    let url = environment.getDivision
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, { "org_id": "13", "designation_id": "SP/DSP", "parent_id": 0 }, {}).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  getInstitutionType() {
    let url = environment.getInstitution
    return new Promise((resolve, rej) => {
      this.ajax.postMethod(url, {}, {}).subscribe((res: any) => {
        if (res.status_code == 200) {
          return resolve(res.data);
        }
      });
    })
  }

  onFormChanges(): void {
    this.dynamicCreateForm.valueChanges.pipe(
      tap((v: any) => {
        console.log('Form changed:', v);
        // console.log(this.dynamicCreateForm);
        // this.handleFormChange(v);
      })
    ).subscribe();

    this.dynamicCreateForm.get('orgTitle')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        let nameCtrl = this.dynamicCreateForm.get('orgName')
        nameCtrl?.setValue(v)
        nameCtrl?.disable();
        this.cdr.detectChanges();
      })).subscribe();

    this.dynamicCreateForm.get('category')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        if (v == 'Government Organization') {
          if (this.orgType !== 'gov') {
            this.orgType = "gov";
            // this.itemsGov = this.orgStr
            this.combineFormGroups();
          }
          // this.setDefaultValues(['screen_name', 'gender', 'user_email', "user_phone", "zip"]);
          this.cdr.detectChanges();
          // TODO:
          // make API call to get Organization
          // let org = await this.getOrgization()
          // payload type = partner_type: Government
          this.itemsGov.forEach((item: any, i: any) => {
            if (item.id == "organizationName") {
              item.options = orgNames.map(org => org.name)
            }
          })
        } else if (v == 'Knowledge Institution') {
          if (this.orgType !== 'ki') {
            this.orgType = "ki"
            // this.itemsKI = this.kiStr
            this.combineFormGroups();
          }
          this.dynamicCreateForm.get('instituteIdSearch')?.disable();
          this.itemsKI.forEach((item, i) => {
            if (item.id == 'institutionOtherCategory' || item.id == 'institutionOtherCategory') {
              this.itemsKI.splice(i, 1)
            }
          })
          this.dynamicCreateForm.removeControl('institutionOtherCategory');
          this.dynamicCreateForm.removeControl('otherInstitutionName');
          // this.setDefaultValues(['screen_name', 'gender', 'user_email', "user_phone", "zip"]);
          this.cdr.detectChanges();
          // TODO:
          // make API call to get Organization
          // let org = await this.getKIInstitutionType()
          //  payload - selected_institution_type: null
          this.itemsKI.forEach((item: any, i: any) => {
            if (item.id == "institutionType") {
              console.log(typeof (kiType), kiType);
              item.options = kiType.map(org => org.label)
            }
          })
        }
      })
    ).subscribe();

    this.dynamicCreateForm.get('institutionType')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        let instCat = { label: 'Institution SubCategory', id: 'institutionSubCategory', type: 'select', options: [], placeholder: '- - Select Institution SubCategory - -', required: true };
        let instGroup = { label: 'Institution Group', id: 'institutionGroup', type: 'select', options: [], placeholder: '- -Select Institution Group - -', required: true };
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api, https://devyuva.dl6.in/ministries/KI_sub_category_list, payload = parent_id: 46, selected_org_subcategory: null
        // https://devyuva.dl6.in/ministries/KI_institution_list , payload = state_id: 1, district_id: 38, institution_type: College
        let instList = [{ id: "10503", "data-aishe_code": "C-6547", label: "Mahatma Gandhi Govt. College" }]
        this.itemsKI.forEach((item: any, i: any) => {
          if (v == 'College' || v == 'School' || v == 'University') {
            if (item.id == 'institutionType') {
              if (this.itemsKI[i + 1].id !== 'institutionSubCategory') {
                this.itemsKI.splice(i + 1, 0, instCat)
                this.dynamicCreateForm.addControl('institutionSubCategory', new FormControl('', { validators: [Validators.required], updateOn: 'change' }))
              }
              if (this.itemsKI[i + 2].id !== 'institutionGroup') {
                this.itemsKI.splice(i + 2, 0, instGroup)
                this.dynamicCreateForm.addControl('institutionGroup', new FormControl('', { validators: [Validators.required], updateOn: 'change' }))
              }
            }
            if (item.id == "instituteId") {
              item.label = (v == 'College' && v == 'University') ? 'I have a AISHE ID' : 'I have a UDISE CODE'
            }
            if (item.id == "instituteIdSearch") {
              item.placeholder = (v == 'College' && v == 'University') ? 'AISHE ID' : 'UDISE ID'
            }
            if (item.id == "institutionSubCategory") {
              item.options = kiSubCat.map(org => org.label)
            }
            if (item.id == 'institutionGroup') {
              if (v !== 'University') {
                item.options = v == 'College' ? ["Technical", "Non-Technical", "Both"] : ["High", "Middle", "Secondary"]
              } else {

                this.itemsKI.splice(i, 1)
                this.dynamicCreateForm.removeControl('institutionGroup')
              }
            }
          } else if (v == 'ITI' || v == "Polytechnic") {
            if (item.id == "instituteId") {
              item.label = v == 'ITI' ? 'I have a ITI CODE' : 'I have a URISE CODE'
            }
            if (item.id == "instituteIdSearch") {
              item.placeholder = v == 'ITI' ? 'ITI CODE' : 'URISE CODE'
            }
            this.itemsKI.forEach((item, i) => {
              if (item.id == 'institutionSubCategory' || item.id == 'institutionGroup') {
                this.itemsKI.splice(i, 1)
              }
            })
            this.dynamicCreateForm.removeControl('institutionSubCategory')
            this.dynamicCreateForm.removeControl('institutionGroup')
          }
          if (item.id == 'institutionName') {
            item.options = instList.map(ls => ls.label)
          }
        })
        this.cdr.detectChanges();
      })).subscribe();

    this.dynamicCreateForm.get('institutionSubCategory')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        if (v == 'Others') {
          let obj = { label: '', id: 'institutionOtherCategory', type: 'text', options: [], placeholder: 'Sub Category Others', required: true };
          this.itemsKI.forEach((item, i) => {
            if (item.id == 'institutionSubCategory') {
              this.itemsKI.splice(i + 1, 0, obj)
            }
          })
          this.dynamicCreateForm.addControl('institutionOtherCategory', new FormControl('', { validators: [Validators.required], updateOn: 'change' }));
        }
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api- https://devyuva.dl6.in/ministries/KI_designation, payload = udise_aishe_code: OC-9632, selected_designation_id: null
        // this.itemsKI.forEach((item: any, i: any) => {
        //   if (item.id == "kiDesignation") {
        //     // item.options = kiDesignations.map(org => org.label)
        //   }
        // })
      })
    ).subscribe();

    this.dynamicCreateForm.get('institutionName')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        if (v == 'Others') {
          let obj = { label: '', id: 'otherInstitutionName', type: 'text', options: [], placeholder: 'Other Institution Name', required: true };
          this.itemsKI.forEach((item, i) => {
            if (item.id == 'institutionSubCategory') {
              this.itemsKI.splice(i + 1, 0, obj)
            }
          })
          this.dynamicCreateForm.addControl('otherInstitutionName', new FormControl('', { validators: [Validators.required], updateOn: 'change' }));
        }
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api- https://devyuva.dl6.in/ministries/KI_designation, payload = udise_aishe_code: OC-9632, selected_designation_id: null
        this.itemsKI.forEach((item: any, i: any) => {
          if (item.id == "kiDesignation") {
            // item.options = kiDesignations.map(org => org.label)
          }
        })
      })
    ).subscribe();

    this.dynamicCreateForm.get('kiDesignation')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api- https://devyuva.dl6.in/ministries/KI_designation, payload = udise_aishe_code: OC-9632, selected_designation_id: null
        this.itemsKI.forEach((item: any, i: any) => {
          if (item.id == "heirarchyUnit") {
            // let unit: any = kiDesignations.find(org => org.label == v)
            // item.options = unit['data-division_name'] ? unit['data-division_name']?.split(',') : ['']
          }
        })
      })
    ).subscribe();

    this.dynamicCreateForm.get('organizationName')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        this.orgType = "gov"
        // TODO:
        // orgNames.filter(org => org.name == v)
        // make API call to get Organization
        // let org = await this.getDesignation('')
        // console.log('org ', org)
        this.itemsGov.forEach((item: any, i: any) => {
          if (item.id == "designation") {
            // item.options = orgDesignation.map(org => org.designation)
          }
        })
      })
    ).subscribe();

    this.dynamicCreateForm.get('designation')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        this.orgType = "gov"
        // TODO:
        // orgNames.filter(org => org.name == v)
        // make API call to get Organization
        // let org = await this.getDivision('')
        // payload partner_type: Government, org_id: 112446, designation_id: 1141, rank: 1, parent_id: 0
        // console.log('org ', org)
        // let res = orgDesignation.filter(org => org.designation === v)[0]
        // let loop = Number(res.division_level)
        // let item = this.itemsGov
        // for (let i = 0; i <= loop - 1; i++) {
        //   item.push({ label: res.division_name + (i + 1), id: res.division_name.toLowerCase() + (i + 1), type: 'select', options: ["All"], placeholder: 'select', required: true })
        // }
        // this.itemsGov = item;
        // this.itemsGov.forEach((item: any, i: any) => {
        //   if (item.id == "designation") {
        //     item.options = orgDesignation.map(org => org.designation)
        //   }
        // })
      })
    ).subscribe();

    this.dynamicCreateForm.get('state')?.valueChanges.pipe(
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

    this.dynamicCreateForm.get('district')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log("this.districts ", v);
        let districtId = ''
        this.districts.forEach((dist: any) => {
          if (dist.name == v) {
            districtId = dist.id
          }
        });
        console.log("districtId ", districtId);

        let state = this.dynamicCreateForm.get('state')?.value
        let stateId = Object.keys(this.states).find(key => this.states[key] === state);
        console.log('value on state change ', stateId, districtId);
        // api call
        this.localBodies = await this.getLocalBody({
          "state_id": stateId,
          "city_id": districtId
        });
        console.log("district ", this.localBodies);
        this.officalAdd.forEach((ls, i) => {
          if (ls.id == 'localBody') {
            ls.options = this.localBodies.map((item: any) => item.name);
            this.officalAdd[i].options = this.localBodies.map((item: any) => item.name);
          }
        })
      })
    ).subscribe();

    this.dynamicCreateForm.get('nominee')?.valueChanges.pipe(
      tap(async (v: any) => {
        // this.onRadioChange(value);
        console.log('****** radio ', v)
        this.showNomineeDet = true
      })
    ).subscribe();

    this.dynamicCreateForm.get('personalInfo')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        // TODO:
        // make API call to get Organization
        // let org = await this.getKIInstitutionType()
        // api- https://devyuva.dl6.in/ministries/KI_designation, payload = udise_aishe_code: OC-9632, selected_designation_id: null
        // this.itemsKI.forEach((item: any, i: any) => {
        //   if (item.id == "kiDesignation") {
        //     // item.options = kiDesignations.map(org => org.label)
        //   }
        // })
      })
    ).subscribe();

    this.dynamicCreateForm.get('area')?.valueChanges.pipe(
      tap(async (v: any) => {
        if (v == "Rural") {
          let obj1 = { label: 'Block', id: 'block', type: 'select', options: [], placeholder: '- - Select Block - -', required: true };
          let obj2 = { label: 'Panchayat', id: 'panchayat', type: 'select', options: [], placeholder: '- - Select Panchayat - -', required: true }
          let obj3 = { label: 'Village', id: 'village', type: 'select', options: [], placeholder: '- - Select Village - -', required: true }
          this.officalAdd.forEach((item, i) => {
            if (item.id == 'localBody') {
              this.officalAdd.splice(i, 1)
              this.officalAdd.splice(i, 0, obj1)
              this.officalAdd.splice(i + 1, 0, obj2)
              this.officalAdd.splice(i + 2, 0, obj3)
            }
          })
          this.dynamicCreateForm.addControl('block', new FormControl('', { validators: [Validators.required], updateOn: 'change' }))
          this.dynamicCreateForm.addControl('panchayat', new FormControl('', { validators: [Validators.required], updateOn: 'change' }))
          this.dynamicCreateForm.addControl('village', new FormControl('', { validators: [Validators.required], updateOn: 'change' }))
          this.dynamicCreateForm.removeControl('localBody')
        } else if (v == "Urban") {
          this.dynamicCreateForm.removeControl('block')
          this.dynamicCreateForm.removeControl('panchayat')
          this.dynamicCreateForm.removeControl('village')
          let obj = { label: 'Local Body', id: 'localBody', type: 'select', options: [], placeholder: '- - Select local body - -', required: true }
          this.officalAdd.forEach((item, i) => {
            if (item.id == 'block') {
              this.officalAdd.splice(i, 3)
              this.officalAdd.splice(i, 0, obj)
            }
          })
          this.dynamicCreateForm.addControl('localBody', new FormControl('', { validators: [Validators.required], updateOn: 'change' }))
        }
        this.cdr.detectChanges()
      })
    ).subscribe()
  }

  handleNominee(event: any) {
    console.log('****** radio ', event.detail.value)
    this.showNomineeDet = event.detail.value == 'No' ? false : true
    let nominee = this.dynamicCreateForm.get('nominee')
    nominee?.setValue(event.detail.value)
    nominee?.enable();
    this.cdr.detectChanges();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = this.selectedFile.name;
    }
    console.log('Selected file:', this.selectedFile);
    this.uploadedFileList.push(this.selectedFile)
  }

  triggerFileInput(id: string) {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
  }

  async changeImage(event: any, id: string) {
    const res: GalleryPhotos = await Camera.pickImages({ limit: 1 });
    if (id == 'banner') {
      this.imageUrl = res.photos[0].webPath;
    } else if (id == 'logo') {
      this.logoImg = res.photos[0].webPath;
    }
  }
  switchSegment(event: any) {
    this.segment = event.detail.value
  }

  handleCheckboxInfo(event: any, id: string) {
    let val = this.dynamicCreateForm.get(id)?.value
    console.log('event ', event, val);
    if (event.detail.checked) {
      this.dynamicCreateForm.get(id)?.setValue(event.detail.checked);
      if (id == 'personalInfo') {
        this.dynamicCreateForm.removeControl('designation');
        this.setDefaultValues(['person_name', "gender", "dob", "person_mobile", "person_email", "person_state", "person_district", "person_pincode", "person_address"], this.profile);
      } else if (id == 'instituteId') {
        this.dynamicCreateForm.get('instituteIdSearch')?.enable();
        this.dynamicCreateForm.get('institutionName')?.disable();
        this.cdr.detectChanges();
      }
    } else {
      if (id == 'personalInfo') {

      }
      if (id == 'instituteId') {
        this.dynamicCreateForm.get('instituteIdSearch')?.disable();
        console.log('********* ', this.dynamicCreateForm.contains('instituteIdSearch'))
        this.dynamicCreateForm.get('institutionName')?.enable();
        this.cdr.detectChanges();
      }
    }
  }

  navigateBack() {
    this.navCtrl.back()
  }

  saveDraft() {
    // api call to save draft
  }

  onSubmit() {
    if (this.dynamicCreateForm.valid) {
      console.log('Form Submitted', this.dynamicCreateForm.value);
      // show Approval popover, on success
      this.showApproval();
      // Handle form submission, e.g., sending data to server
    } else {
      console.log('Form is invalid');
      this.showApproval();
    }
  }

  async showApproval() {
    let orgType = this.orgType == 'gov' ? 'Government Organization' : "Knowledge Institution"
    const alert = await this.alertController.create({
      header: '',
      subHeader: `Request for creating ${orgType} has been sent for Approval.`,
      message: `Request for creating ${orgType} has been sent for Approval.`,
      buttons: ['Close', 'Go to My Bharat Profile'],
    });

    await alert.present();
  }

  performSearch() {
    this.dynamicCreateForm.get('instituteIdSearch')?.valueChanges.pipe(
      tap(async (v: any) => {
        console.log('on form change ', v)
        // search institution specilization and bind the institute name based on id
        let inst = this.dynamicCreateForm.get('institutionName')
        inst?.enable()
        inst?.setValue('name');
        inst?.disable();
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
