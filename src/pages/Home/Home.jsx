import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination/lib/Pagination";
import { fetchEvents } from "../../redux/events/operations";
import {
  selectEvents,
  selectPage,
  selectTotalEvents,
} from "../../redux/events/selectors";
import { setPage } from "../../redux/events/eventsSlice";
import css from "./Home.module.css";
import { LIMIT_NUMBER } from "../../services/config";
import FilteredMenu from "../../components/FilteredMenu/FilteredMenu";

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const page = useSelector(selectPage);
  const totalEvents = useSelector(selectTotalEvents);

  const [titleFilter, setTitleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [organizerFilter, setOrganizerFilter] = useState("");

  const handleTitleChange = (e) => setTitleFilter(e.target.value);
  const handleDateChange = (e) => setDateFilter(e.target.value);
  const handleOrganizerChange = (e) => setOrganizerFilter(e.target.value);

  const filteredEvents = events.filter((event) => {
    const titleMatch = event.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const dateMatch = event.eventDate
      .toLowerCase()
      .includes(dateFilter.toLowerCase());
    const organizerMatch = event.organizer
      .toLowerCase()
      .includes(organizerFilter.toLowerCase());

    return titleMatch && dateMatch && organizerMatch;
  });

  useEffect(() => {
    dispatch(fetchEvents(page))
      .unwrap()
      .then(() => {
        window.scrollTo(0, 0);
      });
  }, [dispatch, page]);

  return (
    <>
      <FilteredMenu
        titleFilter={titleFilter}
        dateFilter={dateFilter}
        organizerFilter={organizerFilter}
        handleTitleChange={handleTitleChange}
        handleDateChange={handleDateChange}
        handleOrganizerChange={handleOrganizerChange}
      />

      {filteredEvents.length > 0 && (
        <>
          <ul className={css.cards}>
            {filteredEvents.map(
              ({ imageUrl, title, eventDate, organizer, _id }) => (
                <li className={css.card} key={`${_id}${nanoid()}`}>
                  <div className={css.imgThumb}>
                    <img className={css.image} src={imageUrl} alt={title} />
                  </div>
                  <div className={css.infoCardWrap}>
                    <h2 className={css.title}>
                      {title.length > 15
                        ? `${title.substring(0, 15)}...`
                        : title}
                    </h2>
                    <p className={css.infoText}>
                      {organizer.length > 18
                        ? `${organizer.substring(0, 18)}...`
                        : organizer}
                    </p>
                    <p className={css.dateInfo}>{eventDate}</p>
                  </div>
                  <div className={css.linkInfoWrap}>
                    <NavLink className={css.linkInfo} to={`/register/${_id}`}>
                      Register
                    </NavLink>
                    <NavLink
                      className={css.linkInfo}
                      to={`/event-details/${_id}`}
                    >
                      View
                    </NavLink>
                  </div>
                </li>
              )
            )}
          </ul>
          <Pagination
            current={page}
            pageSize={LIMIT_NUMBER}
            total={totalEvents}
            onChange={(newPage) => dispatch(setPage(newPage))}
          />
        </>
      )}
    </>
  );
};

export default Home;
