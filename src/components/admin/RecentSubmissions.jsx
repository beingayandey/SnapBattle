import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "./RecentSubmissions.css";
import SubmissionDetailsModal from "./SubmissionDetailsModal"; // Import the modal

const SkeletonCard = () => (
  <div className="submission-card skeleton-card">
    <div className="submission-image skeleton-image" />
    <div className="submission-info">
      <p className="submission-user skeleton-text" />
      <p className="submission-date skeleton-text" />
    </div>
  </div>
);

const RecentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null); // State for selected submission
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    // Simulate fetching recent submissions
    setTimeout(() => {
      const mockSubmissions = Array.from({ length: 9 }, (_, index) => ({
        id: index + 1,
        image: `https://picsum.photos/1920/1080?random=${index + 1}`, // Changed to 'image' to match modal
        user: `User ${index + 1}`,
        email: `user${index + 1}@example.com`, // Added for modal
        date: new Date(Date.now() - index * 86400000).toISOString(), // Use ISO format for consistency
        eventName: `Event ${index + 1}`, // Added for modal
        caption: `Caption for submission ${index + 1}`, // Added for modal
        status: "Pending", // Added for modal
      }));
      setSubmissions(mockSubmissions);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle card click to open modal
  const handleCardClick = (submission) => {
    setSelectedSubmission(submission);
  };

  // Handle modal close
  const handleModalClose = () => {
    setSelectedSubmission(null);
  };

  // Breakpoints configuration
  const breakpoints = {
    360: { slidesPerView: 2, spaceBetween: 8 },
    720: { slidesPerView: 4, spaceBetween: 12 },
    1200: { slidesPerView: 6, spaceBetween: 16 },
    1560: { slidesPerView: 8, spaceBetween: 16 },
  };

  // Determine if navigation should be shown
  const showNavigation = submissions.length > 8;

  return (
    <div className="recent-submissions">
      <h2>Recent Submissions</h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={8}
        navigation={
          showNavigation
            ? {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }
            : false
        }
        breakpoints={breakpoints}
        className="submissions-swiper"
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          : submissions.map((submission) => (
              <SwiperSlide key={submission.id}>
                <div
                  className="submission-card"
                  onClick={() => handleCardClick(submission)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={submission.image}
                    alt={`Submission by ${submission.user}`}
                    className="submission-image"
                  />
                  <div className="submission-info">
                    <p className="submission-user">{submission.user}</p>
                    <p className="submission-date">
                      {formatDate(submission.date)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        {showNavigation && (
          <>
            <div className="swiper-button-prev">
              <MdArrowBackIosNew />
            </div>
            <div className="swiper-button-next">
              <MdArrowForwardIos />
            </div>
          </>
        )}
      </Swiper>

      {/* Render the modal when a submission is selected */}
      {selectedSubmission && (
        <SubmissionDetailsModal
          submission={selectedSubmission}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default RecentSubmissions;
