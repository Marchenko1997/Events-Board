import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserEvents } from "../../redux/auth/selectors";
import { fetchUserEventsByEmail } from "../../redux/auth/operations";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import css from "./User.module.css"; 
import { useNavigate } from "react-router";

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userEventsData = useSelector(selectUserEvents);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserEventsByEmail(user.email));
  }, [dispatch, user.email]);

  return (
    <>
      <button className={css.returnBackBtn} onClick={() => navigate(-1)}>
        Return back
      </button>
      {userEventsData && userEventsData.length > 0 ? (
        <ul className={css.cards}>
          {userEventsData.map((el) => (
            <li className={css.card} key={nanoid()}>
              <div className={css.imgThumb}>
                <img
                  className={css.image}
                  src={el.user.eventImg}
                  alt={el.user.eventTitle}
                />
              </div>
              <div className={css.infoCardWrap}>
                <h2 className={css.title}>
                  {el.user.eventTitle.length > 15
                    ? `${el.user.eventTitle.substring(0, 15)}...`
                    : el.user.eventTitle}
                </h2>
                <NavLink
                  className={css.linkInfo}
                  to={`/event-details/${el.eventId}`}
                >
                  View
                </NavLink>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.emptyEventsText}>
          You haven&apos;t registered for any events yet!
        </p>
      )}
    </>
  );
};

export default User;
