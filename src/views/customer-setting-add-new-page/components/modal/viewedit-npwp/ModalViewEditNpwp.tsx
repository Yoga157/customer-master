import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import * as ModalAction from "stores/modal/first-level/ModalFirstLevelActions";
import { Divider, Button, Icon } from "semantic-ui-react";
import "../Modal.scss";

interface IProps {
  uploadFile: File | null;
  setUploadFile: (file: File | null) => void;
}

const ModalViewNpwp: React.FC<IProps> = ({
  uploadFile,
  setUploadFile,
}: IProps) => {
  const dispatch: Dispatch = useDispatch();
  const [newUploadFile, setNewUploadFile] = useState(null);

  const cancelClick = () => {
    dispatch(ModalAction.CLOSE());
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setNewUploadFile(selectedFile);
    setUploadFile(selectedFile);
  };

  const handleReuploadClick = () => {
    const inputFile = document.getElementById("file-input");
    if (inputFile instanceof HTMLInputElement) {
      inputFile.click();
    }
  };

  const handleFinalSubmit = () => {
    if (uploadFile) {
    }
    dispatch(ModalAction.CLOSE());
  };
  return (
    <Fragment>
      <p className="title-paragraph">VIEW/EDIT NPWP CARD</p>
      <Divider />

      {uploadFile && (
        <div>
          <img
            src={URL.createObjectURL(newUploadFile || uploadFile)}
            alt="NPWP Card"
            className="card-reuploud"
          />
        </div>
      )}

      <div className="btn-reuploud" onClick={handleReuploadClick}>
        <Icon name="upload" /> Reupload NPWP Card Image
      </div>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUploadChange}
      />

      <Divider />

      <div
        className="btn-cancel-reuploud"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="button" onClick={cancelClick}>
          Cancel
        </Button>
        <Button
          textAlign="center"
          className="MarBot10"
          type="submit"
          color="blue"
          style={{ marginRight: "1rem" }}
          onClick={handleFinalSubmit}
        >
          Submit
        </Button>
      </div>
    </Fragment>
  );
};

export default ModalViewNpwp;
