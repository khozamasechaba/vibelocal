import { useState } from "react";
import { MapPin, Users, Star, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categoryColors = {
  Music: "bg-purple-100 text-purple-700",
  Food: "bg-orange-100 text-orange-700",
  Networking: "bg-blue-100 text-blue-700",
  Sport: "bg-green-100 text-green-700",
};

const trustBadge = {
  top: { label: "Verified Organiser", dot: "bg-amber-500", color: "text-amber-600 bg-amber-50 border-amber-200" },
  verified: { label: "Verified Organiser", dot: "bg-blue-500", color: "text-blue-600 bg-blue-50 border-blue-200" },
  unverified: { label: "Organiser Not Verified", dot: "bg-gray-400", color: "text-gray-500 bg-gray-50 border-gray-200" },
};

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const { vibeCheck, organiser } = event;
  const trust = trustBadge[organiser.trustStatus];
  const topTags = vibeCheck.tags.slice(0, 2);

  function handleSave(e) {
    e.stopPropagation();
    setSaved((s) => !s);
  }

  return (
    <div
      onClick={() => navigate(`/event/${event.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category]}`}>
          {event.category}
        </span>
        {/* Save button */}
        <button
          onClick={handleSave}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-150 ${
            saved ? "bg-purple-600 text-white" : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white"
          }`}
          aria-label={saved ? "Unsave event" : "Save event"}
        >
          <Bookmark size={14} fill={saved ? "white" : "none"} />
        </button>
        <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full">
          {event.price}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-1">{event.date}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Vibe Check teaser */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              <Star size={11} fill="white" />
              {vibeCheck.overallScore}
            </div>
            {topTags.map((tag) => (
              <span key={tag} className="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0 ml-2">
            <Users size={13} />
            <span>{vibeCheck.crowdGoing} going</span>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-2">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded border font-medium ${trust.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${trust.dot}`} />
            {trust.label}
          </span>
        </div>
      </div>
    </div>
  );
}
