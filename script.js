const progressBar = document.querySelector(".scroll-progress");
const posterPreview = document.querySelector("#poster-preview");
const posterButtons = document.querySelectorAll(".poster-tabs button");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(progress * 100, 100)}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

posterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.src;
    if (!src || posterPreview.getAttribute("src") === src) return;

    posterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    posterPreview.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(10px)" },
      ],
      { duration: 140, easing: "ease-out" },
    ).onfinish = () => {
      posterPreview.src = src;
      posterPreview.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 220, easing: "ease-out" },
      );
    };
  });
});

const revealTargets = document.querySelectorAll(
  ".statement div, .section-heading, .profile-visual, .profile-brief, .profile-facts, .profile-symbols, .profile-proof figure, .cinema-frame, .story-grid figure, .system-layout figure, .product-hero-card, .product-feature, .product-side figure, .product-card, .gallery-shell",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

revealTargets.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});
