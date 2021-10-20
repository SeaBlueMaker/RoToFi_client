export default function ScenarioPageManual() {
  return (
    <div className="manual">
      <div className="manual__timeline">
        <div className="description">
          ⇡
          <br />
          타임라인은 수직선 중앙의 챕터 카드와 우측의 플롯 카드로 이루어져 있습니다.
          각각의 카드는 시나리오의 한 장면을 의미합니다.
        </div>
        <div className="description">
          각 카드를 클릭하면 해당 카드가 붉게 변하고,
          <br />
          해당 카드에 담긴 정보가 우측 에디터에 표시됩니다.
          <br />
          <br />
          시나리오의 구성을 바꾸고 싶은 경우,
          <br />
          카드를 클릭하여 드래그하면 카드의 순서를 바꿀 수 있습니다.
        </div>
        <div className="description description--column">
          <div className="description">
            챕터 카드를 추가합니다.
            <br />
            ⇣
          </div>
          <div className="description">
            수정된 순서를 저장합니다.
            ⇣
          </div>
          <div className="description">
            플롯 카드를 추가합니다.
            <br />
            ⇣
          </div>
        </div>
      </div>
      <div className="manual__editor">
        <div className="description description--column">
          <div className="description">
            ⇡
            <br />
            해당 플롯에서 펼쳐지는 상황을 기술합니다.
          </div>
          <div className="description">
            ⇡
            <br />
            장소를 정의합니다.
            이미지를 첨부할 수 있습니다.
          </div>
          <div className="description">
            ⇡
            <br />
            등장인물 간의 대화를 채팅 형식으로 입력할 수 있는 공간입니다.
          </div>
        </div>
      </div>
    </div>
  );
}
