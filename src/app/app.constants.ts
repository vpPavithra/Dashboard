export interface OrgStructure {
    abbreviation: string;
    handle: string;
    category: string;
    subCategory: string;
    group: string;
    type: string;
    specialization: string;
}

export interface OrgAddress {
    add1: string;
    add2: string;
    state: string;
    district: string;
    area: string;
    localbody: string;
    pincode: string;
    city: string;
    landmark: string;
}

export interface ContactInfo {
    name: string;
    landline: string;
    mobile: string;
    email: string;
    website: string;
}
export interface OrgDetails {
    description: string;
    orgStructure: OrgStructure
    specialization: string;
    contactInfo: ContactInfo
    docs: any
}

export interface JoinOrgGov {
    orgStruture: orgJoinGov
    contactInfo: contactInfoJoin
}

export interface JoinOrgKI {
    orgStruture: orgJoinKI
    contactInfo: contactInfoJoin
}

export interface orgJoinKI {
    orgCategory: string;
    InstitutionType: string;
    InstitutionName: string;
    Designation: string;
    Heirarchy: string;
    field1: string;
    field2: string;
    field3: string;
}

export interface orgJoinGov {
    orgCategory: string;
    subCategory: string;
    Name: string;
    Designation: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
}

export interface contactInfoJoin {
    Name: string;
    gender: string;
    add1: string;
    add2: string;
    state: string;
    district: string;
    Pincode: string;
    mobile: string;
    email: string;
}

