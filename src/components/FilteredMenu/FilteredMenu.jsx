import { useState } from "react";
import css from "./FilteredMenu.module.css"; 

const FilteredMenu = ({
  titleFilter,
  dateFilter,
  organizerFilter,
  handleTitleChange,
  handleDateChange,
  handleOrganizerChange,
}) => {
  return (
    <ul className={css.filteredList}>
      <li className={css.filteredItem}>
        <p className={css.text}>Title</p>
        <input
          value={titleFilter}
          onChange={handleTitleChange} 
          className={css.input} 
          placeholder="Filter by title"
        />
      </li>

      <li className={css.filteredItem}>
        <p className={css.text}>Event Date</p>
        <input
          value={dateFilter}
          onChange={handleDateChange} 
          className={css.input}
          placeholder="Filter by event date"
        />
      </li>

     
      <li className={css.filteredItem}>
        <p className={css.text}>Organizer</p>
        <input
          value={organizerFilter}
          onChange={handleOrganizerChange} 
          className={css.input}
          placeholder="Filter by organizer"
        />
      </li>
    </ul>
  );
};

export default FilteredMenu;
