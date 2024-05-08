import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGenre } from 'src/app/shared/models/genre';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
  flag!: number;

  constructor(private snackBar: MatSnackBar,
              private adminService: AdminService,
              @Inject(MAT_DIALOG_DATA) public genre: IGenre,
              private dialogRef: MatDialogRef<IGenre>) {}
  
  addGenre() {
    this.adminService.addGenre(this.genre).subscribe(
      () => {
        this.snackBar.open('Žanr sa nazivom: ' + this.genre.name + ' je uspešno dodat!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }

  updateGenre() {
    this.adminService.updateGenre(this.genre).subscribe(
      () => {
        this.snackBar.open('Žanr sa ID-jem: ' + this.genre.id + ' je uspešno izmenjen!', 'Ok', {duration:4500})
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Dogodila se greška', 'Ok', {duration:2500})
    }
  }

  deleteGenre() {
    this.adminService.deleteGenre(this.genre.id).subscribe(
      () => {
        this.snackBar.open('Žanr je uspešno izbrisan!', 'Ok', {duration:4500})
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
