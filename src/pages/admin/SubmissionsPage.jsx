import React, { useState } from "react";
import "./SubmissionsPage.css";
import SubmissionTable from "../../components/admin/Submission/SubmissionTable";
import SubmissionFilterBar from "../../components/admin/Submission/SubmissionFilterBar";
import SubmissionDetailsModal from "../../components/admin/Submission/SubmissionDetailsModal";

const AdminSubmissionsPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    event: "",
    dateRange: { start: "", end: "" },
    status: "",
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 10;

  // Mock data for now (replace with API later)
  const mockSubmissions = [
    {
      id: 1,
      thumbnail: "https://picsum.photos/1080?random=1",
      eventName: "Summer Snap 2025",
      user: "john.doe@example.com",
      date: "2025-05-15",
      status: "pending",
    },
    {
      id: 2,
      thumbnail: "https://picsum.photos/1080?random=2",
      eventName: "Winter Lights",
      user: "jane.smith@example.com",
      date: "2025-05-10",
      status: "approved",
    },
    // Add more mock data as needed
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseModal = () => {
    setSelectedSubmission(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Mock filtering and pagination logic (replace with API calls)
  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const matchesSearch =
      submission.user.toLowerCase().includes(filters.search.toLowerCase()) ||
      submission.eventName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesEvent = filters.event
      ? submission.eventName === filters.event
      : true;
    const matchesStatus = filters.status
      ? submission.status === filters.status
      : true;
    // Add date range filtering logic here when needed
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * submissionsPerPage,
    currentPage * submissionsPerPage
  );

  return (
    <div className="admin-submissions-page">
      <h1>Photo Contest Submissions</h1>
      <SubmissionFilterBar onFilterChange={handleFilterChange} />
      <SubmissionTable
        submissions={paginatedSubmissions}
        onView={handleViewSubmission}
        currentPage={currentPage}
        totalItems={filteredSubmissions.length}
        itemsPerPage={submissionsPerPage}
        onPageChange={handlePageChange}
      />
      {selectedSubmission && (
        <SubmissionDetailsModal
          submission={selectedSubmission}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminSubmissionsPage;
