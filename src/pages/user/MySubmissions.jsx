import React, { useState, useEffect } from "react";
import EventSubmissionGroup from "../../components/user/MySubmission/EventSubmissionGroup";
import "./MySubmissions.css";

// Mock data with submissions (replace with API call)
const mockSubmissions = Array.from({ length: 10 }, (_, i) => ({
  eventId: i + 1,
  eventName: `Event ${i + 1}`,
  submissions: Array.from(
    { length: Math.floor(Math.random() * 5) + 1 },
    (_, j) => ({
      id: j + 1,
      images: [
        `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/300/200`,
      ],
      submissionDate: new Date(
        Date.now() + Math.floor(Math.random() * 10000000)
      ).toISOString(),
      status: ["pending", "approved", "rejected"][
        Math.floor(Math.random() * 3)
      ],
    })
  ),
}));

const MySubmissions = () => {
  const [submissionsByEvent, setSubmissionsByEvent] = useState([]);

  // Simulate fetching submissions and merging them by event
  useEffect(() => {
    const mergedSubmissions = mockSubmissions.map((event) => {
      // Combine all images into a single array
      const allImages = event.submissions.flatMap((sub) => sub.images);

      // Find the most recent submission to determine date and status
      const latestSubmission = event.submissions.reduce((latest, sub) => {
        return new Date(sub.submissionDate) > new Date(latest.submissionDate)
          ? sub
          : latest;
      }, event.submissions[0]);

      return {
        eventId: event.eventId,
        eventName: event.eventName,
        submission: {
          id: latestSubmission.id,
          images: allImages,
          submissionDate: latestSubmission.submissionDate,
          status: latestSubmission.status,
        },
      };
    });

    setSubmissionsByEvent(mergedSubmissions);
  }, []);

  // Handle delete submission
  const handleDelete = (eventId, submissionId) => {
    setSubmissionsByEvent(
      submissionsByEvent.filter((event) => event.eventId !== eventId)
    );
    // Add API call to delete all submissions for the event
  };

  return (
    <div className="my-submissions">
      <h1 className="my-submissions__title">My Submissions</h1>
      {submissionsByEvent.length === 0 ? (
        <p className="my-submissions__empty">No submissions found.</p>
      ) : (
        <div className="my-submissions__groups">
          {submissionsByEvent.map((event) => (
            <EventSubmissionGroup
              key={event.eventId}
              event={event}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
