import { Button, Card, Input } from "antd";
import useLocalStorage from "../../../../../utils/useLocalStorage";
import "./CreatePoll.css";
import { Poll } from "../../../../../interfaces/Poll";
import { useEffect, useState } from "react";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import {
  CheckOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import generateUniqueId from "../../../../../utils/useUniqueId";

const CreatePoll = () => {
  // Design card for saved polls
  /* 1. Saved polls will be fetched
  2. Drafts polls will be filtered from saved polls
  3. Drafts polls will be displayed in card
  */

  const [savedPolls, setSavedPolls] = useLocalStorage("savedPolls", []);
  const [draftsPolls, setDraftsPolls] = useState<Poll[]>([]);
  const [showCreatePollTitle, setShowCreatePollTitle] = useState(false);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [currentLoggedInUser] = useLocalStorage("currentLoggedInUser", []);

  useEffect(() => {
    const drafts = savedPolls.filter((poll: Poll) => poll.status === "draft");
    console.log(drafts);
    setDraftsPolls(drafts);
  }, [savedPolls]);

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
    setShowCreatePollTitle(false);
  };
  const editDraftPoll = (draft: Poll) => {
    console.log(draft);
  };

  const DraftPolls = () => {
    return (
      <Card title="Draft Polls" className="poll-title-card">
        <div className="scrollable-cards">
          {draftsPolls.length > 0 ? (
            draftsPolls.map((draft) => {
              return (
                <Card
                  key={draft.id}
                  className="draft-poll-card"
                  onClick={() => editDraftPoll(draft)}
                >
                  <div className="draft-card-content">
                    <span>{draft.label}</span>
                    <EditOutlined className="edit-icon" />
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="draft-poll-card">
              <div className="draft-card-content">
                <span>No Saved Polls!</span>
              </div>
            </Card>
          )}
        </div>
      </Card>
    );
  };

  const handleCreatePollButton = () => {
    setShowCreatePoll(false);
    setShowCreatePollTitle(true);
  };

  const AddButton = () => {
    return (
      <div className="create-poll">
        <PlusCircleOutlined
          className="add-poll-icon"
          onClick={() => handleCreatePollButton()}
        />
      </div>
    );
  };

  return (
    <div>
      {!showCreatePollTitle && (
        <div className="poll-container">
          {" "}
          <DraftPolls />
          <AddButton />
        </div>
      )}

      {showCreatePollTitle && !showCreatePoll && (
        <div className="poll-container">
          <Card
            title="What should be the poll title?"
            className="poll-title-card"
          >
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
                onClick={() => setShowCreatePollTitle(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreatePoll;
