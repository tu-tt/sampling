import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Note, NoteService } from 'src/app/services/note.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


export class NoteStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class ListViewComponent implements AfterViewInit {
  columns: string[] = ['title', 'createdDate', 'action'];
  dataSource = new MatTableDataSource<Note>();
  editing: boolean = false;
  editingNote: Note = {} as Note;
  formTitle: string;
  titleControl = new FormControl('', [Validators.required])
  contentControl = new FormControl('', [Validators.required])
  matcher = new NoteStateMatcher

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public noteService: NoteService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getNotes()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  preview(note: Note): void {
    const dialogRef = this.dialog.open(PreviewDialog, { data: note })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

  getNotes(): void {
    const notes = this.noteService.getNotes();
    this.dataSource.data = notes
  }

  openForm(note?: Note): void {
    if (note) {
      this.formTitle = 'Edit Note'
      this.editingNote = {...note}      
    } else {
      this.formTitle = 'Add Note'
      this.editingNote = {} as Note
    }

    this.titleControl.reset()
    this.titleControl.setValue(note?.title || '')

    this.contentControl.reset()
    this.contentControl.setValue(note?.content || '')
    this.editing = true
  }

  closeForm(): void {
    this.editing = false
    this.editingNote = {} as Note
  }

  saveNote(): void {
    if (this.titleControl.hasError('required')
      || this.contentControl.hasError('required')) return;

    this.noteService.saveNote(this.editingNote || {} as Note);
    this.notify(`"${this.editingNote.title}" is ${this.editingNote.id ? 'updated' : 'saved'}!`)
    this.closeForm()
    this.getNotes()
  }

  moveNoteToTrash(note: Note) {
    this.noteService.removeNote(note);
    this.notify(`${note.title} is deleted!`)
    this.getNotes()
  }

  notify = (message: string) => this.snackbar.open(message, 'Close', {duration: 3000})
  bindValue = (event: Event): string => (event.target as HTMLInputElement).value || ''
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

