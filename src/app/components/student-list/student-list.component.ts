import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { CdkRowDef } from '@angular/cdk/table';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit, AfterViewInit {

  studentFilter!: FormGroup;
  dataSource!: Array<any>
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

  applyFilter(filterValue: any) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  gotoHome() {
    this.router.navigate(["/home"]);
  }
  gotoForm() {
    this.router.navigate(["/student-form"]);
  }

}

