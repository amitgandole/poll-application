import { Button, Card, Input, Modal, Tooltip } from "antd";
import { Poll, Question, Option } from "../../../../../interfaces/Poll";
import { useState } from "react";
import generateUniqueId from "../../../../../utils/useUniqueId";
import { AddButton, buttonContainerStyle } from "./CreatePoll-helper";
import useLocalStorage from "../../../../../utils/useLocalStorage";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import modal from "antd/es/modal";

type EditPollProps = {
  draft: Poll;
  makeItLive: (draft: Poll) => void;
};

type PollQuestionsCardProps = {
  question: Question;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (questionId: number) => void;
};

const gridStyle: React.CSSProperties = {
  width: "50%",
  textAlign: "center",
  display: "flex",
  justifyContent: "start",
};

const containerStyle: React.CSSProperties = {
  maxHeight: "550px",
  overflowY: "auto",
  padding: "8px",
  marginBottom: "16px",
};

const PollQuestionsCard = ({
  question,
  onEditQuestion,
  onDeleteQuestion,
}: PollQuestionsCardProps) => {
  return (
    <div className="poll-question-card" style={{ marginBottom: "16px" }}>
      <Card
        title={question.questionText}
        actions={[
          <Tooltip placement="bottom" title="Edit question">
            <EditOutlined
              key="edit"
              style={{ color: "blue" }}
              onClick={() => onEditQuestion(question)}
            />
          </Tooltip>,
          <Tooltip placement="bottom" title="Delete question">
            <DeleteOutlined
              key="delete"
              style={{ color: "red" }}
              onClick={() => onDeleteQuestion(question.id)}
            />
          </Tooltip>,
        ]}
      >
        {question.options.map((option, index) => (
          <Card.Grid key={option.id} hoverable={false} style={gridStyle}>
            <span>{index + 1}:</span>
            <span style={{ marginLeft: "15px" }}>{option.optionText}</span>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

const EditPoll = ({ draft, makeItLive }: EditPollProps) => {
  const [questions, setQuestions] = useState<Question[]>(draft.questions);
  const [savedPolls, setSavedPolls] = useLocalStorage("savedPolls", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const [newQuestionText, setNewQuestionText] = useState<string>("");
  const [newOptions, setNewOptions] = useState<Option[]>([
    { id: 1, optionText: "" },
    { id: 2, optionText: "" },
    { id: 3, optionText: "" },
    { id: 4, optionText: "" },
  ]);

  const handleAddNewQuestionsBtn = () => {
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question);
    setNewQuestionText(question.questionText);
    setNewOptions(question.options);
    setIsModalOpen(true);
  };

  const handleSaveQuestion = () => {
    const newQuestion: Question = currentQuestion
      ? {
          ...currentQuestion,
          questionText: newQuestionText,
          options: newOptions,
        }
      : {
          id: generateUniqueId(),
          questionText: newQuestionText,
          options: newOptions,
        };

    const updatedQuestions = currentQuestion
      ? questions.map((q) => (q.id === newQuestion.id ? newQuestion : q))
      : [...questions, newQuestion];

    setQuestions(updatedQuestions);
    updateLocalStorageQuestions(updatedQuestions);
    resetModalState();
  };

  const handleDeleteQuestion = (questionId: number) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Do you really want to delete this?`,
      okButtonProps: { style: { backgroundColor: "red" } },
      okText: "Delete",
      cancelText: "Cancel",
      onOk() {
        setQuestions(updatedQuestions);
        updateLocalStorageQuestions(updatedQuestions);
      },
    });
  };

  const updateLocalStorageQuestions = (updatedQuestions: Question[]) => {
    const updatedPolls = savedPolls.map((poll: Poll) =>
      poll.id === draft.id ? { ...poll, questions: updatedQuestions } : poll
    );
    draft.questions = updatedQuestions;
    setSavedPolls(updatedPolls);
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setNewQuestionText("");
    setNewOptions([
      { id: 1, optionText: "" },
      { id: 2, optionText: "" },
      { id: 3, optionText: "" },
      { id: 4, optionText: "" },
    ]);
    setCurrentQuestion(null);
  };

  return (
    <Card title={draft.label} className="poll-title-card">
      <div style={containerStyle}>
        {questions.length ? (
          questions.map((question) => (
            <PollQuestionsCard
              key={question.id}
              question={question}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          ))
        ) : (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "grey",
            }}
          >
            Click on Add New Question to add questions!
          </span>
        )}
      </div>

      <div style={buttonContainerStyle}>
        <Button
          type="primary"
          onClick={() => handleAddNewQuestionsBtn()}
          icon={<FileAddOutlined />}
        >
          Add New Question
        </Button>
        <Button
          type="primary"
          style={questions.length > 0 ? { background: "red" } : {}}
          onClick={() => makeItLive(draft)}
          disabled={!(questions.length > 0)}
          icon={<CheckOutlined />}
        >
          Make it live
        </Button>
      </div>

      <Modal
        title={currentQuestion ? "Edit Question" : "Add New Question"}
        open={isModalOpen}
        onOk={handleSaveQuestion}
        onCancel={resetModalState}
      >
        <Input
          placeholder="Enter question text"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        <Card>
          {newOptions.map((option, index) => (
            <Card.Grid key={option.id} hoverable={false} style={gridStyle}>
              <Input
                placeholder={`Option ${index + 1}`}
                value={option.optionText}
                onChange={(e) => {
                  const updatedOptions = [...newOptions];
                  updatedOptions[index].optionText = e.target.value;
                  setNewOptions(updatedOptions);
                }}
              />
            </Card.Grid>
          ))}
        </Card>
      </Modal>
    </Card>
  );
};

export default EditPoll;
