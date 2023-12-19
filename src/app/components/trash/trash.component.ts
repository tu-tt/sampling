import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Note, NoteService } from 'src/app/services/note.service';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule,
    MatSnackBarModule,
  ],
})
export class TrashComponent implements AfterViewInit {
  columns: string[] = ['title', 'createdDate', 'action'];
  dataSource = new MatTableDataSource<Note>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public noteService: NoteService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getNotes()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getNotes(): void {
    const notes = this.noteService.getTrash();
    this.dataSource.data = notes
  }

  restoreNote(note: Note): void {
    this.noteService.restoreNote(note)
    this.notify(`"${note.title}" is restored!`)
    this.getNotes()
  }

  deleteNote(note: Note): void {
    this.noteService.deleteNote(note)
    this.notify(`"${note.title}" is permanently deleted!`)
    this.getNotes()
  }

  clearTrash(): void {
    this.noteService.clearTrash()
    this.notify(`Trash is now empty!`)
    this.getNotes()
  }

  notify = (message: string) => this.snackbar.open(message, 'Close', {duration: 3000})
}
