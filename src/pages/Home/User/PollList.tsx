import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import modal from "antd/es/modal";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import { Poll, UserResponse } from "../../../interfaces/Poll";
import useLocalStorage from "../../../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/Constants";

type PollCardProps = {
  poll: Poll;
  userResponses: UserResponse[];
  handleGoToPoll: (poll: Poll) => void;
};

const PollCard = ({ poll, userResponses, handleGoToPoll }: PollCardProps) => {
  const responses = userResponses.filter(
    (resp: UserResponse) => resp.pollId === poll.id
  )[0];

  const statusString =
    responses.pollStatus && responses.pollStatus === "participated" ? (
      <span style={{ color: "red" }}>Incomplete Poll</span>
    ) : (
      "Response Submitted"
    );

  return (
    <Card key={poll.id} className="draft-poll-card">
      <div className="participate-card-content">
        <span>{poll.label}</span>
        <i>{statusString}</i>

        <div className="draft-card-icons">
          <Button
            type={responses?.pollStatus ? "default" : "primary"}
            className="poll-btn"
            onClick={() => handleGoToPoll(poll)}
          >
            {responses?.pollStatus ? "View Poll" : "Participate"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ActivePoll = () => {
  const [savedPolls, setSavedPolls] = useLocalStorage("savedPolls", []);
  const [userResponses, setUserResponses] = useLocalStorage(
    "userResponses",
    []
  );
  const [participatedPolls, setParticipatedPolls] = useState<Poll[]>([]);
  const [currentLoggedInUser] = useLocalStorage("currentLoggedInUser", [])[0];
  const navigate = useNavigate();

  useEffect(() => {
    const participatedPolls = savedPolls.filter((poll: Poll) => {
      return userResponses.some((resp: UserResponse) => {
        return (
          currentLoggedInUser.id === resp.userId && poll.id === resp.pollId
        );
      });
    });
    setParticipatedPolls(participatedPolls);
  }, [savedPolls]);

  const handleGoToPoll = (currentPoll: Poll) => {
    navigate(PATHS.participate + "/" + currentPoll.id);
  };

  return (
    <div className="container">
      <Card title="List of Participated Polls" className="poll-title-card">
        <div className="scrollable-cards">
          {participatedPolls.length > 0 ? (
            participatedPolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                userResponses={userResponses}
                handleGoToPoll={handleGoToPoll}
              />
            ))
          ) : (
            <Card className="draft-poll-card">
              <div className="draft-card-content">
                <span>You have not participated in poll yet!</span>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ActivePoll;
