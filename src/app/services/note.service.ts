import { Injectable } from '@angular/core';

export interface Note {
  title: string,
  createdDate: Date,
  content: string,
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Note[] = [
    {title: 'Note 1', createdDate: new Date(), content: 'Some Content 1'},
    {title: 'Note 2', createdDate: new Date(), content: 'Some Content 2'},
    {title: 'Note 3', createdDate: new Date(), content: 'Some Content 3'},
    {title: 'Note 4', createdDate: new Date(), content: 'Some Content 4'},
  ]

  private deleteNotes: Note[] = [];

  getNotes(): Note[] {
    return this.notes;
  }

  getTrash(): Note[] {
    return this.deleteNotes;
  }
}
