import React, { useState } from "react";
import EventTable from "../../components/admin/AdminEvents/EventTable";
import "./AdminEventsPage.css";

// Static demo data
const demoEvents = [
  {
    id: 1,
    name: "Summer Photo Contest",
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-06-30T23:59:59Z",
    submissionCount: 42,
    status: "Active",
  },
  {
    id: 2,
    name: "Winter Snapshots",
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-01-31T23:59:59Z",
    submissionCount: 19,
    status: "Ended",
  },
  {
    id: 3,
    name: "Spring Moments",
    startDate: "2025-03-01T00:00:00Z",
    endDate: "2025-03-31T23:59:59Z",
    submissionCount: 25,
    status: "Voting",
  },
  {
    id: 4,
    name: "Autumn Colors",
    startDate: "2025-09-01T00:00:00Z",
    endDate: "2025-09-30T23:59:59Z",
    submissionCount: 30,
    status: "Active",
  },
];

const AdminEventsPage = () => {
  const [events] = useState(demoEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterStatus, setFilterStatus] = useState("All");
  const eventsPerPage = 10;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const sortedEvents = [...events].sort((a, b) => {
    const safeCompare = (valA, valB, type) => {
      if (valA == null && valB == null) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (type === "string") {
        return sortConfig.direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
      if (type === "date") {
        return sortConfig.direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }
      if (type === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    };

    if (sortConfig.key === "name") {
      return safeCompare(a.name, b.name, "string");
    }
    if (sortConfig.key === "startDate") {
      return safeCompare(a.startDate, b.startDate, "date");
    }
    if (sortConfig.key === "endDate") {
      return safeCompare(a.endDate, b.endDate, "date");
    }
    if (sortConfig.key === "submissionCount") {
      return safeCompare(a.submissionCount, b.submissionCount, "number");
    }
    return 0;
  });

  const filteredEvents =
    filterStatus === "All"
      ? sortedEvents
      : sortedEvents.filter((event) => event.status === filterStatus);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="admin-events-page">
      <h1>Events</h1>
      <EventTable
        events={paginatedEvents}
        sortConfig={sortConfig}
        onSort={handleSort}
        filterStatus={filterStatus}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminEventsPage;
