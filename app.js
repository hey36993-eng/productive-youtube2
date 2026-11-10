
const topics = [
  {
    id: 1,
    title: "Artificial Intelligence",
    category: "Technology",
    icon: "🤖",
    description: "Understand AI, machine learning and how intelligent tools work."
  },
  {
    id: 2,
    title: "Learn Programming",
    category: "Technology",
    icon: "💻",
    description: "Start coding and build useful websites and applications."
  },
  {
    id: 3,
    title: "Internet Explained",
    category: "Technology",
    icon: "🌐",
    description: "Discover how the internet, websites and networks work."
  },
  {
    id: 4,
    title: "Space and Astronomy",
    category: "Science",
    icon: "🚀",
    description: "Explore planets, galaxies, black holes and the universe."
  },
  {
    id: 5,
    title: "Science of the Human Brain",
    category: "Science",
    icon: "🧠",
    description: "Learn how memory, thinking and the brain work."
  },
  {
    id: 6,
    title: "Personal Finance",
    category: "Finance",
    icon: "💰",
    description: "Understand budgeting, saving and managing money."
  },
  {
    id: 7,
    title: "Investing for Beginners",
    category: "Finance",
    icon: "📈",
    description: "Learn the basics of investing, risk and long-term growth."
  },
  {
    id: 8,
    title: "Learn Faster",
    category: "Education",
    icon: "📚",
    description: "Discover effective learning and study techniques."
  },
  {
    id: 9,
    title: "Critical Thinking",
    category: "Education",
    icon: "🔍",
    description: "Improve reasoning, problem-solving and decision-making."
  },
  {
    id: 10,
    title: "Career Skills",
    category: "Career",
    icon: "🎯",
    description: "Develop communication, teamwork and professional skills."
  },
  {
    id: 11,
    title: "Resume and Interview Skills",
    category: "Career",
    icon: "💼",
    description: "Learn how to prepare a resume and perform well in interviews."
  },
  {
    id: 12,
    title: "Deep Focus and Productivity",
    category: "Personal Growth",
    icon: "⚡",
    description: "Build better habits, concentration and daily routines."
  }
];

const topicGrid = document.getElementById("topicGrid");
const savedGrid = document.getElementById("savedGrid");
const searchInput = document.getElementById("searchInput");
const resultsInfo = document.getElementById("resultsInfo");
const emptySaved = document.getElementById("emptySaved");
const filters = document.getElementById("filters");

let selectedCategory = "All";
let savedTopics = JSON.parse(
  localStorage.getItem("productiveYoutubeSaved") || "[]"
);

function isSaved(id) {
  return savedTopics.includes(id);
}

function createCard(topic) {
  const card = document.createElement("article");
  card.className = "topic-card";

  const icon = document.createElement("div");
  icon.className = "topic-icon";
  icon.textContent = topic.icon;

  const category = document.createElement("span");
  category.className = "topic-category";
  category.textContent = topic.category;

  const title = document.createElement("h3");
  title.textContent = topic.title;

  const description = document.createElement("p");
  description.textContent = topic.description;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const youtubeLink = document.createElement("a");
  youtubeLink.className = "youtube-link";
  youtubeLink.href =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(topic.title + " explained for beginners");
  youtubeLink.target = "_blank";
  youtubeLink.rel = "noopener noreferrer";
  youtubeLink.textContent = "Find videos ↗";

  const saveButton = document.createElement("button");
  saveButton.className = "save-button";
  saveButton.type = "button";
  saveButton.textContent = isSaved(topic.id)
    ? "♥ Saved"
    : "♡ Save";

  saveButton.addEventListener("click", () => {
    toggleSave(topic.id);
  });

  actions.append(youtubeLink, saveButton);
  card.append(icon, category, title, description, actions);

  return card;
}

function renderTopics() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredTopics = topics.filter(topic => {
    const matchesCategory =
      selectedCategory === "All" ||
      topic.category === selectedCategory;

    const matchesSearch =
      topic.title.toLowerCase().includes(searchTerm) ||
      topic.description.toLowerCase().includes(searchTerm) ||
      topic.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  topicGrid.replaceChildren();

  filteredTopics.forEach(topic => {
    topicGrid.appendChild(createCard(topic));
  });

  resultsInfo.textContent =
    filteredTopics.length + " topics found";

  if (filteredTopics.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-message";
    message.textContent = "No topics found. Try another search.";
    topicGrid.appendChild(message);
  }
}

function renderSaved() {
  savedGrid.replaceChildren();

  const savedItems = topics.filter(topic =>
    savedTopics.includes(topic.id)
  );

  savedItems.forEach(topic => {
    savedGrid.appendChild(createCard(topic));
  });

  emptySaved.style.display =
    savedItems.length === 0 ? "block" : "none";
}

function toggleSave(id) {
  if (isSaved(id)) {
    savedTopics = savedTopics.filter(savedId => savedId !== id);
  } else {
    savedTopics.push(id);
  }

  localStorage.setItem(
    "productiveYoutubeSaved",
    JSON.stringify(savedTopics)
  );

  renderTopics();
  renderSaved();
}

searchInput.addEventListener("input", renderTopics);

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  renderTopics();
});

renderTopics();
renderSaved();
    
