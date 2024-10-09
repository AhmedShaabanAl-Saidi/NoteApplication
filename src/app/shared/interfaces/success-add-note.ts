export interface SuccessAddNote {
  msg: string;
  note: Note;
}

interface Note {
  title: string;
  content: string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
