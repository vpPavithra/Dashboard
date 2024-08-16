import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterPopoverComponent } from '../components/filter-popover/filter-popover.component';
import * as FusionCharts from 'fusioncharts';
import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
// import * as IndiaMap from '@highcharts/map-collection/countries/in/in-all.geo.json';
import * as topo from '../topo.json'

HC_map(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public loadingImg = '/assets/images/lazyload96x96.gif'
  public errorImg = '/assets/images/blank_profile_2.jpg'
  segment: string = ""
  segments = [{ name: 'Dashboard', value: 'dashboard' }, { name: 'Report', value: 'report' }]
  profileData = { "id": 67186715, "dl_id": "DL-ns-4cf8388c-37fc-4821-bcd0-c0240da71ef0", "screen_name": "Pavithra", "first_name": "Pavithra", "last_name": null, "username": "pavithra5692", "user_email": "pavithravp88@gmail.com", "user_phone": "9480316997", "alternate_no": null, "profile_pic_path": null, "profile_pic": null, "gender": "Female", "dob": "14-04-1995", "address": null, "country_id": 99, "state_id": "15", "city_id": "321", "village_name": null, "panchayat_name": null, "block_name": null, "zip": "560092", "designation": null, "skills": null, "area_of_interest": null, "youth_sport_area": "1", "personal_record": "", "record_unit": "", "khel_participate": 0, "about": null, "register_as": null, "user_status": 2, "demographic_status": "2", "email_verification": "VERIFIED", "user_verification": "NOT_VERIFIED", "authority_verification": "NOT_VERIFIED", "otp_verfication": "NOT_VERIFIED", "otpcheckcode": null, "auth_mode": "MYBHARAT_EMAIL_AUTH", "ip_address": null, "user_agent": null, "mobile_notification": "1", "email_status": 0, "gstn": null, "org_name": null, "udyam_no": null, "yuva_type": "OTHERS", "udyam_contact": null, "about_org": null, "org_type": null, "internship_function_selector": 0, "internship_industry_sector": 0, "internship_cluster_state": null, "internship_cluster_district": null, "internship_cluster_location": null, "internship_cluster_product": null, "internship_location_state": 0, "internship_location_district": 0, "internship_location_block": 0, "location_picode": null, "turnover": null, "is_nsso_authenticated_for_elo": null, "no_of_employees_male": null, "blood_group": 0, "is_covid_vaccinated": null, "work_exposure": null, "no_of_employees_female": null, "about_student": null, "is_internship": "0", "sub_area_of_interest": null, "type_of_enterprize": null, "nature_of_enterprize": null, "org_activity": null, "org_gstin": null, "date_of_incorporation": null, "institution_id": null, "created": "2024-08-01T13:59:05.000000Z", "tot_points": null, "redeem_points": null, "pstatus": null, "profile_blood_group": null, "block_id": null, "ward": null, "local_body": "276600", "profile_functional_area": null, "profile_industry_sector": null, "reject_reason": null, "is_resume_exist": 0, "user_type": "Y", "user_skills": [], "club_membership": null, "user_interest": [], "Ratings": null, "assignments": [], "educations": [], "internship": [], "all_internship": [], "cert_count": 0 }
  contents = [{ title: '146565', subTitle: 'Mega Events', icon: 'calendar-outline', color: '#06C1C4', size: '6' }, { title: '4654', subTitle: 'Volunteer Opportunities for events', icon: 'logo-electron', color: '#00A659', size: '6' }, { title: '454', subTitle: 'Experiential Learning Program', icon: 'school-outline', color: '#F39C13', size: '6' }, { title: '4654', subTitle: 'My Bharat Organization', icon: 'git-merge-outline', color: '#DD4B39', size: '6' },
  { title: '6453', subTitle: 'Total CV`s Created', icon: 'reader-outline', color: '#7D55FF', size: '4' }, { title: '6453', subTitle: 'Youth Public Profile', icon: 'person-circle-outline', color: '#BF3DA3', size: '4' }, { title: '6453', subTitle: 'Mentors Registered', icon: 'people-circle-outline', color: '#59D000', size: '4' }]

  youthRegisteredList = [{ type: 'NSS', count: '646464', color: ['#B4A6FA', '#DFDAF9'], bgColor: '#E6E2FE', textColor: '#664DE8' }, { type: 'NCC', count: '646464', color: ['#F48573', '#F6C2C3'], bgColor: '#F9E2E3', textColor: '#F15B43' }, { type: 'NYKS', count: '68754', color: ['#06B6D4', '#BFEEFF'], bgColor: '#ECFEFF', textColor: '#06B6D4' }, { type: 'BSG', count: '6567', color: ['#22C55E', '#DAFAE5'], bgColor: '#EFFCF3', textColor: '#22C45E' }, { type: 'Others', count: '6567', color: ['#E05DC4', '#FBD0F5'], bgColor: '#FFE5F9', textColor: '#E124B8' }]
  trendingItems = [{ title: 'International Yoga day', location: 'Mumbai, Maharastra', rating: '4' }, { title: 'International Yoga day', location: 'Mumbai, Maharastra', rating: '4' }, { title: 'International Yoga day', location: 'Mumbai, Maharastra', rating: '4' }, { title: 'International Yoga day', location: 'Mumbai, Maharastra', rating: '4' }, { title: 'International Yoga day', location: 'Mumbai, Maharastra', rating: '4' }]

  elpList = [{ label: 'Total Opening', count: '146565' }, { label: 'Organization Participates', count: '146565' }, { label: 'Applications Received', count: '146565' }, { label: 'Youth Applied', count: '146565' }, { label: 'Total Youth Completed ELP', count: '146565' }, { label: 'Generated Certificate', count: '146565' }]
  voEventsList = [{ label: 'Youth Participated in VO', count: '756868' }, { label: 'Organization Posted Events', count: '54765' }]
  topOrgList = [{ title: 'Ministry of Panchayat Raj', type: 'Government' }, { title: 'Khelo India', type: 'Government' }, { title: 'Ministry of Education', type: 'Government' }, { title: 'Rajasthan Police', type: 'Government' }, { title: 'ICICI Bank', type: 'Government' }]

  orgList = [{ label: 'Government', count: '231' }, { label: 'Knowledge Institutions', count: '543' }, { label: 'Non Profits', count: '345' }, { label: 'Business', count: '123' }]
  feedbackTypes = [{ type: 'Feedback from partners', count: "231+" }, { type: 'Feedback from youth', count: "543+" }, { type: 'Average Rating', count: "4" }]
  title = ["Total", "Opportuities"]
  eventsDetails = [{ label: "Attendees", count: 146565 }, { label: "Participants", count: 146565 }, { label: "Volunteers", count: 146565 }]
  categories = [{ type: "Youth", color: '#0B6BBE', stops: [[0, '#ACD4E5'], [0.5, '#4A94D1'], [1, '#0B6BBE']] },
  { type: "My Bharat Organization", color: '#B28600', stops: [[0, '#FAE5A6'], [0.5, '#D4A833'], [1, '#B28600']] },
  { type: "Events", color: '#9F1853', stops: [[0, '#D6CADB'], [0.5, '#C35176'], [1, '#9F1853']] },
  { type: "NSS Office", color: '#198038', stops: [[0, '#A9F9AB'], [0.5, '#48A359'], [1, '#198038']] },
  { type: "District Youth Officers", color: '#4A90E2', stops: [[0, '#FCEFEF'], [0.5, '#7CB0EB'], [1, '#4A90E2']] },
  { type: "Volunteer Opportunities", color: '#A55EFF', stops: [[0, '#EFEFFF'], [0.5, '#BE92FF'], [1, '#A55EFF']] },
  { type: "Experiential Learning Program", color: '#009D9A', stops: [[0, '#D9EFEE'], [0.5, '#66CCB6'], [1, '#009D9A']] },
  { type: "Partner", color: '#DD5396', stops: [[0, '#EFEFFF'], [0.5, '#FF63A6'], [1, '#DD5396']] }]
  selectedType: string = "";
  filteredList = [];
  chartOptions: Highcharts.Options = {}
  selectedCategory: string = ""
  constructor(
    private popover: PopoverController
  ) {
    this.segment = "dashboard"

    // FusionCharts.ready(function () {
    //   var worldMap = new FusionCharts({
    //     type: 'maps/india',
    //     renderAt: 'chart-container',
    //     width: '750',
    //     height: '550',
    //     dataFormat: 'json',
    //     dataSource: {
    //       "chart": {
    //         "caption": "National and State wise User Metrics",
    //         "theme": "fusion",
    //         "formatNumberScale": "0",
    //         "numberSuffix": "M"
    //       },
    //       "colorrange": {
    //         "color": [{
    //           "minvalue": "0",
    //           "maxvalue": "100",
    //           "code": "#D0DFA3",
    //           "displayValue": "Youth"
    //         }, {
    //           "minvalue": "100",
    //           "maxvalue": "500",
    //           "code": "#B0BF92",
    //           "displayValue": "My Bharat Organization"
    //         }, {
    //           "minvalue": "500",
    //           "maxvalue": "1000",
    //           "code": "#91AF64",
    //           "displayValue": "Events"
    //         }, {
    //           "minvalue": "1000",
    //           "maxvalue": "5000",
    //           "code": "#A9FF8D",
    //           "displayValue": "NSS Office"
    //         },
    //         {
    //           "minvalue": "1000",
    //           "maxvalue": "5000",
    //           "code": "#A9FF8D",
    //           "displayValue": "District youth Officers"
    //         },
    //         {
    //           "minvalue": "1000",
    //           "maxvalue": "5000",
    //           "code": "#A9FF8D",
    //           "displayValue": "Volunteer opportunities"
    //         },
    //         {
    //           "minvalue": "1000",
    //           "maxvalue": "5000",
    //           "code": "#A9FF8D",
    //           "displayValue": "Experiential Learning Program"
    //         },
    //         {
    //           "minvalue": "1000",
    //           "maxvalue": "5000",
    //           "code": "#A9FF8D",
    //           "displayValue": "Partner"
    //         }]
    //       },
    //       "data": [{
    //         "id": "NA",
    //         "value": "515"
    //       }, {
    //         "id": "SA",
    //         "value": "373"
    //       }, {
    //         "id": "AS",
    //         "value": "3875"
    //       }, {
    //         "id": "EU",
    //         "value": "727"
    //       }, {
    //         "id": "AF",
    //         "value": "885"
    //       }, {
    //         "id": "AU",
    //         "value": "32"
    //       }]
    //     }
    //   }).render();
    // });

    // FusionCharts.ready(function () {
    //   var myChart = new FusionCharts({
    //     type: 'scrollarea2d',
    //     dataFormat: 'json',
    //     renderAt: 'chart-container-youth',
    //     width: '900',
    //     height: '400',
    //     dataSource: {
    //       "chart": {
    //         "theme": "fusion",
    //         "caption": "Sales Trends",
    //         "subCaption": "(2016 to 2017)",
    //         "xAxisname": "Month",
    //         "pYAxisName": "Amount",
    //         "labelDisplay": "AUTO",
    //         "sYAxisName": "Employees",
    //         "numberPrefix": "$",
    //         "numVisiblePlot": "8",
    //         "flatScrollBars": "1",
    //         "scrollheight": "10"
    //       },
    //       "categories": [{
    //         "category": [{
    //           "label": "Jan 2016"
    //         },
    //         {
    //           "label": "Feb 2016"
    //         },
    //         {
    //           "label": "Mar 2016"
    //         },
    //         {
    //           "label": "Apr 2016"
    //         },
    //         {
    //           "label": "May 2016"
    //         },
    //         {
    //           "label": "Jun 2016"
    //         },
    //         {
    //           "label": "Jul 2016"
    //         },
    //         {
    //           "label": "Aug 2016"
    //         },
    //         {
    //           "label": "Sep 2016"
    //         },
    //         {
    //           "label": "Oct 2016"
    //         },
    //         {
    //           "label": "Nov 2016"
    //         },
    //         {
    //           "label": "Dec 2016"
    //         },
    //         {
    //           "label": "Jan 2017"
    //         },
    //         {
    //           "label": "Feb 2017"
    //         },
    //         {
    //           "label": "Mar 2017"
    //         },
    //         {
    //           "label": "Apr 2017"
    //         },
    //         {
    //           "label": "May 2017"
    //         },
    //         {
    //           "label": "Jun 2017"
    //         },
    //         {
    //           "label": "Jul 2017"
    //         },
    //         {
    //           "label": "Aug 2017"
    //         },
    //         {
    //           "label": "Sep 2017"
    //         },
    //         {
    //           "label": "Oct 2017"
    //         },
    //         {
    //           "label": "Nov 2017"
    //         },
    //         {
    //           "label": "Dec 2017"
    //         }
    //         ]
    //       }],
    //       "dataset": [{
    //         "data": [{
    //           "value": "27400"
    //         },
    //         {
    //           "value": "29800"
    //         },
    //         {
    //           "value": "25800"
    //         },
    //         {
    //           "value": "26800"
    //         },
    //         {
    //           "value": "29600"
    //         },
    //         {
    //           "value": "32600"
    //         },
    //         {
    //           "value": "31800"
    //         },
    //         {
    //           "value": "36700"
    //         },
    //         {
    //           "value": "29700"
    //         },
    //         {
    //           "value": "31900"
    //         },
    //         {
    //           "value": "34800"
    //         },
    //         {
    //           "value": "24800"
    //         },
    //         {
    //           "value": "26300"
    //         },
    //         {
    //           "value": "31800"
    //         },
    //         {
    //           "value": "30900"
    //         },
    //         {
    //           "value": "33000"
    //         },
    //         {
    //           "value": "36200"
    //         },
    //         {
    //           "value": "32100"
    //         },
    //         {
    //           "value": "37500"
    //         },
    //         {
    //           "value": "38500"
    //         },
    //         {
    //           "value": "35400"
    //         },
    //         {
    //           "value": "38200"
    //         },
    //         {
    //           "value": "33300"
    //         },
    //         {
    //           "value": "38300"
    //         }
    //         ]
    //       }]
    //     }
    //   }).render();
    // });
  }

  Highcharts: typeof Highcharts = Highcharts;
  async ngOnInit() {
    console.log("dashboard *********");
    // const IndiaMap = await import('@highcharts/map-collection/countries/in/in-all.geo.json');
  }
  ionViewWillEnter() {
    this.handleSelectedCategory(this.categories[0]);
    this.selectedType = "NSS"
    this.updateGhaph([0, 2, 2.5, 1, 3, 1, 0, 2])
  }

  async showFilterPopover(event: any) {
    console.log("*********");
    const popoverCtrl = await this.popover.create({
      component: FilterPopoverComponent,
      showBackdrop: true,
      backdropDismiss: true,
      translucent: true,
      event: event,
      side: 'bottom',
      alignment: 'end',
    })

    await popoverCtrl.present()
    await popoverCtrl.onDidDismiss().then(res => {
      console.log("dismiss ", res)
      if (this.filteredList.length > 0) {
        this.filteredList = this.filteredList.concat(res.data)
      } else {
        this.filteredList = res.data
      }
    })

  }

  removeList(list: any) {
    this.filteredList = this.filteredList.filter(ls => ls !== list)
  }

  handleYouthData(youthData: any) {
    this.selectedType = youthData.type
    console.log("****** youthData ", youthData)
    // read a data from api
    this.updateGhaph([0, 3, 2, 2.5, 1.8, 3.8, 2.4, 1.5, 2, 0.6])
  }

  updateGhaph(data: any) {
    let options: Highcharts.Options = {
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: ''
        },
        categories: ['0', '500', '1000', '1500'],
        tickmarkPlacement: 'on',
      },
      series: [{
        type: "area",
        name: '',
        data: data
      }] as Highcharts.SeriesOptionsType[]
    };
    Highcharts.mapChart('chart-container-youth', options, (cb => {
      console.log("callback ", cb)
    }));
  }

  handleSelectedCategory(category?: any) {
    this.selectedCategory = category.type
    this.chartOptions = {
      chart: {
        map: topo,
        events: {
          click(e) {
            console.log('Chart clicked!', e);
          }
        }
      },
      title: {
        text: 'National and State wise User Metrics'
      },
      colorAxis: {
        min: 0,
        stops: category.stops
      },
      series: [{
        type: 'map',
        color: "#ff0000",
        data: [
          ['madhya pradesh', 10], ['uttar pradesh', 11], ['karnataka', 12],
          ['nagaland', 13], ['bihar', 14], ['lakshadweep', 15],
          ['andaman and nicobar', 16], ['assam', 17], ['west bengal', 18],
          ['puducherry', 19], ['daman and diu', 20], ['gujarat', 21],
          ['rajasthan', 22], ['dadara and nagar havelli', 23],
          ['chhattisgarh', 24], ['tamil nadu', 25], ['chandigarh', 26],
          ['punjab', 27], ['haryana', 28], ['andhra pradesh', 29],
          ['maharashtra', 30], ['himachal pradesh', 31], ['meghalaya', 32],
          ['kerala', 33], ['telangana', 34], ['mizoram', 35], ['tripura', 36],
          ['manipur', 37], ['arunanchal pradesh', 38], ['jharkhand', 39],
          ['goa', 40], ['nct of delhi', 41], ['odisha', 42],
          ['jammu and kashmir', 43], ['sikkim', 44], ['uttarakhand', 45]
        ],
        showCheckbox: true,
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        // dataLabels: {
        //   enabled: true,
        //   format: '{point.name}'
        // },
        point: {
          events: {
            click: function () {
              const stateName = this.name;  // Get the name of the clicked state
              const stateValue = this.value; // Get the value of the clicked state
              // alert(`State: ${stateName}\nValue: ${stateValue}`);
              console.log(`State: ${stateName}, Value: ${stateValue}`);
              // Perform any other action here, like routing or updating UI elements
            }
          }
        }
      }]
    };
    setTimeout(() => {
      Highcharts.mapChart('container', this.chartOptions, (cb => {
        console.log("callback ", cb)
      }));
    }, 0);
  }

  handleLabelStyle(youthlist: any) {
    let color = ''
    let border = ''
    if (youthlist.type == this.selectedType) {
      color = youthlist.textColor
      border = `1px solid ${color}`
    }
    return { 'color': color, 'border-bottom': border }
  }
}
