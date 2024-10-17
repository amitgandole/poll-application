export interface Option {
  id: number;
  optionText: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}
export interface Poll {
  id: number;
  label: string;
  status: string;
  createdBy: string;
  createdAt: string;
  questions: Question[];
}

export interface UserResponse {
  id: number;
  pollId: number;
  pollStatus?: string;
  userId: number;
  responses: UserPollResponse;
}

export interface UserPollResponse {
  [questionId: number]: number;
}
