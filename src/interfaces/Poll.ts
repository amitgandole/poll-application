export interface Option {
  id: string;
  optionText: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: Option[];
}

export interface Poll {
  id: string;
  label: string;
  status: string;
  createdBy: string;
  createdAt: string;
  questions: Question[];
}
