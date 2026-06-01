import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Star, Share2, Bookmark, CheckCircle, Shield, Award } from "lucide-react";
import { events } from "../data/events";

const trustConfig = {
  top: {
    label: "Top Organiser",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    desc: "Consistently delivers highly-rated events with verified identity.",
  },
  verified: {
    label: "Verified Organiser",
    icon: CheckCircle,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    desc: "Identity verified by VibeLocal. Good track record.",
  },
  unverified: {
    label: "Unverified",
    icon: Shield,
    color: "text-gray-500",
    bg: "bg-gray-50 border-gray-200",
    desc: "This organiser hasn't been verified yet. Attend with awareness.",
  },
};

const tagEmoji = {
  Hype: "🔥",
  Chill: "😌",
  Professional: "💼",
  Mixed: "🔀",
  "Live Music": "🎶",
  Dancing: "💃",
  Inclusive: "🤝",
  Foodie: "🍽️",
  "Family Friendly": "👨‍👩‍👧",
  "Dog Friendly": "🐶",
  Networking: "🤝",
  Wellness: "🧘",
  Outdoor: "🌿",
  "Craft Beer": "🍺",
};

function ScoreBar({ label, score }) {
  const pct = (score / 5) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{score.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CrowdMeter({ going, saved, capacity }) {
  const pct = Math.min((going / capacity) * 100, 100);
  let label = "Plenty of room";
  let color = "bg-green-400";
  if (pct > 80) { label = "Almost full!"; color = "bg-red-500"; }
  else if (pct > 55) { label = "Filling up"; color = "bg-orange-400"; }

  return (
    <div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          <span className="font-semibold text-gray-800">{going}</span> confirmed · <span className="font-semibold text-gray-800">{saved}</span> saved
        </span>
        <span className={`font-medium text-xs ${pct > 80 ? "text-red-500" : pct > 55 ? "text-orange-500" : "text-green-600"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Event not found.
      </div>
    );
  }

  const { vibeCheck, organiser } = event;
  const trust = trustConfig[organiser.trustStatus];
  const TrustIcon = trust.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-800" />
        </button>

        {/* Share */}
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white transition-colors">
          <Share2 size={18} className="text-gray-800" />
        </button>

        {/* Price badge */}
        <span className="absolute bottom-4 right-4 bg-white text-gray-800 text-sm font-bold px-3 py-1 rounded-full shadow">
          {event.price}
        </span>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Title block */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 -mt-6 relative mb-4">
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">{event.category}</span>
          <h1 className="text-xl font-bold text-gray-900 mt-1 mb-3 leading-snug">{event.title}</h1>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-purple-500 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-purple-500 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* ===== VIBE CHECK SECTION ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  ✨ Vibe Check
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Based on {vibeCheck.ratingsCount} past attendee ratings</p>
              </div>
              {/* Overall score */}
              <div className="text-center bg-purple-600 text-white rounded-xl px-4 py-2">
                <div className="text-2xl font-black leading-none">{vibeCheck.overallScore}</div>
                <div className="text-xs opacity-80 mt-0.5">/ 5.0</div>
              </div>
            </div>
          </div>

          <div className="px-5 py-4 space-y-5">
            {/* Score breakdown */}
            <div className="space-y-3">
              <ScoreBar label="Energy" score={vibeCheck.scores.energy} />
              <ScoreBar label="Safety" score={vibeCheck.scores.safety} />
              <ScoreBar label="Crowd Vibe" score={vibeCheck.scores.crowdVibe} />
            </div>

            {/* Vibe Tags */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Vibe Tags</p>
              <div className="flex flex-wrap gap-2">
                {vibeCheck.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 text-sm font-medium bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-full"
                  >
                    <span>{tagEmoji[tag] || "✦"}</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Crowd indicator */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <span className="inline-flex items-center gap-1">
                  <Users size={12} /> Crowd Indicator
                </span>
              </p>
              <CrowdMeter
                going={vibeCheck.crowdGoing}
                saved={vibeCheck.crowdSaved}
                capacity={vibeCheck.totalCapacity}
              />
            </div>
          </div>
        </div>

        {/* Organiser trust */}
        <div className={`rounded-2xl border p-4 mb-4 flex items-start gap-3 ${trust.bg}`}>
          <img
            src={organiser.avatar}
            alt={organiser.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm">{organiser.name}</span>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white border ${trust.color} ${trust.bg}`}>
                <TrustIcon size={11} />
                {trust.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{organiser.eventsHosted} events hosted</p>
            <p className="text-xs text-gray-600 mt-1">{trust.desc}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">About this event</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pb-8">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Users size={16} />
            I'm Going
          </button>
          <button className="bg-white border border-gray-200 hover:border-purple-300 text-gray-700 font-semibold py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Bookmark size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
