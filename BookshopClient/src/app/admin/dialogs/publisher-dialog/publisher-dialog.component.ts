import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { IPublisher } from 'src/app/shared/models/publisher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-publisher-dialog',
  templateUrl: './publisher-dialog.component.html',
  styleUrls: ['./publisher-dialog.component.scss']
})
export class PublisherDialogComponent {
  flag!: number;

  constructor(private snackBar: MatSnackBar,
              private adminService: AdminService,
              @Inject(MAT_DIALOG_DATA) public publisher: IPublisher,
              private dialogRef: MatDialogRef<IPublisher>) {}
  
  addPublisher() {
    this.adminService.addPublisher(this.publisher).subscribe(
      () => {
        this.snackBar.open('Izdavač sa nazivom: ' + this.publisher.name + ' je uspešno dodat!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }

  updatePublisher() {
    this.adminService.updatePublisher(this.publisher).subscribe(
      () => {
        this.snackBar.open('Izdavač sa ID-jem: ' + this.publisher.id + ' je uspešno izmenjen!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }

  deletePublisher() {
    this.adminService.deletePublisher(this.publisher.id).subscribe(
      () => {
        this.snackBar.open('Izdavač je uspešno izbrisan!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }
  
  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene', 'Ok', {duration: 3000});
  }

}
