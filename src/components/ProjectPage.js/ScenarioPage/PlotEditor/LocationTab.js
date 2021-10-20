import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updateLocation } from "../../../../api/service";

import { changeLocation } from "../../../../modules/plots";

import {
  FAILED_BASIC,
  FAILED_UPLOAD_IMAGE,
  OK,
} from "../../../../constants/messages";

import Button from "../../../Button";
import addPhoto from "../../../../utils/addPhoto";

export default function LocationTab({ plot, handlePlotChange }) {
  const { location } = plot;
  const { title, imageURL, description } = location;

  const [ changedTitle, setChangedTitle ] = useState(title);
  const [ changedDescription, setChangedDescription ] = useState(description);
  const [ changedImage, setChangedImage ] = useState(imageURL);
  const [ isEditable, setIsEditable ] = useState(false);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCompleteClick = async () => {
    const resource = {
      plotId: plot._id,
      title: changedTitle,
      imageURL: changedImage,
      description: changedDescription,
    };

    const response = await updateLocation(resource);

    if (response.result !== OK) {
      alert(FAILED_BASIC);
    }

    const updatedLocation = response.updatedPlot.location;

    dispatch(changeLocation(updatedLocation, plot._id));
    handlePlotChange(response.updatedPlot);
    setIsEditable(false);
  };

  const changeImage = async () => {
    const data = await addPhoto();

    if (!data) {
      alert(FAILED_UPLOAD_IMAGE);

      return;
    }

    if (typeof data !== "string") {
      setChangedImage(data.Location);
    }
  };

  useEffect(() => {
    setChangedTitle(title);
    setChangedDescription(description);
    setChangedImage(imageURL);
  }, [location]);

  return (
    <div className="situation-tab">
      <div className="situation-header">
        {isEditable && (
          <textarea
            className="input__location__title"
            wrap="hard"
            value={changedTitle}
            onChange={(event) => setChangedTitle(event.target.value)}
          />
        )}
        {!isEditable && (
          <div className="location__title">
            {changedTitle}
          </div>
        )}
        {!isEditable && (
          <button className="edit-button rotate" onClick={handleEditClick}>
            <img src="/images/edit_button.png" alt="수정하기 버튼" />
          </button>
        )}
        {isEditable && (
          <Button
            className="button button--square button--brown pop"
            content="Save"
            onClick={handleCompleteClick}
          />
        )}
      </div>
      <div className="location-image">
        {changedImage && (
          <img
            src={changedImage}
            alt="장소 이미지"
            width="180"
            height="180"
          />
        )}
        {isEditable && (
          <div className="image-uploader image-uploader-location">
            <label htmlFor="uploader">
              <img
                className="image-uploader__image"
                src="/images/image_uploader_icon.png"
                alt="이미지 첨부 아이콘"
                width="45px"
                height="40px"
              />
            </label>
            <input
              className="image-uploader__input"
              type="file"
              id="uploader"
              accept=".png, .jpg, .jpeg"
              onChange={changeImage}
            />
          </div>
        )}
      </div>
      <div className="main-content">
        {isEditable && (
          <textarea
            className="textarea-situation"
            value={changedDescription}
            onChange={(event) => setChangedDescription(event.target.value)}
          />
        )}
        {!isEditable && (
          <div>
            {changedDescription}
          </div>
        )}
      </div>
    </div>
  );
}
