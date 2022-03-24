import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { CdkRowDef } from '@angular/cdk/table';
import student from '../../../app/student.json';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit, AfterViewInit {

  studentFilter!: FormGroup;
  students!: Array<any>;
  dataSource!: Array<any>;
  mainDataSource: Array<any> = [];
  displayedColumns: string[] = ['enroll', 'name', 'phone', 'dept', 'sem', 'batch', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  matTable!: MatTable<any>;
  studentList: Array<any> = [];
  @ViewChild('studentTableList') studentTableList: any;

  constructor(public commonService: CommonService, private aRoute: ActivatedRoute, private router: Router) { }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.prepareStudentFilterForm()
    this.aRoute.data.subscribe((routeData) => {
      console.log("routeData : ", routeData);
      this.commonService.setPageTitle(routeData['title']);
    });

    this.dataSource = this.commonService.getUserData();
    this.mainDataSource = JSON.parse(JSON.stringify(this.dataSource));
    console.log(" this.Jasprit", this.commonService.getUserData());
  }

  editRecord(recordID: number) {
    console.log("recordID : ", recordID);
    this.router.navigate(["/student-form"], { queryParams: { id: recordID } });
  }

  deleteRecord(recordID: number) {
    console.log("recordID : ", recordID);
    let currentData = this.commonService.getUserData();
    console.log("currentData", currentData);
    let index = currentData.findIndex(el => el.id === recordID);
    console.log("INDEX : ", index);
    currentData.splice(index, 1);
    console.log("currentData : ", currentData);
    this.studentTableList.renderRows();
  }

  prepareStudentFilterForm() {
    this.studentFilter = new FormGroup({
      name: new FormControl(''),
      enroll: new FormControl('', Validators.maxLength(11)),
    })
  }

  applyFilter() {
    const { enroll, name } = this.studentFilter.getRawValue();
    this.dataSource = this.mainDataSource.filter(el => el.enroll.toString().includes(enroll) && el.name.includes(name));
    this.studentTableList.renderRows();
  }


  gotoHome() {
    this.router.navigate(["/home"]);
  }
  gotoForm() {
    this.router.navigate(["/student-form"]);
  }

}

