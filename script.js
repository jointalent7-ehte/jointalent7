const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const accountDrawer = document.querySelector("#accountDrawer");
const openAccountButtons = document.querySelectorAll(".account-open");
const closeAccountButton = document.querySelector(".drawer-close");
const uploadInput = document.querySelector("#uploadInput");
const fileName = document.querySelector("#fileName");
const contributionNote = document.querySelector("#contributionNote");
const contributeButton = document.querySelector("#contributeButton");

function paintRating(widget, rating) {
  const stars = widget.querySelectorAll(".stars button");
  const value = widget.querySelector(".rating-value");
  const rounded = Number(rating).toFixed(1);

  value.textContent = rounded;
  stars.forEach((star) => {
    const starValue = Number(star.dataset.star);
    star.classList.toggle("filled", starValue <= Math.round(rating));
  });
}

document.querySelectorAll(".rating-widget").forEach((widget) => {
  paintRating(widget, Number(widget.dataset.rating));

  widget.querySelectorAll(".stars button").forEach((star) => {
    star.addEventListener("click", () => {
      const newRating = Number(star.dataset.star);
      widget.dataset.rating = String(newRating);
      paintRating(widget, newRating);
    });
  });
});

document.querySelectorAll(".love-button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".post-card").forEach((card) => {
      const categories = card.dataset.category;
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

openAccountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    accountDrawer.classList.add("open");
    accountDrawer.setAttribute("aria-hidden", "false");
  });
});

closeAccountButton.addEventListener("click", () => {
  accountDrawer.classList.remove("open");
  accountDrawer.setAttribute("aria-hidden", "true");
});

accountDrawer.addEventListener("click", (event) => {
  if (event.target === accountDrawer) {
    accountDrawer.classList.remove("open");
    accountDrawer.setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll("[data-account-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.accountTab;
    document.querySelectorAll("[data-account-tab]").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector("#signupForm").classList.toggle("hidden", selected !== "signup");
    document.querySelector("#loginForm").classList.toggle("hidden", selected !== "login");
  });
});

uploadInput.addEventListener("change", () => {
  const selectedFile = uploadInput.files[0];
  fileName.textContent = selectedFile ? selectedFile.name : "No file selected yet";
});

document.querySelectorAll(".contribution-options button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".contribution-options button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    contributeButton.textContent = `Continue with ${button.dataset.amount}`;
    contributionNote.textContent = "Payments are not connected in this demo, but this shows the future support flow.";
  });
});
