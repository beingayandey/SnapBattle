// src/pages/AdminEventsPage.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventTable from "../../components/admin/AdminEvents/EventTable";
import "./AdminEventsPage.css";
import {
  fetchEvents,
  setSortConfig,
  setFilterStatus,
  setLimit,
  setCurrentPage,
  deleteEvents,
} from "../../redux/slices/eventsSlice";

const AdminEventsPage = () => {
  const dispatch = useDispatch();
  const {
    events,
    currentPage,
    totalPages,
    filterStatus,
    limit,
    sortConfig,
    isLoading,
  } = useSelector((state) => state.events);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    dispatch(
      fetchEvents({ token, page: currentPage, status: filterStatus, limit })
    );
  }, [dispatch, token, currentPage, limit]); // Removed filterStatus from dependencies

  const handleSort = (key) => {
    dispatch(
      setSortConfig({
        key,
        direction:
          sortConfig.key === key && sortConfig.direction === "asc"
            ? "desc"
            : "asc",
      })
    );
  };

  const handleFilter = (status) => {
    dispatch(setFilterStatus(status));
    dispatch(setCurrentPage(1)); // Reset to page 1 on filter change
  };

  const handleLimitChange = (newLimit) => {
    dispatch(setLimit(newLimit));
    dispatch(
      fetchEvents({ token, page: 1, status: filterStatus, limit: newLimit })
    );
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchEvents({ token, page, status: filterStatus, limit }));
  };

  const handleDeleteEvents = (eventIds) => {
    dispatch(deleteEvents(eventIds));
    // Optionally, refetch events after deletion if needed
    // dispatch(fetchEvents({ token, page: currentPage, status: filterStatus, limit }));
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
