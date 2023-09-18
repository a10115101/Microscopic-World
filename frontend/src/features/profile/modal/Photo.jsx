import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { useAuth } from "../../../contexts/AuthContext";
import { updateUser } from "../../../services/apiUser";
import { options } from "../../../utilities/snackbar";
import { updateLocalStorage } from "../../../utilities/updateLoaclStorage";
import styles from "./modal.module.css";

function Photo({ closeModal, userInfo }) {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [photoFile, setPhotoFile] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let updateMeObject = new FormData();
      updateMeObject.append("photo", photoFile);

      const newUpadte = await updateUser(userInfo._id, updateMeObject);
      updateLocalStorage(newUpadte);
      setCurrentUser(newUpadte);
      closeModal();
      navigate("/profile");
      enqueueSnackbar("Success Update!", options("success"));
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  return (
    <div
      className={`${styles.outerContainer} modalOuterContainer`}
      onClick={(e) => {
        if (e.target.className.includes("modalOuterContainer")) closeModal();
      }}
    >
      <div className={styles.innerContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="photo">Photo</label>
            <input
              id="photo"
              type="file"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />
          </div>
          <button>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Photo;
