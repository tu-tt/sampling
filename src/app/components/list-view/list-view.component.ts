import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Note, NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
  ],
})
export class ListViewComponent implements AfterViewInit {
  columns: string[] = ['title', 'createdDate', 'action'];
  dataSource: MatTableDataSource<Note>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public noteService: NoteService,
  ) {}

  ngOnInit(): void {
    const notes = this.noteService.getNotes();
    this.dataSource = new MatTableDataSource<Note>(notes);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  preview(note: Note): void {
    const dialogRef = this.dialog.open(PreviewDialog, {
      data: note,
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

}

@Component({
  selector: 'preview-dialog',
  templateUrl: './preview-dialog.html',
  standalone: true,
  imports: [
    MatCardModule,
  ],
})
export class PreviewDialog {
  constructor(
    public dialogRef: MatDialogRef<PreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

