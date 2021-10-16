import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateSituation } from "../../../../api/service";

import { changeSituation } from "../../../../modules/plots";

import { OK } from "../../../../constants/messages";

export default function SituationTab({ plot, handlePlotChange }) {
  const { situation } = plot;

  const [ text, setText ] = useState(situation);
  const [ isEditable, setIsEditable ] = useState(false);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCompleteClick = async () => {
    const resource = {
      plotId: plot._id,
      situation: text,
    };

    const response = await updateSituation(resource);

    if (response.result === OK) {
      alert("작성이 완료되었습니다.");
    }

    const updatedSituation = response.updatedPlot.situation;

    dispatch(changeSituation(updatedSituation, plot._id));
    handlePlotChange(response.updatedPlot);
    setIsEditable(false);
  };

  useEffect(() => {
    setText(situation);
  }, [situation]);

  return (
    <div className="situation-tab">
      <div className="situation-header">
        <div className="notification">이곳에서 작성한 글이 좌측 타임라인의 카드에 노출됩니다.</div>
        {!isEditable && (
          <button className="edit-button lotate" onClick={handleEditClick}>
            <img src="/images/edit_button.png" alt="수정하기 버튼" />
          </button>
        )}
        {isEditable && (
          <button className="character-button pop" onClick={handleCompleteClick}>
            <img src="/images/complete_button.png" alt="완료 버튼" />
          </button>
        )}
      </div>
      <div className="main-content main-content__full-height">
        {isEditable && (
          <textarea
            className="textarea-situation"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        )}
        {!isEditable && (
          <div>
            {situation}
          </div>
        )}
      </div>
    </div>
  );
}
