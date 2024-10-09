import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/notes-data';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(notes: Note[], term: string): Note[] {
    return notes.filter((note) =>
      note.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
