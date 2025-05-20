import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";
import EventActions from "./EventActions";
import "./EventRow.css";

const EventRow = ({ event }) => {
  const navigate = useNavigate();

  return (
    <tr className="event-row">
      <td>{event.name}</td>
      <td>{format(new Date(event.startDate), "MMM dd, yyyy")}</td>
      <td>{format(new Date(event.endDate), "MMM dd, yyyy")}</td>
      <td>{event.submissionCount}</td>
      <td>
        <StatusBadge status={event.status} />
      </td>
      <td>
        <EventActions
          eventId={event.id}
          status={event.status}
          onView={() => navigate(`/admin/events/${event.id}/submissions`)}
          onEdit={() => navigate(`/admin/events/${event.id}/edit`)}
        />
      </td>
    </tr>
  );
};

export default EventRow;
