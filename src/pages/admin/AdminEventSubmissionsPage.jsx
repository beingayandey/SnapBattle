import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import SubmissionCard from "../../components/admin/Submissions/SubmissionCard";
import SubmissionFilterPanel from "../../components/admin/Submissions/SubmissionFilterPanel";
import SearchInput from "../../components/admin/Submissions/SearchInput";
import PaginationControls from "../../components/admin/Submissions/PaginationControls";
import "./AdminEventSubmissionsPage.css";
import Fancybox from "../../components/common/Fancybox";

const ITEMS_PER_PAGE = 12;

// Mock data for demo, using eventId: '4' to match the URL
const mockSubmissions = [
  {
    id: 1,
    user: {
      name: "Alice Smith",
      email: "alice@example.com",
      avatar: "https://picsum.photos/40",
    },
    image: "https://picsum.photos/300/200?random=1",
    submittedAt: "2025-05-18T10:00:00Z",
    likes: 25,
    eventId: "4",
  },
  {
    id: 2,
    user: {
      name: "Bob Johnson",
      email: "bob@example.com",
      avatar: "https://picsum.photos/40",
    },
    image: "https://picsum.photos/300/200?random=2",
    submittedAt: "2025-05-19T14:30:00Z",
    likes: 15,
    eventId: "4",
  },
  {
    id: 3,
    user: {
      name: "Cathy Lee",
      email: "cathy@example.com",
      avatar: "https://picsum.photos/40",
    },
    image: "https://picsum.photos/300/200?random=3",
    submittedAt: "2025-05-20T09:15:00Z",
    likes: 30,
    eventId: "4",
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 4,
    user: {
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      avatar: "https://picsum.photos/40",
    },
    image: `https://picsum.photos/300/200?random=${i + 4}`,
    submittedAt: `2025-05-${i % 2 === 0 ? 20 : 19}T${(10 + (i % 12))
      .toString()
      .padStart(2, "0")}:00:00Z`,
    likes: Math.floor(Math.random() * 50),
    eventId: "4",
  })),
];

function AdminEventSubmissionsPage() {
  const { eventId } = useParams();
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    user: "",
    dateRange: { start: "", end: "" },
    likes: { min: "", max: "", mostLiked: false },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log("Event ID from URL:", eventId);
    console.log("Initial submissions:", mockSubmissions);

    let result = mockSubmissions.filter((s) => s.eventId === eventId);
    console.log("After eventId filter:", result);

    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("After searchTerm filter:", result);
    }

    if (filters.user) {
      result = result.filter((s) => s.user.name === filters.user);
      console.log("After user filter:", result);
    }

    if (filters.dateRange.start) {
      result = result.filter((s) =>
        dayjs(s.submittedAt).isAfter(dayjs(filters.dateRange.start))
      );
      console.log("After dateRange.start filter:", result);
    }
    if (filters.dateRange.end) {
      result = result.filter((s) =>
        dayjs(s.submittedAt).isBefore(dayjs(filters.dateRange.end))
      );
      console.log("After dateRange.end filter:", result);
    }

    if (filters.likes.min) {
      result = result.filter((s) => s.likes >= parseInt(filters.likes.min));
      console.log("After likes.min filter:", result);
    }
    if (filters.likes.max) {
      result = result.filter((s) => s.likes <= parseInt(filters.likes.max));
      console.log("After likes.max filter:", result);
    }
    if (filters.likes.mostLiked) {
      result = result.sort((a, b) => b.likes - a.likes);
      console.log("After mostLiked sort:", result);
    }

    setFilteredSubmissions(result);
    setCurrentPage(1);
    setIsLoading(false);
    console.log("Final filtered submissions:", result);
  }, [eventId, searchTerm, filters]);

  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // Reset filters
  const resetFilters = () => {
    setFilters({
      user: "",
      dateRange: { start: "", end: "" },
      likes: { min: "", max: "", mostLiked: false },
    });
    setSearchTerm("");
  };
  return (
    <div className="admin-event-submissions">
      <h1>Event Submissions</h1>
      <div className="controls">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          aria-label="Search submissions by user name or email"
          placeholder="Search by name or email"
        />
        <SubmissionFilterPanel
          filters={filters}
          setFilters={setFilters}
          submissions={mockSubmissions}
        />
        <button onClick={resetFilters} aria-label="Reset all filters">
          Reset Filters
        </button>
      </div>
      <Fancybox
        options={{
          Toolbar: {
            display: {
              left: ["zoomIn", "zoomOut"],
              right: ["close"],
            },
          },
        }}
      >
        {isLoading ? (
          <p className="no-submissions">Loading submissions...</p>
        ) : paginatedSubmissions.length === 0 ? (
          <p className="no-submissions">No submissions found.</p>
        ) : (
          <div className="submissions-grid">
            {paginatedSubmissions.map((submission) => (
              <a
                key={submission.id}
                data-fancybox="gallery"
                href={submission.image}
                data-caption={`${submission.user.name} - ${dayjs(
                  submission.submittedAt
                ).format("MMM D, YYYY")}`}
              >
                <SubmissionCard submission={submission} />
              </a>
            ))}
          </div>
        )}
      </Fancybox>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default AdminEventSubmissionsPage;
