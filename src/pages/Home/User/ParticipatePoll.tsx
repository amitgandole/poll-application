import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../../utils/useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import {
  Option,
  Poll,
  Question,
  UserResponse,
  UserPollResponse,
} from "../../../interfaces/Poll";
import generateUniqueId from "../../../utils/useUniqueId";
import { Button, Card, Radio } from "antd";
import { PATHS } from "../../../utils/Constants";
import { User } from "../../../interfaces/User";
import { getLocalStorageData, setLocalStorageData } from "../Home.helper";

type PollCardProps = {
  question: Question;
  selectedOptionId: number | null;
  isPollSubmitted: boolean;
  onAnswerClick: (que: Question, option: Option) => void;
};

const PollCard = ({
  question,
  selectedOptionId,
  isPollSubmitted,
  onAnswerClick,
}: PollCardProps) => {
  return (
    <Card
      key={question.id}
      title={question.questionText}
      className="part-poll-card"
    >
      <div className="draft-card-content">
        <div className="draft-card-icons">
          <Radio.Group value={selectedOptionId} disabled={isPollSubmitted}>
            {question.options.map((option) => {
              return (
                <Radio
                  className="option-radio"
                  key={option.id}
                  value={option.id}
                  onClick={() => onAnswerClick(question, option)}
                >
                  {option.optionText}
                </Radio>
              );
            })}
          </Radio.Group>
        </div>
      </div>
    </Card>
  );
};

const PollList = () => {
  const [savedPolls, setSavedPolls] = useState<Poll[]>([]);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<User[]>([]);

  const emptyPoll: Poll = {
    id: 0,
    label: "",
    status: "draft",
    createdBy: "",
    createdAt: new Date().toISOString(),
    questions: [],
  };

  const { pollId } = useParams();
  const navigate = useNavigate();
  console.log(pollId);

  const currentPoll = useMemo(() => {
    return savedPolls.find((p: Poll) => p.id === Number(pollId)) || emptyPoll;
  }, [pollId, savedPolls]);

  useEffect(() => {
    const savedPollsFromStorage = getLocalStorageData("savedPolls");
    const savedResponsesFromStorage = getLocalStorageData("userResponses");
    const savedCurrentUserFromStorage = getLocalStorageData(
      "currentLoggedInUser"
    );

    setSavedPolls(savedPollsFromStorage);
    setUserResponses(savedResponsesFromStorage);
    setCurrentLoggedInUser(savedCurrentUserFromStorage);
  }, []);

  const handleOnAnswerClick = (question: Question, optionAns: Option) => {
    const updatedResponses = [...userResponses];

    let userResponse = getCurrentUserResponse();
    if (userResponse) {
      userResponse.responses = {
        ...userResponse.responses,
        [question.id]: optionAns.id,
      };
    } else {
      const newUserResponse: UserResponse = {
        id: generateUniqueId(),
        pollId: currentPoll.id,
        userId: currentLoggedInUser[0].id,
        pollStatus: "participated",
        responses: { [question.id]: optionAns.id },
      };
      updatedResponses.push(newUserResponse);
    }

    setUserResponses(updatedResponses);
    setLocalStorageData("userResponses", updatedResponses);
  };

  const getSelectedResponseId = (queId: number) => {
    return getCurrentUserResponse()?.responses[queId] ?? null;
  };

  const getCurrentUserResponse = () => {
    return userResponses.find(
      (resp: UserResponse) =>
        resp.pollId === currentPoll.id &&
        resp.userId === currentLoggedInUser[0].id
    );
  };

  const allQuestionsAnswered = () => {
    const userResponse = getCurrentUserResponse();
    if (!userResponse) return false;

    return currentPoll.questions?.every(
      (que: Question) => userResponse.responses[que.id] !== undefined
    );
  };

  const getPollStatus = () => {
    const userResponse = getCurrentUserResponse();
    return userResponse ? userResponse.pollStatus : undefined;
  };

  const handleSubmitPollResponse = () => {
    const updatedResponses = [...userResponses];
    const userResponse = getCurrentUserResponse();
    if (userResponse) userResponse.pollStatus = "completed";
    setLocalStorageData("userResponses", updatedResponses);
    navigate(PATHS.home);
  };

  return (
    <div>
      <a onClick={() => navigate(PATHS.home)}>{"<<<<<< Go to Home"}</a>
      <div className="container">
        <Card
          title={currentPoll.label}
          extra={
            <div className="poll-status">
              <span
                className={
                  currentPoll.status === "live" ? "blinking-dot" : "static-dot"
                }
              ></span>
              {" Poll is " + currentPoll.status.toUpperCase()}
            </div>
          }
          className="poll-title-card"
          actions={[
            <Button
              type="primary"
              disabled={
                !allQuestionsAnswered() || getPollStatus() === "completed"
              }
              onClick={() => handleSubmitPollResponse()}
            >
              {getPollStatus() === "completed" ? <i>Submitted</i> : "Submit"}
            </Button>,
          ]}
        >
          <div className="scrollable-cards">
            {currentPoll.questions.length > 0 ? (
              currentPoll.questions.map((question: Question) => (
                <PollCard
                  key={question.id}
                  question={question}
                  selectedOptionId={getSelectedResponseId(question.id)}
                  isPollSubmitted={getPollStatus() === "completed"}
                  onAnswerClick={handleOnAnswerClick}
                />
              ))
            ) : (
              <Card className="draft-poll-card">
                <div className="draft-card-content">
                  <span>No Questions Available!</span>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PollList;
