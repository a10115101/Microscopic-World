import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MapRecordListItem from "./MapRecordListItem";

import { useMapSearch } from "src/contexts/MapSearchContext";
import { useRecordForm } from "src/contexts/RecordFormContext";
import { useRecords } from "src/contexts/RecordsContext";
import { useRecordsFilter } from "src/contexts/RecordsFilterContext";
import { getAllRecords } from "src/services/apiRecord";
import styles from "./MapRecordList.module.css";

function MapRecordList() {
  const { setSelectedPosition } = useMapSearch();
  const { setIsFormOpened } = useRecordForm();
  const { records, setRecords } = useRecords();
  const { statusFilter, dateFilter } = useRecordsFilter();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  useEffect(function () {
    setSelectedPosition(null);
    setIsFormOpened(false);
  }, []);

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoading(true);
          setLoadingError("");

          const data = await getAllRecords(statusFilter, dateFilter);

          setRecords(data);
        } catch (err) {
          setLoadingError("Loading Error");
        } finally {
          setIsLoading(false);
        }
      }
      getData();
    },
    [statusFilter, dateFilter]
  );

  if (isLoading) return <p>Loading...</p>;

  if (loadingError) return <p>{loadingError}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <h3>Add new record here </h3>
        <Link
          to="/map/form"
          onClick={() => {
            setSelectedPosition(null);
            setIsFormOpened(true);
          }}
        >
          &#43;
        </Link>
      </div>

      <div className={styles.bottomContainer}>
        <ul>
          {records.map((record) => (
            <MapRecordListItem record={record} key={record._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapRecordList;
