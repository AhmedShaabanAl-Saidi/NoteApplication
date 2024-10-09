import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesService } from '../../shared/services/notes.service';
import { Note, NotesData } from '../../shared/interfaces/notes-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // global property
  isLoading: boolean = false;
  errMsg: string = '';
  noteList: Note[] = [];

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
        console.log(res);
        this.isLoading = false;
        this.noteList = res.notes;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
