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
  pollStatus?: string;
  responses: { [questionId: number]: number };
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
