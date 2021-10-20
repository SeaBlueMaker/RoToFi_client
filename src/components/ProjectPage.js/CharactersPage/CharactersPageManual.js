export default function CharactersPageManual() {
  return (
    <div className="manual">
      <div className="list">
        <div className="description">
          ⇡
          <br />
          등장인물을 등록하는 탭입니다.
          등록된 인물은 다음과 같이 리스트에 표시됩니다.
        </div>
        <div className="description">
          이름을 클릭하면 해당 인물에 대한 정보가 우측 에디터에 표시됩니다.
        </div>
        <div className="description">
          아래의 버튼을 누르면 등장인물을 추가할 수 있도록 우측 에디터가 입력 모드로 전환됩니다.
          <br />
          ⇣
        </div>
      </div>
      <div className="info">
        <div className="box-wrap description">
          인물명 우측의 버튼을 누르면 해당 인물의 설정을 편집할 수 있도록 에디터가 편집 모드로 전환됩니다.
        </div>
      </div>
    </div>
  );
}
