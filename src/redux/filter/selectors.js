export const getFilteredEvents = (events, filters) => {
  return events.filter((event) => {
    const titleMatch = event.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const dateMatch = event.eventDate
      .toLowerCase()
      .includes(filters.eventDate.toLowerCase());
    const organizerMatch = event.organizer
      .toLowerCase()
      .includes(filters.organizer.toLowerCase());

    return titleMatch && dateMatch && organizerMatch;
  });
};

export const selectFilters = (state) => state.filters;
