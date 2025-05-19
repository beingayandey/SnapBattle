import React, { useState } from "react";
import EventDetails from "../../components/admin/EventMangePage/EventDetails";
import SubmissionsGrid from "../../components/admin/EventMangePage/SubmissionsGrid";
import EndTimeSection from "../../components/admin/EventMangePage/EndTimeSection";
import EventStats from "../../components/admin/EventMangePage/EventStats";
import VotingToggle from "../../components/admin/EventMangePage/VotingToggle";
import ChooseWinnersModal from "../../components/admin/EventMangePage/ChooseWinnersModal";
import EndEventModal from "../../components/admin/EventMangePage/EndEventModal";
import "./EventManagePage.css";

const EventManagePage = () => {
  const [isChooseWinnersOpen, setIsChooseWinnersOpen] = useState(false);
  const [isEndEventOpen, setIsEndEventOpen] = useState(false);
  const [votingEnabled, setVotingEnabled] = useState(false);

  // Mock submissions data (in a real app, this would come from an API)
  const submissions = Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    url: `https://picsum.photos/150?random=${index + 1}`,
    user: `User${index + 1}`,
  }));

  return (
    <div className="event-manage">
      <main className="event-manage__main">
        <EventDetails />
        <SubmissionsGrid
          openChooseWinners={() => setIsChooseWinnersOpen(true)}
          submissions={submissions} // Pass submissions to SubmissionsGrid
        />
        <ChooseWinnersModal
          isOpen={isChooseWinnersOpen}
          onClose={() => setIsChooseWinnersOpen(false)}
          submissions={submissions} // Pass submissions to ChooseWinnersModal
        />
        <EndTimeSection />
        <EventStats />
        <VotingToggle
          votingEnabled={votingEnabled}
          setVotingEnabled={setVotingEnabled}
        />
        <div className="card">
          <button className="button" onClick={() => setIsEndEventOpen(true)}>
            End Event
          </button>
        </div>
      </main>
      <EndEventModal
        isOpen={isEndEventOpen}
        onClose={() => setIsEndEventOpen(false)}
      />
    </div>
  );
};

export default EventManagePage;
