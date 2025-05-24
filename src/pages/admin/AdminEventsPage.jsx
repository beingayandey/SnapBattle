import React, { useEffect, useState } from "react";
import EventTable from "../../components/admin/AdminEvents/EventTable";
import "./AdminEventsPage.css";
import { getEventList } from "../../api/api";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [filterStatus, setFilterStatus] = useState("All");
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchEvents = async (
    page = 1,
    status = filterStatus,
    limitPerPage = limit
  ) => {
    setIsLoading(true);
    try {
      const response = await getEventList({
        token,
        page,
        status: status === "All" ? undefined : status,
        limit: limitPerPage,
      });
      const mappedEvents = response.data.docs.map((event) => ({
        id: event._id,
        name: event.title,
        startDate: event.start_date,
        endDate: event.end_date,
        submissionCount: 0, // Placeholder as API doesn't provide this
        status:
          event.status.charAt(0).toUpperCase() +
          event.status.slice(1).toLowerCase(),
        visibility: event.visibility ? "Public" : "Private",
      }));
      setEvents(mappedEvents);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.page);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
    fetchEvents(1, status, limit);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
    fetchEvents(1, filterStatus, newLimit);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchEvents(page, filterStatus, limit);
  };

  const handleDeleteEvents = (eventIds) => {
    // Placeholder for API call to delete events
    // For now, filter out deleted events from state
    setEvents((prevEvents) =>
      prevEvents.filter((event) => !eventIds.includes(event.id))
    );
    // In a real implementation, you would make an API call here
    // await deleteEvents({ token, eventIds });
    // Then refetch or update state accordingly
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
    if (sortConfig.key === "visibility") {
      return safeCompare(a.visibility, b.visibility, "string");
    }
    return 0;
  });

  const filteredEvents =
    filterStatus === "All"
      ? sortedEvents
      : sortedEvents.filter((event) => event.status === filterStatus);

  return (
    <div className="admin-events-page">
      <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <EventTable
        events={filteredEvents}
        sortConfig={sortConfig}
        onSort={handleSort}
        filterStatus={filterStatus}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        limit={limit}
        onLimitChange={handleLimitChange}
        onDeleteEvents={handleDeleteEvents}
      />
    </div>
  );
};

export default AdminEventsPage;
