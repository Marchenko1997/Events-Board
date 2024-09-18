import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import {  NavLink } from "react-router-dom";
import Pagination from "rc-pagination/lib/Pagination";
import { fetchEvents } from "../../redux/events/operations";
import {
  selectEvents,
  selectPage,
  selectTotalEvents,
} from "../../redux/events/selectors";
import { setPage } from "../../redux/events/eventsSlice";
import css from "./Home.module.css"; // Подключаем файл стилей module.css
import { LIMIT_NUMBER } from "../../services/config";

const Home = () => {
  const dispatch = useDispatch(); // Подключаем dispatch для вызова операций Redux
  const events = useSelector(selectEvents); // Получаем список событий из Redux Store
  const page = useSelector(selectPage); // Получаем текущую страницу из Redux Store
  const totalEvents = useSelector(selectTotalEvents); // Получаем общее количество событий

  useEffect(() => {
    // При изменении страницы или монтировании компонента загружаем события
    dispatch(fetchEvents(page))
      .unwrap()
      .then(() => {
        window.scrollTo(0, 0); // Скроллим вверх при загрузке
      });
  }, [dispatch, page]);

  return (
    <>
      {events.length > 0 && (
        <>
          <ul className={css.cards}>
            {events.map(({ imageUrl, title, eventDate, organizer, _id }) => (
              <li className={css.card} key={`${_id}${nanoid()}`}>
                <div className={css.imgThumb}>
                  <img className={css.image} src={imageUrl} alt={title} />
                </div>
                <div className={css.infoCardWrap}>
                  <h2 className={css.title}>
                    {title.length > 15 ? `${title.substring(0, 15)}...` : title}
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
            ))}
          </ul>
          <Pagination
            current={page}
            pageSize={LIMIT_NUMBER}
            total={totalEvents}
            onChange={(newPage) => dispatch(setPage(newPage))} // Меняем страницу
          />
        </>
      )}
    </>
  );
};

export default Home;
