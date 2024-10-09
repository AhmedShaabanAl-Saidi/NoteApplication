import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesService } from '../../shared/services/notes.service';
import { Note } from '../../shared/interfaces/notes-data';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // global property
  isLoading: boolean = false;
  errMsg: string = '';
  noteList: Note[] = [];
  noteId!: string;
  searchTerm: string = '';

  constructor(private _NotesService: NotesService) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }
    this.getNotes();
  }

  addNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  updateNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  addNote(): void {
    this.isLoading = true;
    this._NotesService.addNote(this.addNoteForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        this.isLoading = false;
        this.addNoteForm.reset();
        this.getNotes();
      },
      error: (err) => {
        // console.log(err);
        this.isLoading = false;
        this.errMsg = err.error.msg;
      },
    });
  }

  getNotes(): void {
    this.isLoading = true;
    this._NotesService.getNotes().subscribe({
      next: (res) => {
        this.isLoading = false;
        if ('notes' in res) {
          if (res?.notes) {
            this.noteList = res.notes;
          } else {
            this.noteList = []; // Clear the list if no notes found
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);

        if (err.status === 404) {
          // Handle 404 error specifically
          console.log(err.error.msg || 'No notes found.'); // Display message from backend or a default message
          this.noteList = []; // Clear the list in case of 404
        } else {
          // General error handling for other status codes
          console.log('An error occurred: ', err.message);
        }
      },
    });
  }

  setUpdateForm(note: Note, id: string): void {
    this.noteId = id;
    this.updateNoteForm.patchValue(note);
  }

  updateNote(): void {
    this.isLoading = true;
    this._NotesService
      .updateUserNotes(this.noteId, this.updateNoteForm.value)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.isLoading = false;
          this.getNotes();
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.msg;
          // console.log(err);
        },
      });
  }

  deleteNote(id: string): void {
    this._NotesService.deleteUserNotes(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getNotes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
