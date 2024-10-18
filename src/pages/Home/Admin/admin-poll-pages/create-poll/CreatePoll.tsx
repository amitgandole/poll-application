import { Button, Card, Input, Modal } from "antd";
import useLocalStorage from "../../../../../utils/useLocalStorage";
import "./CreatePoll.css";
import { Poll } from "../../../../../interfaces/Poll";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import generateUniqueId from "../../../../../utils/useUniqueId";
import CreateNewPoll from "./CreateNewPoll";
import modal from "antd/es/modal";
import EditPoll from "./EditPoll";
import { AddButton } from "./CreatePoll-helper";

const CreatePoll = () => {
  // Design card for saved polls
  /* 1. Saved polls will be fetched
  2. Drafts polls will be filtered from saved polls
  3. Drafts polls will be displayed in card
  */

  const [draftsPolls, setDraftsPolls] = useState<Poll[]>([]);
  const [showEditPoll, setShowEditPoll] = useState(false);
  const [showCreatNewPoll, setShowCreatNewPoll] = useState(false);
  const [savedPolls, setSavedPolls] = useLocalStorage("savedPolls", []);
  const emptyPoll: Poll = {
    id: generateUniqueId(),
    label: "",
    status: "draft",
    createdBy: "",
    createdAt: new Date().toISOString(),
    questions: [],
  };
  const [currentPoll, setCurrentPoll] = useState<Poll>(emptyPoll);

  useEffect(() => {
    const drafts = savedPolls.filter((poll: Poll) => poll.status === "draft");
    console.log(drafts);
    setDraftsPolls(drafts);
  }, [savedPolls]);

  const deleteDraftPoll = (draft: Poll) => {
    console.log(draft);

    const updatedPolls = savedPolls.filter((d: Poll) => d.id !== draft.id);
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to delete ${draft.label.toLocaleUpperCase()} ?`,
      okButtonProps: { style: { backgroundColor: "red" } },
      okText: "Delete",
      cancelText: "Cancel",
      onOk() {
        setSavedPolls(updatedPolls);
      },
    });
  };

  const editDraftPoll = (draft: Poll) => {
    console.log(draft);
    setCurrentPoll(draft);
    setShowCreatNewPoll(false);
    setShowEditPoll(true);
  };

  const DraftPolls = () => {
    return (
      <Card title="Draft Polls" className="poll-title-card">
        <div className="scrollable-cards">
          {draftsPolls.length > 0 ? (
            draftsPolls.map((draft) => {
              return (
                <Card key={draft.id} className="draft-poll-card">
                  <div className="draft-card-content">
                    <span>{draft.label}</span>
                    <div className="draft-card-icons">
                      <EditOutlined
                        className="draft-card-icon edit-icon"
                        onClick={() => editDraftPoll(draft)}
                      />
                      <DeleteOutlined
                        className="draft-card-icon delete-icon"
                        onClick={() => deleteDraftPoll(draft)}
                      />
                    </div>
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
    setShowEditPoll(false);
    setShowCreatNewPoll(true);
  };

  const handleMakeItLiveBtn = (draft: Poll) => {
    console.log(draft);

    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to make ${draft.label.toLocaleUpperCase()} live ?`,
      okButtonProps: { style: { backgroundColor: "green" } },
      okText: "Yes",
      cancelText: "No",
      onOk() {
        savedPolls.map((poll: Poll) => {
          if (draft.id === poll.id) {
            poll.status = "live";
            setSavedPolls([...savedPolls]);
            setShowCreatNewPoll(false);
            setShowEditPoll(false);
          }
        });
      },
    });
  };

  return (
    <div>
      {!showCreatNewPoll && !showEditPoll && (
        <div className="container">
          {" "}
          <DraftPolls />
          <AddButton handleAddNewButton={handleCreatePollButton} />
        </div>
      )}

      {showCreatNewPoll && (
        <div className="container">
          <CreateNewPoll
            showCreatNewPoll={showCreatNewPoll}
            savedPolls={savedPolls}
            setSavedPolls={setSavedPolls}
            currentPoll={currentPoll}
            setShowCreatNewPoll={setShowCreatNewPoll}
            setCurrentPoll={setCurrentPoll}
            setShowEditPoll={setShowEditPoll}
          />
        </div>
      )}

      {showEditPoll && (
        <div>
          <a
            onClick={() => {
              setShowCreatNewPoll(false);
              setShowEditPoll(false);
            }}
          >
            {"<<<<<< Go to Drafts"}
          </a>
          <div className="container">
            <EditPoll draft={currentPoll} makeItLive={handleMakeItLiveBtn} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePoll;
