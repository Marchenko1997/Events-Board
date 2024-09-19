import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchEventById } from "../../redux/events/operations";
import { selectEventDetails } from "../../redux/events/selectors";
import css from "./Event.module.css"; // Подключение CSS модулей
import { ReturnBackBtn } from "../Register/Register.styled";

const Event = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const eventDetails = useSelector(selectEventDetails);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  return (
    <div>
      <ReturnBackBtn onClick={() => navigate(-1)}>Return back</ReturnBackBtn>
      {Object.keys(eventDetails).length > 0 && (
        <div className={css.eventWrap}>
          {" "}
          {/* Использование стилей из модуля */}
          <div className={css.imageWrap}>
            <img
              className={css.eventImg}
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
            />
          </div>
          <div>
            <div className={css.eventInfoWrap}>
              <h2 className={css.eventHeader}>{eventDetails.title}</h2>
              <p className={css.eventText}>{eventDetails.organizer}</p>
              <p className={css.eventDate}>{eventDetails.eventDate}</p>
            </div>
            <div className={css.eventLinkWrap}>
              <a className={css.eventLink} href={`/${id}/participants`}>
                Participants
              </a>
              <a className={css.eventLink} href={`/register/${id}`}>
                Register
              </a>
            </div>
            <h3 className={css.eventTitle}>Description</h3>
            <p className={css.eventText}>{eventDetails.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
