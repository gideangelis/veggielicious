import { useNavigate } from "react-router-dom";

import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  function handleBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button
      type="back"
      onClick={handleBack}
    >
      Go back
    </Button>
  );
}

export default BackButton;
