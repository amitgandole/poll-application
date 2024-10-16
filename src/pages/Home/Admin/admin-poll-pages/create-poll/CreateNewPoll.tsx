import { Card, Input, Button } from "antd";
import { useState } from "react";
import { Poll } from "../../../../../interfaces/Poll";
import useLocalStorage from "../../../../../utils/useLocalStorage";
import generateUniqueId from "../../../../../utils/useUniqueId";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./CreatePoll.css";

type CreateNewPollProps = {
  showCreatNewPoll: boolean;
  setShowCreatNewPoll: (show: boolean) => void;
  savedPolls: Poll[];
  setSavedPolls: (polls: Poll[]) => void;
  currentPoll: Poll;
  setCurrentPoll: (poll: Poll) => void;
  setShowEditPoll: (show: boolean) => void;
};

const CreateNewPoll = ({
  showCreatNewPoll,
  setShowCreatNewPoll,
  savedPolls,
  setSavedPolls,
  currentPoll,
  setCurrentPoll,
  setShowEditPoll,
}: CreateNewPollProps) => {
  const [pollTitle, setPollTitle] = useState("");
  const [currentLoggedInUser] = useLocalStorage("currentLoggedInUser", []);

  const handleSavePollTitle = () => {
    const newPoll: Poll = {
      id: generateUniqueId(),
      label: pollTitle,
      status: "draft",
      createdBy: currentLoggedInUser[0].firstName,
      createdAt: new Date().toISOString(),
      questions: [],
    };

    setSavedPolls([...savedPolls, newPoll]);
    setCurrentPoll(newPoll);
    setShowEditPoll(true);
    setShowCreatNewPoll(false);
  };

  return (
    <Card title="What should be the poll title?" className="poll-title-card">
      <Input
        value={pollTitle}
        placeholder="Enter poll title..."
        onChange={(e) => setPollTitle(e.target.value)}
      ></Input>
      <div className="save-cancel-btns">
        <Button
          type="primary"
          icon={<CheckOutlined />}
          className="save-btn"
          onClick={() => handleSavePollTitle()}
        >
          Save
        </Button>
        <Button
          icon={<CloseOutlined />}
          className="cancel-btn"
          onClick={() => {
            setPollTitle("");
            setShowCreatNewPoll(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default CreateNewPoll;
