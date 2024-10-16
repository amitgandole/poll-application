export interface Option {
  id: number;
  optionText: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}

export interface PollResponse {
  userId: string;
  responses: Response[];
}

export interface Response {
  questionId: number;
  selectedOptionId: number;
}

export interface Poll {
  id: number;
  label: string;
  status: string;
  createdBy: string;
  createdAt: string;
  questions: Question[];
  responses?: PollResponse[];
}
