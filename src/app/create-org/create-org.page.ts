import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-org',
  templateUrl: './create-org.page.html',
  styleUrls: ['./create-org.page.scss'],
})
export class CreateOrgPage implements OnInit {
  segments = [{ name: 'About', value: 'about' }, { name: 'Basic Info', value: 'basic_info' }]
  segment = "about"
  items = [
    { label: 'Name', type: 'text', options: [], placeholder: '', required: false },
    { label: 'Abbreviation', type: 'text', options: [], placeholder: '', required: false },
    { label: 'Category', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
    { label: 'SubCategory', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
    { label: 'Type', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
    { label: 'Group', type: 'select', options: ["Government Organization", "NGO", "Youth Club", "Knowloedge Institution"], placeholder: 'Select', required: true },
    { label: 'Specialization', type: 'text', options: [], placeholder: 'Select', required: true }
  ]

  officalAdd = [
    { label: 'Address Line 1', type: 'text', options: [], placeholder: 'Enter Building number, Society', required: false },
    { label: 'Address Line 2', type: 'text', options: [], placeholder: 'Enter Area details', required: false },
    { label: 'State', type: 'select', options: [""], placeholder: 'Select', required: true },
    { label: 'District', type: 'select', options: [""], placeholder: 'Select', required: true },
    { label: 'Area', type: 'radio', options: ["Urban", "Rural"], placeholder: '', required: true },
    { label: 'Local Body', type: 'select', options: ["Urban", "Rural"], placeholder: '', required: true },
    { label: 'Landmark', type: 'select', options: ["Urban", "Rural"], placeholder: '', required: false },
    { label: 'Pincode', type: 'number', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'City', type: 'text', options: [""], placeholder: 'Enter Pincode', required: false },
  ]

  contactInfo = [
    { label: 'Contact Name', type: 'text', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'Landline', type: 'text', options: [""], placeholder: 'Enter Pincode', required: false },
    { label: 'Mobile Number', type: 'tel', options: [""], placeholder: 'Enter Mobile Number', required: true },
    { label: 'E-mail', type: 'email', options: [""], placeholder: 'Enter Mobile Number', required: false },
    { label: 'Website', type: 'email', options: [""], placeholder: 'Enter Mobile Number', required: false },
  ]

  selectedFile: File | null = null;
  preview = false
  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  onUpload() {
    if (this.selectedFile) {
      // Handle file upload logic here (e.g., upload to a server)
      console.log('Uploading file:', this.selectedFile.name);

      // Example: Convert file to a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('File content:', e.target.result);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.log('No file selected');
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  changeImage(event: any) {
    alert("change image " + event);
  }
}
