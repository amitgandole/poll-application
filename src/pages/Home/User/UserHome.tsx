import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import modal from "antd/es/modal";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import { Poll, UserResponse } from "../../../interfaces/Poll";
import useLocalStorage from "../../../utils/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/Constants";

type PollCardProps = {
  poll: Poll;
  onParticipatePoll: (poll: Poll, pollStatus: string | undefined) => void;
};

const PollCard = ({ poll, onParticipatePoll }: PollCardProps) => {
  const [currentLoggedInUser] = useLocalStorage("currentLoggedInUser", [])[0];
  const [userResponses, setUserResponses] = useLocalStorage(
    "userResponses",
    []
  );

  const responses = userResponses.filter(
    (resp: UserResponse) =>
      resp.userId === currentLoggedInUser.id && resp.pollId === poll.id
  )[0];
  console.log(responses);

  return (
    <Card key={poll.id} className="draft-poll-card">
      <div className="draft-card-content">
        <span>{poll.label}</span>
        <div className="draft-card-icons">
          <Button
            type={responses?.pollStatus ? "default" : "primary"}
            className="poll-btn"
            onClick={() => onParticipatePoll(poll, responses?.pollStatus)}
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
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredActivePolls = savedPolls.filter(
      (poll: Poll) => poll.status === "live"
    );
    setActivePolls(filteredActivePolls);
  }, [savedPolls]);

  const handleParticipatePoll = (
    currentPoll: Poll,
    pollStatus: string | undefined
  ) => {
    if (!pollStatus) {
      modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: `Do you want to participate in ${currentPoll.label.toLocaleUpperCase()} ?`,
        okButtonProps: { style: { backgroundColor: "green" } },
        okText: "Yes",
        cancelText: "No",
        onOk() {
          navigate(PATHS.participate + "/" + currentPoll.id);
        },
      });
      return;
    }
    navigate(PATHS.participate + "/" + currentPoll.id);
  };

  return (
    <div className="container">
      <Card title="List of Active Polls" className="poll-title-card">
        <div className="scrollable-cards">
          {activePolls.length > 0 ? (
            activePolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onParticipatePoll={handleParticipatePoll}
              />
            ))
          ) : (
            <Card className="draft-poll-card">
              <div className="draft-card-content">
                <span>No Active Polls!</span>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ActivePoll;