export const createOrgSeg = [{ name: 'About', value: 'about' }, { name: 'Basic Info', value: 'basic_info' }]
export const govOrgStructure = [
    { label: 'Name', id: 'orgName', type: 'text', options: [], placeholder: 'Enter organization name', required: false },
    { label: 'Abbreviation', id: 'abbreviation', type: 'text', options: [], placeholder: 'Enter abbrevation', required: false },
    { label: 'Category', id: 'category', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowledge Institution"], placeholder: '- - Select Category - -', required: true },
    { label: 'SubCategory', id: 'subCategory', type: 'select', options: ["Autonomous Body", "Block Panchayat", "communnity Health Centers", "Department", "District Hospital", "District Panchayat", "Ministry", "National Events", "Central Armed Police Force(CAPF)", "Police", "Primary Health Centers", "Rural Local Body", "States", "Urban Local Body"], placeholder: '- - Select Sub Category - -', required: true },
    { label: 'Type', id: 'type', type: 'select', options: ["type1", "type2"], placeholder: '- - Select Type - -', required: true },
    { label: 'Group', id: 'group', type: 'select', options: ["central", "state"], placeholder: '- - Select Group - -', required: true },
    {
        label: 'Specialization', id: 'specialization', type: 'select', options: ["Sanitation", "Health and fitness",
            "Road safety", "Transport management", "Disaster management", "Emergency service", "Environment", "Plantation", "Women empowerment", "Finance", "Health", "Adult Literacy", "Physical Health", "Mental Health", "National Youth Day",
            "National Youth Parliament", "Important Days", "Voter Awareness", "Neighborhood Youth Parliament", "Women Fitness Runs", "Education", "International Day of Yoga 21st June 2024"], placeholder: '- - Select Specialization - -', required: true
    },
    { label: 'Nodal Designation', id: 'nodalDesignation', type: 'text', options: [], placeholder: 'Enter Nodal Designation', required: true },
]

export const kiOrgStructure = [
    // { label: 'Abbreviation', id: 'instAbbreviation', type: 'text', options: [], placeholder: 'Enter abbrevation', required: false },
    { label: 'Category', id: 'category', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowledge Institution"], placeholder: '- - Select Category - -', required: true },
    { label: 'Institution Type', id: 'institutionType', type: 'select', options: [], placeholder: '- - Select Institution Type - -', required: true },
    { label: 'Institution SubCategory', id: 'institutionSubCategory', type: 'select', options: [], placeholder: '- - Select Institution SubCategory - -', required: true },
    { label: 'Institution Group', id: 'institutionGroup', type: 'select', options: [], placeholder: '- -Select Institution Group - -', required: true },
    { label: 'I have a AISHE ID', id: 'instituteId', type: 'checkbox', options: [], placeholder: '', required: true },
    { label: '', id: 'instituteIdSearch', type: 'search', options: [], placeholder: 'AISHE ID', required: false },
    { label: 'Type', id: 'instType', type: 'select', options: ["type1", "type2"], placeholder: '- - Select Type - -', required: true },
    { label: 'Institution Name', id: 'institutionName', type: 'select', options: [], placeholder: '- - Select institution name - -', required: false },
    { label: 'Nodal Designation', id: 'instNodalDesignation', type: 'text', options: [], placeholder: 'Enter Nodal Designation', required: true },
    { label: 'Funded by', id: 'fund', type: 'radio', options: ["Central Gov.", "State Gov.", "Private"], placeholder: '', required: true },
    { label: 'Affiliation with NSS', id: 'affliliation', type: 'radio', options: ["Yes", "No"], placeholder: '', required: true },
    {
        label: 'Specialization', id: 'instSpecialization', type: 'select', options: ["Science", "Arts", "Commerece", "Technical", "Non-Technical"], placeholder: '- - Select Specialization - -', required: true
    },
]

export const orgOffDetails = [
    // { label: 'Name', id: 'screen_name', type: 'text', options: [], placeholder: '', disabled: true, value: '' },
    // { label: 'Gender', id: 'gender', type: 'radio', options: ["Male", "Female", "Other"], placeholder: '', disabled: true, value: '' },
    { label: 'Address Line 1', id: 'addressLine1', type: 'text', options: [], placeholder: 'Enter Building number, Society', required: false },
    { label: 'Address Line 2', id: 'addressLine2', type: 'text', options: [], placeholder: 'Enter Area details', required: false },
    { label: 'State', id: 'state', type: 'select', options: [""], placeholder: '- - Select State- -', required: true },
    { label: 'District', id: 'district', type: 'select', options: [""], placeholder: '- - Select District - -', required: true },
    { label: 'Area', id: 'area', type: 'radio', options: ["Urban", "Rural"], placeholder: '', required: true },
    { label: 'Local Body', id: 'localBody', type: 'select', options: [], placeholder: '- - Select local body - -', required: true },
    // { label: 'Block', id: 'block', type: 'select', options: [], placeholder: '- - Select Block - -', required: true },
    // { label: 'Panchayat', id: 'panchayat', type: 'select', options: [], placeholder: '- - Select Panchayat - -', required: true },
    // { label: 'Village', id: 'village', type: 'select', options: [], placeholder: '- - Select Village - -', required: true },
    { label: 'Pincode', id: 'pinCode', type: 'number', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'City', id: 'city', type: 'text', options: [""], placeholder: 'Enter city', required: false },
    { label: 'Landmark', id: 'landMark', type: 'text', options: [], placeholder: 'Enter Landmark', required: false },
]

export const orgContactInfo = [
    { label: 'Contact Name', id: 'screen_name', type: 'text', options: [""], placeholder: 'Enter Contact name', required: false },
    { label: 'Landline', id: 'landline', type: 'text', options: [""], placeholder: 'Enter landline', required: false },
    { label: 'Mobile Number', id: 'mobile', type: 'tel', options: [""], placeholder: 'Enter Mobile Number', required: true },
    { label: 'E-mail', id: 'user_email', type: 'email', options: [""], placeholder: 'Enter email', required: false },
    { label: 'Website', id: 'website', type: 'url', options: [""], placeholder: 'Enter website', required: false },
]

export const nomineeDetails = [
    { label: 'Would you like to add nominee', id: 'nominee', type: 'radio', options: ["No", "Yes"], placeholder: '', required: true },
    { label: 'Name', id: 'nomineeName', type: 'text', options: [], placeholder: 'Enter name', disabled: true, value: '' },
    { label: 'Designation', id: 'nomineeDesignation', type: 'text', options: [], placeholder: 'Enter designnation', required: false },
    { label: 'Gender', id: 'nomineeGender', type: 'radio', options: ["Male", "Female", "Other"], placeholder: '', disabled: false, value: '' },
    { label: 'DOB', id: 'nomineeDob', type: 'text', options: [], placeholder: 'Enter DOB', required: false },
    { label: 'Mobile Number', id: 'nomineeMobile', type: 'tel', options: [""], placeholder: 'Enter Mobile Number', required: true },
    { label: 'E-mail', id: 'nomineeEmail', type: 'email', options: [""], placeholder: 'Enter email', required: false },
    { label: 'State', id: 'nomineeState', type: 'select', options: [""], placeholder: '- - Select State- -', required: true },
    { label: 'District', id: 'nomineeDistrict', type: 'select', options: [""], placeholder: '- - Select District- -', required: true },
    { label: 'Pincode', id: 'nomineePinCode', type: 'number', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'Address', id: 'nomineeAddress', type: 'text', options: [], placeholder: 'Enter address', required: false }
]

export const personalDetails = [
    { label: "I am a Vice Chancellor of Institution", id: 'personalInfo', type: "checkbox", options: [], placeholder: '', required: true, disabled: false, value: 'false' },
    { label: 'Name', id: 'person_name', type: 'text', options: [], placeholder: 'Enter name', disabled: true, value: '' },
    { label: 'Designation', id: 'designation', type: 'text', options: [], placeholder: 'Enter designnation', required: false },
    { label: 'Gender', id: 'gender', type: 'radio', options: ["Male", "Female", "Other"], placeholder: '', disabled: false, value: '' },
    { label: 'DOB', id: 'dob', type: 'text', options: [], placeholder: 'Enter DOB', required: false },
    { label: 'Mobile Number', id: 'person_mobile', type: 'tel', options: [""], placeholder: 'Enter Mobile Number', required: true },
    { label: 'E-mail', id: 'person_email', type: 'email', options: [""], placeholder: 'Enter email', required: false },
    { label: 'State', id: 'person_state', type: 'select', options: [""], placeholder: '- - Select State - -', required: true },
    { label: 'District', id: 'person_district', type: 'select', options: [""], placeholder: '- - Select District - -', required: true },
    { label: 'Pincode', id: 'person_pinCode', type: 'number', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'Address', id: 'person_address', type: 'text', options: [], placeholder: 'Enter address', required: false }
]

export const orgDesignation = [
    {
        "id": 1141,
        "division_level": "1",
        "division_name": "LEVEL 1",
        "designation": "CEO",
        "autority_role": "2",
        "rank": 1,
        "org_id": 112446
    },
    {
        "id": 1142,
        "division_level": "2",
        "division_name": "LEVEL 2",
        "designation": "COO",
        "autority_role": "2",
        "rank": 2,
        "org_id": 112446
    },
    {
        "id": 1143,
        "division_level": "3",
        "division_name": "LEVEL 3",
        "designation": "VC",
        "autority_role": "2",
        "rank": 3,
        "org_id": 112446
    }
]
export const orgNames = [{ org_id: "112446", name: "5 Aug XYZ POLICE" },
{ org_id: "112355", name: "ACADEMY" },
{ org_id: "105940", name: "Adi ORG" },
{ org_id: "104525", name: "Agra Municipal Corporation	" },
{ org_id: "105005", name: "ALIGARH MUNICIPAL CORPORATION" },
{ org_id: "176", name: "Andaman & Nicobar Police" },
{ org_id: "104765", name: "Arunachal Pradesh Police" },
{ org_id: "112395", name: "asad Police task" },
{ org_id: "151", name: "Assam Police" },
{ org_id: "104520", name: "Aurangabad (Chhatrapati Sambhajinagar) Municipal Corporation" },
{ org_id: "262", name: "Bhiwandi Nizampur City Municipal Corporation" },
{ org_id: "104748", name: "Brihan Mumbai Municipal corporation " },
{ org_id: "112321", name: "central RRj Police" },
{ org_id: "180", name: "Chandigarh Police" },
{ org_id: "112489", name: "CHC Ghaziabad" },
{ org_id: "112485", name: "CHC Kasimabad" },
{ org_id: "174", name: "Chhattisgarh Police" },
{ org_id: "104783", name: "Coimbatore Municipal Corporation" },
{ org_id: "112295", name: "Community Health Centers Organization" },
{ org_id: "38544", name: "DABRI MAL" },
{ org_id: "177", name: "Dadra Nagar Haveli & Daman Diu Police" },
{ org_id: "104521", name: "Department of Animal Husbandry and Dairying-MoFAHD" },
{ org_id: "104528", name: "Department of Commerce" },
{ org_id: "104742", name: "Department of Consumer Affairs" },
{ org_id: "105020", name: "Department of Education (Delhi)" },
{ org_id: "104755", name: "Department of Education (Goa)" },
{ org_id: "105813", name: "Department of Industrial Development (Uttarakhand) " },
{ org_id: "105009", name: "Department of Industries and Commerce (Andhra Pradesh)" },
{ org_id: "104791", name: "Department of Industries and Commerce (Punjab)" },
{ org_id: "105026", name: "Department of Panchayati Raj (Himachal Pradesh)" },
{ org_id: "105163", name: "Department of Panchayati Raj (J&K)" },
{ org_id: "104531", name: "Department of Panchayati Raj Uttarakhand" },
{ org_id: "105023", name: "Department of School Education (Jammu & Kashmir)" },
{ org_id: "104793", name: "Department of School Education (Punjab)" },
{ org_id: "105164", name: "Department of School Education (Uttarakhand)" },
{ org_id: "104782", name: "Department of Urban Development (Chhattisgarh)" },
{ org_id: "105022", name: "Department of Woman & Child Development (Jammu & Kashmir)" },
{ org_id: "105015", name: "Department of Women & Child Development (Chattisgarh)" },
{ org_id: "105019", name: "Department of Women & Child Development (Delhi)     " },
{ org_id: "104757", name: "Department of Women & Child Development (Gujrat)" },
{ org_id: "104771", name: "Department of Women & Child Development (Haryana)" },
{ org_id: "104781", name: "Department of Women & Child Development (Maharashtra)" },
{ org_id: "104772", name: "Department of Women & Child Development (Punjab)" },
{ org_id: "105159", name: "Department of Youth Affairs & Sports (Tripura)" },
{ org_id: "105944", name: "Developed India 2050" },
{ org_id: "226", name: "Dhanbad Municipal Corporation" },
{ org_id: "104766", name: "Directorate of Urban Administration & Development (Madhya Pradesh)" },
{ org_id: "104739", name: "Directorate of Woman & Child Development (Assam)" },
{ org_id: "112491", name: "District Hospital Gaziabad" },
{ org_id: "112398", name: "Dummy NSS-Dev" },
{ org_id: "112493", name: "ERP Police Dept" },
{ org_id: "112328", name: "ESPP -01" },
{ org_id: "112297", name: "GOA" },
{ org_id: "173", name: "Goa Police" },
{ org_id: "16", name: "Gujarat Police" },
{ org_id: "105", name: "Haryana Police" },
{ org_id: "104529", name: "Himachal Pradesh Police" },
{ org_id: "105205", name: "HMBC " },
{ org_id: "104924", name: "Hodal Municipal Council" },
{ org_id: "105168", name: "Indian Council of Medical Research (ICMR), New Delhi" },
{ org_id: "104743", name: "Indian Cyber Crime Coordination Centre (I4C) (MHA)" },
{ org_id: "104784", name: "Indian Space Research Organisation (ISRO)" },
{ org_id: "212", name: "Indore Municipal Corporation" },
{ org_id: "112280", name: "Interpol police india" },
{ org_id: "104", name: "J&K Police" },
{ org_id: "104524", name: "Jabalpur Municipal Corporation" },
{ org_id: "105160", name: "Jind Municipal Council" },
{ org_id: "265", name: "Kalyan Dombivali Municipal Corporation" },
{ org_id: "104752", name: "Kanpur Municipal Corporation " },
{ org_id: "132", name: "Karnataka State Police" },
{ org_id: "104733", name: "Kerala Police" },
{ org_id: "179", name: "Khelo India" },
{ org_id: "112284", name: "kjdghksjghj                 Manoj" },
{ org_id: "112306", name: "Kumar Kumar" },
{ org_id: "112276", name: "kumar manoj kumar" },
{ org_id: "112269", name: "kumarmanoj_-@&,.(Manoj Kumar). kumarmanoj_-@& kumarmanoj_-@&,.(Manoj Kumar). kumarmanoj" },
{ org_id: "112310", name: "KumarSingh" },
{ org_id: "87", name: "Ladakh Police" },
{ org_id: "105169", name: "Ludhiana Municipal Corporation" },
{ org_id: "88", name: "Madhya Pradesh Police" },
{ org_id: "17", name: "Maharashtra Police" },
{ org_id: "112379", name: "mano police  station" },
{ org_id: "112148", name: "MINIS" },
{ org_id: "104749", name: "Ministry of Coal " },
{ org_id: "185", name: "Ministry of Education" },
{ org_id: "200", name: "Ministry Of Housing and Urban Affairs (MoHUA)" },
{ org_id: "178", name: "Ministry of Panchayati Raj" },
{ org_id: "244", name: "Ministry of Road Transport and Highways " },
{ org_id: "104732", name: "Mission Shakti - WCD" },
{ org_id: "188", name: "Mission Vatsalya - WCD" },
{ org_id: "112414", name: "Mizor Police" },
{ org_id: "121", name: "Mizoram Police" },
{ org_id: "105190", name: "Municipal Corporation Shimla" },
{ org_id: "104760", name: "Mysuru City Corporation	" },
{ org_id: "104734", name: "Nagaland Police" },
{ org_id: "211", name: "Nagpur Municipal Corporation" },
{ org_id: "112247", name: "name - _ @ , & ) . (" },
{ org_id: "105187", name: "National Academy of Broadcasting and Multimedia, Doordarshan, Prasar Bharati (AIR/Doordarshan)" },
{ org_id: "112275", name: "National event organization of India" },
{ org_id: "105199", name: "National Service Scheme (NSS)" },
{ org_id: "104523", name: "National Youth Day" },
{ org_id: "153", name: "National Youth Festival 2024" },
{ org_id: "104759", name: "NeGD (National e-Governance Division)" },
{ org_id: "104762", name: "Nehru Yuva Kendra Sangathan (NYKS)" },
{ org_id: "112380", name: "New Central Police Task 2024" },
{ org_id: "199", name: "New Delhi Municipal Council " },
{ org_id: "105937", name: "new india 2025" },
{ org_id: "105929", name: "NewORG" },
{ org_id: "104736", name: "Noida Authority" },
{ org_id: "112307", name: "NSS Gaurav" },
{ org_id: "58", name: "Odisha Police" },
{ org_id: "112002", name: "org for security" },
{ org_id: "112292", name: "Org name panchayat 123" },
{ org_id: "112490", name: "PHC Modinagar (UP)" },
{ org_id: "249", name: "Pimpri Chinchwad Municipal Corporation" },
{ org_id: "112356", name: "police test" },
{ org_id: "104737", name: "Prayagraj Nagar Nigam" },
{ org_id: "104780", name: "Puducherry Police" },
{ org_id: "208", name: "Pune Municipal Corporation" },
{ org_id: "170", name: "Punjab Police" },
{ org_id: "112413", name: "Rajasthan  Police 222" },
{ org_id: "13", name: "Rajasthan Police" },
{ org_id: "112370", name: "rama police centre - _ @ , & ) . (" },
{ org_id: "112279", name: "rtertertertete" },
{ org_id: "112294", name: "Rural local body org" },
{ org_id: "242", name: "Salem Municipal Corporation" },
{ org_id: "112417", name: "sdfsfs" },
{ org_id: "193", name: "Sikkim Police" },
{ org_id: "112421", name: "Skill Development Poiice" },
{ org_id: "237", name: "Solapur Municipal Corporation" },
{ org_id: "105017", name: "Srinagar Municipal Corporation" },
{ org_id: "190", name: "Startup India (DPIIT)" },
{ org_id: "112492", name: "State Health Department, Uttar Pradesh" },
{ org_id: "112426", name: "Sural Police Task" },
{ org_id: "207", name: "Surat Municipal Corporation" },
{ org_id: "152", name: "Telangana Police" },
{ org_id: "112523", name: "Test Agriculture & Farmer" },
{ org_id: "112263", name: "test name" },
{ org_id: "105928", name: "TESTING ORG" },
{ org_id: "112527", name: "Testorgdic" },
{ org_id: "213", name: "Thane Municipal Corporation" },
{ org_id: "105202", name: "The Bharat Scouts and Guides" },
{ org_id: "105946", name: "The Great India Org" },
{ org_id: "103", name: "Tripura Police" },
{ org_id: "112373", name: "UP STF Police" },
{ org_id: "112411", name: "Urban Local body org" },
{ org_id: "14", name: "Uttar Pradesh Police" },
{ org_id: "18", name: "Uttarakhand Police" },
{ org_id: "112519", name: "Van Mahotsav" },
{ org_id: "224", name: "Varanasi Municipal Corporation" },
{ org_id: "251", name: "Vasai Virar Municipal Corporation" },
{ org_id: "112131", name: "YogadayInternational" },
{ org_id: "104770", name: "Youth Empowerment and Entrepreneurship Department (Haryana)" }]


export const kiType = [{ id: "46", "data-parent": "3", label: "College" },
{ id: "47", "data-parent": "3", label: "School" },
{ id: "48", "data-parent": "3", label: "University" },
{ id: "77", "data-parent": "3", label: "ITI" },
{ id: "78", "data-parent": "3", label: "Polytechnic" }]

export const kiNames = [{ id: "112130", "data-aishe_code": "OC-9632", label: "Jindal College Testing" },
{ id: "112056", "data-aishe_code": "OC-3559", label: "HMBC College" },
{ id: "112037", "data-aishe_code": "", label: "Digital India Cooperation" }]

export const kiDesignations = [{ id: "918", "data-division_name": "LEVEL 1-2,LEVEL 1-3", "data-division_id": "1116301,1116302", label: "VICE CHANCELLOR" },
{ id: "919", "data-division_name": "LEVEL 2", "data-division_id": "1116303", label: "HOD" },
{ id: "920", "data-division_name": "", "data-division_id": "", label: "PROFESSOR" },
{ id: "921", "data-division_name": "", "data-division_id": "", label: "ASST. PROFESSOR" }]

export const kiSubCat = [{ "id": "1", "label": "Affiliated College" },
{ "id": "2", "label": "Constituent / University College" },
{ "id": "3", "label": "Autonomous College" },
{ "id": "4", "label": "Others" }]