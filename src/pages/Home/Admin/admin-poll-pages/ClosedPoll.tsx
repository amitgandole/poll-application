import ReactEcharts from "echarts-for-react";
import { Button, Card, Modal } from "antd";
import useLocalStorage from "../../../../utils/useLocalStorage";
import { Poll, UserResponse, Question } from "../../../../interfaces/Poll";
import { useEffect, useState } from "react";
import "./create-poll/CreatePoll.css";

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
  const [savedPolls] = useLocalStorage("savedPolls", []);
  const [userResponses] = useLocalStorage("userResponses", []);
  const [closedPolls, setClosedPolls] = useState<Poll[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const filteredClosedPolls = savedPolls.filter(
      (poll: Poll) => poll.status === "closed"
    );
    setClosedPolls(filteredClosedPolls);
  }, [savedPolls]);

  const handleShowResult = (currentPoll: Poll) => {
    setSelectedPoll(currentPoll);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPoll(null);
  };

  const getChartData = (question: Question) => {
    if (!selectedPoll) return [];

    const responsesForPoll = userResponses.filter((response: UserResponse) => {
      return response.pollId === selectedPoll.id;
    });

    if (!responsesForPoll.length) return [];

    const optionCounts: { [key: number]: number } = {};
    question.options.forEach((option) => {
      optionCounts[option.id] = 0;
    });

    responsesForPoll.forEach((response: UserResponse) => {
      const optionId = response.responses[question.id];
      if (optionCounts[optionId] !== undefined) {
        optionCounts[optionId]++;
      }
    });

    return question.options.map((option) => ({
      value: optionCounts[option.id],
      name: option.optionText,
    }));
  };

  const renderCharts = () => {
    if (!selectedPoll) return `<span>No Response!<span/>`;

    return selectedPoll.questions.map((question, index) => {
      const chartData = getChartData(question);
      if (!chartData.length) {
        return (
          <Card
            key={question.id}
            className="chart-container"
            title={question.questionText}
            style={{ display: "block" }}
            hoverable={true}
          >
            <p>No response recieved!</p>
          </Card>
        );
      }
      const options = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Options",
            type: "pie",
            radius: "50%",
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      return (
        <Card
          key={question.id}
          className="chart-container"
          title={question.questionText}
          style={{ marginBottom: "10px" }}
          hoverable={true}
        >
          <ReactEcharts option={options} />
        </Card>
      );
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
                handleShowResult={handleShowResult}
              />
            ))
          ) : (
            <Card className="draft-poll-card">
              <div className="draft-card-content">
                <span>No Closed Polls Available!</span>
              </div>
            </Card>
          )}
        </div>
      </Card>

      <Modal
        title={`Results for ${selectedPoll?.label}`}
        className="result-modal"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {renderCharts()}
      </Modal>
    </div>
  );
};

export default ClosedPoll;
