import { Injectable } from '@angular/core';

export interface Note {
  id: number,
  title: string,
  createdDate: Date,
  content: string,
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Note[] = [
    {id: 1, title: 'Note 1', createdDate: new Date(), content: 'Some Content 1'},
    {id: 2, title: 'Note 2', createdDate: new Date(), content: 'Some Content 2'},
    {id: 3, title: 'Note 3', createdDate: new Date(), content: 'Some Content 3'},
    {id: 4, title: 'Note 4', createdDate: new Date(), content: 'Some Content 4'},
  ]

  private deleteNotes: Note[] = [];

  getNotes(): Note[] {
    return this.notes;
  }

  getTrash(): Note[] {
    return this.deleteNotes;
  }

  saveNote(note: Note): void {
    const obj: Note = {...note};
    if (obj.id) {
      const index = this.notes.findIndex(n => n.id === obj.id);
      this.notes[index] = obj
    } else {
      obj.createdDate = new Date()
      obj.id = this.notes.length + 1
      this.notes.push(obj)
    }
  }

  removeNote(note: Note): void {
    this.notes = this.notes.filter(n => n.id !== note.id)
    this.deleteNotes.push(note)
  }

  restoreNote(note: Note): void {
    this.deleteNotes = this.deleteNotes.filter(n => n.id !== note.id)
    this.notes.push(note)
  }

  deleteNote(note: Note): void {
    this.deleteNotes = this.deleteNotes.filter(n => n.id !== note.id)
  }

  clearTrash(): void {
    this.deleteNotes = []
  }
}
