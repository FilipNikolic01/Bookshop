import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAuthor } from 'src/app/shared/models/author';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss']
})
export class AuthorDialogComponent {
   flag!: number;

  constructor(private snackBar: MatSnackBar,
              private adminService: AdminService,
              @Inject(MAT_DIALOG_DATA) public author: IAuthor,
              private dialogRef: MatDialogRef<IAuthor>) {}
  
  addAuthor() {
    this.adminService.addAuthor(this.author).subscribe(
      () => {
        this.snackBar.open('Autor sa ID-jem: ' + this.author.id + ' je uspešno dodat!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }

  updateAuthor() {
    this.adminService.updateAuthor(this.author).subscribe(
      () => {
        this.snackBar.open('Autor sa imenom: ' + this.author.fullName + ' je uspešno izmenjen!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }

  deleteAuthor() {
    this.adminService.deleteAuthor(this.author.id).subscribe(
      () => {
        this.snackBar.open('Autor je uspešno izbrisan!', 'Ok', {duration:4500})
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
