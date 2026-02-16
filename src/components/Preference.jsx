import { useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Preference({ userId, onComplete, forceOpen = false }) {
  const navigate = useNavigate();
  const STORAGE_KEY = "onboardingCompleted";

  const pages = useMemo(
    () => [
      {
        id: "interests",
        title: "What are you interested in?",
        description: "Pick as many as you like.",
        type: "multi",
        required: true,
        options: [
          "Comedy",
          "Startups",
          "Politics",
          "Science",
          "Relationships",
          "Cricket",
          "Football",
          "Gaming",
          "Music",
          "Movies/TV",
          "Fitness",
          "AI/ML",
          "Design",
          "Travel",
          "Books",
        ],
      },
      {
        id: "meetFrequency",
        title: "How often do you want to meet?",
        description: "Choose one.",
        type: "single",
        required: true,
        options: [
          "Once a week",
          "Twice a week",
          "Thrice a week",
          "Daily",
          "Weekends only",
        ],
      },
      {
        id: "availability",
        title: "When are you usually free?",
        description: "Pick all that apply.",
        type: "multi",
        required: true,
        options: [
          "Weekdays",
          "Weekends",
          "Mornings",
          "Afternoons",
          "Evenings",
          "Late night",
        ],
      },
      //   {
      //     id: "format",
      //     title: "Preferred hangout format?",
      //     description: "We’ll prioritize matches that fit your style.",
      //     type: "multi",
      //     required: false,
      //     options: ["VR worlds", "Voice chat", "Video calls", "Text chat", "IRL meetups"],
      //   },
      {
        id: "purposeVibe",
        title: "What are you here for?",
        description:
          "Select all that describe your goals and vibe on the platform.",
        type: "multi",
        required: false,
        options: [
          "Friendship",
          "Relationship",
          "Discussion",
          "Improve Communication",
          "Debate",
          "Casual",
          "Productive",
          "Learning",
          "Gaming",
          "Networking",
          "Brainstorming",
        ],
      },

      {
        id: "groupSize",
        title: "Ideal group size?",
        description: "Choose one.",
        type: "single",
        required: true,
        options: ["1 : 1", "Small (3–5)", "Medium (6–12)", "Large (13+)"],
      },
      {
        id: "privacy",
        title: "Privacy & discovery",
        description: "Who can find and request to meet you?",
        type: "single",
        required: true,
        options: ["Private (invite only)", "Friends of friends", "Open to all"],
      },
    ],
    []
  );

  useEffect(() => {
    // Wait for userId to exist before deciding to open
    if (!userId) return;

    const done = localStorage.getItem(STORAGE_KEY) === "true";
    if (!done || forceOpen) setIsOpen(true);
  }, [forceOpen, userId]); // <-- include userId

  const [isOpen, setIsOpen] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY) === "true";
    if (!done || forceOpen) setIsOpen(true);
  }, [forceOpen]);

  const toggleMulti = (id, value) => {
    setAnswers((prev) => {
      const curr = Array.isArray(prev[id]) ? prev[id] : [];
      const exists = curr.includes(value);
      const next = exists ? curr.filter((v) => v !== value) : [...curr, value];
      return { ...prev, [id]: next };
    });
  };

  const chooseSingle = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const currentPage = pages[pageIdx];
  const currentValue = answers[currentPage?.id];
  const isCurrentValid = useMemo(() => {
    if (!currentPage) return false;
    if (!currentPage.required) return true;
    if (currentPage.type === "multi")
      return Array.isArray(currentValue) && currentValue.length > 0;
    return typeof currentValue === "string" && currentValue.length > 0;
  }, [currentPage, currentValue]);

  const isLast = pageIdx === pages.length - 1;

  const goNext = () => {
    if (!isCurrentValid) return;
    if (!isLast) setPageIdx((i) => i + 1);
  };
  const goBack = () => setPageIdx((i) => Math.max(0, i - 1));

  const handleSubmit = async () => {
    // validate required pages
    for (const p of pages) {
      if (!p.required) continue;
      const v = answers[p.id];
      if (p.type === "multi" && (!Array.isArray(v) || v.length === 0)) return;
      if (p.type === "single" && (typeof v !== "string" || v.length === 0))
        return;
    }

    const payload = {
      userId, // must be a valid Mongo ObjectId
      ...answers,
      completedAt: new Date().toISOString(),
    };

    try {
      // ✅ call the upsert route (NOT /check)
      const res = await api.put("/api/preference", payload);

      // optional: store flag so the wizard doesn't reopen
      // localStorage.setItem("onboardingCompleted", "true");

      // close + navigate
      setIsOpen(false);
      onComplete?.(res.data || payload);
      navigate("/dashboard");
    } catch (e) {
      console.error(
        "Failed to submit preference:",
        e.response?.data || e.message
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-indigo-400">
              Quick Preferences
            </h2>
            <span className="text-sm text-gray-500">
              {pageIdx + 1} / {pages.length}
            </span>
          </div>
          {/* <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              Skip
            </button> */}
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-800">
          <div
            className="h-1 bg-indigo-500 transition-all"
            style={{ width: `${((pageIdx + 1) / pages.length) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold text-white">
            {currentPage.title}
          </h3>
          {currentPage.description && (
            <p className="mt-1 text-sm text-gray-400">
              {currentPage.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {currentPage.options.map((opt) => {
              const id = currentPage.id;
              const isSelected =
                currentPage.type === "multi"
                  ? Array.isArray(answers[id]) && answers[id].includes(opt)
                  : answers[id] === opt;

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    currentPage.type === "multi"
                      ? toggleMulti(id, opt)
                      : chooseSingle(id, opt)
                  }
                  className={`rounded-2xl border px-4 py-2 text-sm transition 
                      ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-600/30 text-indigo-300 shadow"
                          : "border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
                      }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {currentPage.required && !isCurrentValid && (
            <p className="mt-4 text-sm text-rose-500">
              Please make a selection to continue.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-gray-800 px-6 py-4">
          <button
            onClick={goBack}
            disabled={pageIdx === 0}
            className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {!isLast ? (
            <button
              onClick={goNext}
              disabled={!isCurrentValid}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentValid}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 disabled:opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
