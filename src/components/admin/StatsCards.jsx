import React from "react";
import clsx from "clsx";
import { FaUsers, FaCalendar, FaImage, FaClock } from "react-icons/fa";
import { getStats } from "../../api/listener";

const StatsCards = ({ theme = "light" }) => {

  const [stat, setStat] = React.useState(null);

  React.useEffect(() => {
    const socket = getStats(setStat);
    return () => socket.disconnect();
  }, []);

  const stats = [
    {
      title: "Total Users",
      number: stat?.total_users || 0,
      badge: "+5%",
      icon: <FaUsers />
    },
    {
      title: "Total Events",
      number: stat?.total_events || 0,
      badge: "+2",
      icon: <FaCalendar />
    },
    {
      title: "Total Submissions",
      number: stat?.total_submissions || 0,
      badge: "+10%",
      icon: <FaImage />,
    },
    {
      title: "Ongoing Events",
      number: stat?.ongoing_events || 0,
      badge: "2 new",
      icon: <FaClock />
    },
  ];

  return (
    <div className={clsx("stats-cards-container", theme === "dark" && "dark")}>
      {stats.map((stat, index) => (
        <div key={index} className="stats-card">
          <div className="stats-card-content">
            <div className="stats-card-icon">{stat.icon}</div>
            <div>
              <p className="stats-card-title">{stat.title}</p>
              <p className="stats-card-number">{stat.number}</p>
              <span className="stats-card-badge">{stat.badge}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
