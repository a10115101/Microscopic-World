import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Status from "./form/Status";
import Rating from "./form/Rating";
import Desciption from "./form/Desciption";
import AddRecordButton from "./button/AddRecordButton";

import { useRecords } from "src/contexts/RecordsContext";
import { getGeocoding } from "src/services/apiGeocoding";
import styles from "./MapRecordForm.module.css";
import Flag from "./form/Flag";

function MapRecordForm() {
  const navigate = useNavigate();
  const { setIsFormOpened, mapPosition, isClicked } = useRecords();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [continent, setContinent] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("planning");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const lat = mapPosition[0];
  const lng = mapPosition[1];

  const recordObject = {
    continent,
    country,
    countryCode,
    cityName,
    date,
    status,
    rating,
    position: {
      coordinates: [lng, lat],
    },
    description,
  };

  useEffect(
    function () {
      async function getLocationInfo() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const searchedData = await getGeocoding(
            `${mapPosition[0]},+${mapPosition[1]}`
          );

          const data = searchedData[0]?.components;

          if (!data.country_code || data === undefined)
            throw new Error(
              "Oops! It doesn't seem like a country or a city. Please click somewhere else on the map"
            );

          setContinent(data.continent);
          setCountryCode(data.country_code);
          setCountry(data.country);
          setCityName(
            data.city ||
              data.county ||
              data.village ||
              data.town ||
              data.neighbourhood ||
              data.state
          );
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      getLocationInfo();
    },

    [mapPosition]
  );

  if (!isClicked) return <h2>Start by clicking somewhere on the map</h2>;

  if (isLoadingGeocoding) return <h2>Loading...</h2>;

  if (!mapPosition) return <h2>Can not find this position on the map</h2>;

  if (geocodingError) return <h2>{geocodingError}</h2>;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div className={styles.topFormContainer}>
          <Flag record={{ countryCode, country, cityName }} />
        </div>

        <div className={styles.centerFormContainer}>
          <Status mode={"update"} status={status} setStatus={setStatus} />

          <div className={styles.date}>
            <label htmlFor="date">Date: </label>
            <DatePicker
              id="date"
              onChange={(date) => setDate(date)}
              selected={date}
              maxDate={status === "visited" && new Date()}
              minDate={status === "planning" && new Date()}
              dateFormat="MMM dd, yyyy"
            />
          </div>

          <Rating
            mode={"update"}
            rating={rating}
            setRating={setRating}
            currentStatus={status}
          />

          <Desciption
            mode={"update"}
            description={description}
            setDescription={setDescription}
          />
        </div>

        <div className={styles.bottomFormContainer}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
              setIsFormOpened(false);
            }}
          >
            Cancel
          </button>
          <AddRecordButton recordObject={recordObject} />
        </div>
      </form>
    </div>
  );
}

export default MapRecordForm;
