import { Button, Card } from "antd";
import useLocalStorage from "../../../../utils/useLocalStorage";
import { Poll } from "../../../../interfaces/Poll";
import { useEffect, useState } from "react";
import "./create-poll/CreatePoll.css";
import modal from "antd/es/modal";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";

type PollCardProps = {
  poll: Poll;
  handleShowResult: (poll: Poll) => void;
};

const PollCard = ({ poll, handleShowResult }: PollCardProps) => {
  return (
    <Card key={poll.id} className="draft-poll-card">
      <div className="draft-card-content">
        <span>{poll.label}</span>
        <div className="draft-card-icons">
          <Button
            type="primary"
            className="close-poll-btn"
            onClick={() => handleShowResult(poll)}
          >
            See Results
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ClosedPoll = () => {
  const [savedPolls, setSavedPolls] = useLocalStorage("savedPolls", []);
  const [closedPolls, setClosedPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const filteredActivePolls = savedPolls.filter(
      (poll: Poll) => poll.status === "closed"
    );
    setClosedPolls(filteredActivePolls);
  }, [savedPolls]);

  const handleClosePoll = (currentPoll: Poll) => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to close ${currentPoll.label.toLocaleUpperCase()} ?`,
      okButtonProps: { style: { backgroundColor: "red" } },
      okText: "Delete",
      onOk() {},
    });
  };

  return (
    <div className="container">
      <Card title="List of Closed Polls" className="poll-title-card">
        <div className="scrollable-cards">
          {closedPolls.length > 0 ? (
            closedPolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                handleShowResult={handleClosePoll}
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

export default ClosedPoll;
