import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentFormComponent implements OnInit {

  studentDetails!: FormGroup;
  deptDetails!: FormGroup;
  addedByFaculty!: FormGroup;
  editMode: boolean = false;
  isEdit: boolean = false;
  editID: number = 0;

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private commonService: CommonService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.prepareAddedByFacultyForm()
    this.prepareStudentDetailsForm()
    // this.prepareDeptDetailsForm()

    this.aRoute.queryParams.subscribe(params => {
      console.log("params : ", params);
      if (params.hasOwnProperty("id")) {
        this.isEdit = true;
        this.editID = parseInt(params['id']);
        let userData = this.commonService.getUserData();
        console.log("userData : ", userData);
        let matchedObject = userData.filter(el => el.id === this.editID);
        console.log("matchedObject : ", matchedObject[0]);
        this.studentDetails.patchValue(matchedObject[0]);
      }
    });

  }

  // prepareAddedByFacultyForm() {
  //   this.addedByFaculty = new FormGroup({
  //     facultyId: new FormControl('', [Validators.required, Validators.maxLength(3)]),
  //     facultyName: new FormControl({ value: '', disabled: true }),
  //     facultyEmail: new FormControl({ value: '', disabled: true }),
  //   })
  // }

  prepareStudentDetailsForm() {
    this.studentDetails = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      // email: new FormControl('', [Validators.required, Validators.email]),
      enroll: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      // institute: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required),
      batch: new FormControl('', Validators.required),
      sem: new FormControl('', Validators.required)
    })
  }

  // prepareDeptDetailsForm() {
  //   this.deptDetails = new FormGroup({
  //     institute: new FormControl('', Validators.required),
  //     dept: new FormControl('', Validators.required),
  //     batch: new FormControl('', Validators.required),
  //     sem: new FormControl('', Validators.required)
  //   })
  // }

  gotoList() {
    this.router.navigate(["/student-list"]);
  }

  saveUser() {
    let { enroll, name, phone, dept, sem, batch } = this.studentDetails.getRawValue();
    console.log(" this.studentDetails.getRawValue()", this.studentDetails.getRawValue());
    if (this.isEdit) {
      let currentData = this.commonService.getUserData();
      let index = currentData.findIndex(el => el.id === this.editID);
      currentData[index] = { enroll, name, phone, dept, sem, batch, id: currentData.length + 1 };
    } else {
      this.commonService.saveUserDate({ enroll, name, phone, dept, sem, batch });
    }
    this.gotoList();
  }

  cancel() {
    this.router.navigate(["/home"]);
  }

}
