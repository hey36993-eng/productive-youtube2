
const videos = [
  {
    title: "How the Internet Works",
    category: "Technology",
    description: "Understand websites, networks and the internet."
  },
  {
    title: "The Science of Better Habits",
    category: "Science",
    description: "Learn how habits work and how to build better ones."
  },
  {
    title: "Personal Finance for Beginners",
    category: "Finance",
    description: "Understand saving, budgeting and money management."
  },
  {
    title: "Learn Anything Faster",
    category: "Education",
    description: "Discover effective learning and study techniques."
  },
  {
    title: "How to Focus Deeply",
    category: "Personal Growth",
    description: "Improve concentration and reduce distractions."
  },
  {
    title: "Introduction to Artificial Intelligence",
    category: "Technology",
    description: "Understand AI and how it is changing the world."
  }
];

let selectedCategory = "All";
let saved = [];

const videoContainer = document.getElementById("videos");
const search = document.getElementById("search");

function renderVideos() {
  const query = search.value.toLowerCase();

  const filtered = videos.filter(video => {
    const matchesCategory =
      selectedCategory === "All" ||
      video.category === selectedCategory;

    const matchesSearch =
      video.title.toLowerCase().includes(query) ||
      video.category.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  videoContainer.innerHTML = "";

  document.getElementById("empty").hidden =
    filtered.length !== 0;

  filtered.forEach(video => {
    const index = videos.indexOf(video);

    const card = document.createElement("article");
    card.className = "card";

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = video.category;

    const title = document.createElement("h3");
    title.textContent = video.title;

    const description = document.createElement("p");
    description.textContent = video.description;

    const saveButton = document.createElement("button");
    saveButton.textContent =
      saved.includes(index) ? "✓ Saved" : "+ Save";

    saveButton.addEventListener("click", () => {
      if (saved.includes(index)) {
        saved = saved.filter(id => id !== index);
      } else {
        saved.push(index);
      }

      renderVideos();
      renderSaved();
    });

    card.append(category, title, description, saveButton);
    videoContainer.appendChild(card);
  });
}

function renderSaved() {
  const container = document.getElementById("saved-videos");
  container.innerHTML = "";

  if (saved.length === 0) {
    container.textContent = "No saved videos yet.";
    return;
  }

  saved.forEach(index => {
    const video = videos[index];
    const item = document.createElement("p");
    item.textContent = "★ " + video.title;
    container.appendChild(item);
  });
}

document.querySelector(".filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.toggle("active", btn === button);
  });

  renderVideos();
});

search.addEventListener("input", renderVideos);

renderVideos();
renderSaved();
