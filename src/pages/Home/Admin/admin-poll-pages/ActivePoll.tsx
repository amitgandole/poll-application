import { Button, Card } from "antd";
import useLocalStorage from "../../../../utils/useLocalStorage";
import { Poll } from "../../../../interfaces/Poll";
import { useEffect, useState } from "react";
import "./create-poll/CreatePoll.css";
import modal from "antd/es/modal";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";

type PollCardProps = {
  poll: Poll;
  onClosePoll: (poll: Poll) => void;
};

const PollCard = ({ poll, onClosePoll }: PollCardProps) => {
  return (
    <Card key={poll.id} className="draft-poll-card">
      <div className="draft-card-content">
        <span>{poll.label}</span>
        <div className="draft-card-icons">
          <Button
            type="primary"
            className="close-poll-btn"
            onClick={() => onClosePoll(poll)}
          >
            Close Poll
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ActivePoll = () => {
  const [savedPolls, setSavedPolls] = useLocalStorage("savedPolls", []);
  const [activePolls, setActivePolls] = useState<Poll[]>([]);

  useEffect(() => {
    const filteredActivePolls = savedPolls.filter(
      (poll: Poll) => poll.status === "live"
    );
    setActivePolls(filteredActivePolls);
  }, [savedPolls]);

  const handleClosePoll = (currentPoll: Poll) => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to close ${currentPoll.label.toLocaleUpperCase()} ?`,
      okButtonProps: { style: { backgroundColor: "red" } },
      okText: "Close",
      cancelText: "Cancel",
      onOk() {
        const updatedPolls = savedPolls.map((poll: Poll) =>
          poll.id === currentPoll.id ? { ...poll, status: "closed" } : poll
        );
        setSavedPolls(updatedPolls);
      },
    });
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
                onClosePoll={handleClosePoll}
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
