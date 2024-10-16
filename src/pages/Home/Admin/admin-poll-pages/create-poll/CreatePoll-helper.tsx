import { PlusCircleOutlined } from "@ant-design/icons";

type AddButton = {
  handleAddNewButton: () => void;
};

export const AddButton = ({ handleAddNewButton }: AddButton) => {
  return (
    <div className="create-poll">
      <PlusCircleOutlined
        className="add-poll-icon"
        onClick={() => handleAddNewButton()}
      />
    </div>
  );
};

export const buttonContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
};
