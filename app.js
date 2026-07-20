// StarLaunch Application Core State & Interactions

// Default Database
const DEFAULT_AUDITIONS = [
  {
    id: "silent-horizon",
    title: "The Silent Horizon",
    type: "Movie",
    description: "A psychological thriller exploring the depths of artificial consciousness in a near-future Mars colony. Directed by Marcus Vane.",
    detailedDescription: "Kaelen is a highly intelligent, slightly detached neuro-engineer living on the Phobos-1 station. The character requires a performer capable of nuanced, internal storytelling and profound emotional range. Kaelen is a man of few words, often communicating through subtle micro-expressions. Performers should be prepared for intense dialogue-heavy scenes as well as physically demanding sequences in zero-gravity rigs.",
    role: "Lead Actor: Kaelen Vance",
    location: "Los Angeles, CA",
    detailedLocation: "London, UK (Pinewood Studios)",
    salary: "$2,500/Day",
    deadline: "Dec 15 Deadline",
    dates: "Oct 12, 2026 - Jan 08, 2027",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT4paOf2AJIY_Az9aXYrHF8dGi8aBcAX_NY6Sc07-p4sVMhGSiQPuOI9EMY0f4augF1-c5Gnb4NH4M1yHxCEi0AeI1_jjh3vJXjr-s-DO5TLu3oJS-Qmd88Z6_Ez4BdJ8Ptp_bQ0aBeNjIYCeBEo_IZjK3VBwTau3hPKk_iENZTE642W_SSCuyb3U5FBGm8FVB7xTM0kzGH15uiloUBl0PdLMn4fOM-8StE_F6jhfyrRHWlbNLl7I8uz0TlnzB0zWijXzluUABJJn0"
  },
  {
    id: "aura-fragrance",
    title: "Aura Fragrance",
    type: "Commercial",
    description: "A sleek, modern visual commercial for a luxury fashion and fragrance brand. High-fashion lighting, minimalist background.",
    role: "Lead Model",
    location: "New York, NY",
    salary: "$1,200/Day",
    deadline: "Nov 30 Deadline",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNwjJWJ8Hda8qCGSE8fs38Ks29oe7u0lgz7c7PXnmp7MVCLceAW0sRTDutqdqm8spILpYw7fzYbKNHiRX_KpL_cXsNvjD9LECBNd1fJ-DPa1sQmEV9s7158tmKchQW8q1HEKNTqOmI88jRG4UcjN1e58Y3FOlmTwh6hXHIim87EkiTLkMkUaL5e39AKC7cdEUY_JU7wv5VQIFPm4EfwkObQkfZt_uiiD0bVZToKmWz94hno1R03pPy2DUD_FFQdZBBNs9IT2C6fWdr"
  },
  {
    id: "nightfall-files",
    title: "Nightfall Files",
    type: "Web Series",
    description: "A cinematic noir thriller series. The scene is lit with dramatic shadows and cool blue tones, following a mysterious investigator.",
    role: "Recurring Supporting",
    location: "London, UK",
    salary: "$800/Day",
    deadline: "Jan 10 Deadline",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB12XxU6l-P6f6C1ExerjyYGbchw2jmdbcjC1EpgvKiJVfetsgaiXabsQT2PaA8CJLLnxmNUpOaowRMs7Rx7qJZzjMMev73RWtcK7ipsfhJV9IQJX2XiPpPzwHpOkxm0qpONyH7vdjijlMPypI9uFS6v_tdCL_kmzTm2Icmrp530Y7zhkK3tNRWY_sR2eKGD_xd5jDvFGyRwNCOl8Hif5cibffzvyKwfwLLO0TUEWZ4-aBIfWbM9r9r_9cMnEUPzacf2jQPeFGRDxd_"
  }
];

// Initialize DB in LocalStorage
function initDB() {
  if (!localStorage.getItem("starlaunch_auditions")) {
    localStorage.setItem("starlaunch_auditions", JSON.stringify(DEFAULT_AUDITIONS));
  }
  if (!localStorage.getItem("starlaunch_applications")) {
    localStorage.setItem("starlaunch_applications", JSON.stringify([]));
  }
  if (!localStorage.getItem("starlaunch_user")) {
    localStorage.setItem("starlaunch_user", "actor");
  }
}

initDB();

// DB Operations
const StarLaunchDB = {
  getAuditions() {
    return JSON.parse(localStorage.getItem("starlaunch_auditions"));
  },
  saveAuditions(auditions) {
    localStorage.setItem("starlaunch_auditions", JSON.stringify(auditions));
  },
  addAudition(audition) {
    const auditions = this.getAuditions();
    audition.id = "custom-" + Date.now();
    auditions.push(audition);
    this.saveAuditions(auditions);
  },
  getApplications() {
    return JSON.parse(localStorage.getItem("starlaunch_applications"));
  },
  saveApplications(apps) {
    localStorage.setItem("starlaunch_applications", JSON.stringify(apps));
  },
  applyToAudition(auditionId, details = {}) {
    const apps = this.getApplications();
    // Check if already applied
    if (apps.some(a => a.auditionId === auditionId)) {
      return false; // Already applied
    }
    apps.push({
      id: "app-" + Date.now(),
      auditionId,
      actorName: "Alex Rivera",
      actorRole: "Pro Actor",
      actorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqAFAvxDM94FAxtldl-s1a1Cllo5SzqdUOcLzMs_UZNqPZYz8I59hBIoSLiuRJA2lUGIcru19lleF3q4h0lRMmSHrjffLsmOaTWFgQoXew7Y0LhnlgEpsvHqFpI9sA8IZY3TiEsnQAIbrkwIm-iJFGhuK1rz2QK0jsDJhW0Fcy40zYiRnaLCz71qjk4uaxjjOqAJGf4HrgaemJRP3cX5sDRV35WbBFkRX-Y_SlvWdHdHapBv5Rrctin-vDbjA_JleygXNPO94vibp",
      status: "Pending Review",
      dateApplied: new Date().toLocaleDateString(),
      ...details
    });
    this.saveApplications(apps);
    return true;
  },
  getCurrentUser() {
    return localStorage.getItem("starlaunch_user") || "actor";
  },
  setCurrentUser(role) {
    localStorage.setItem("starlaunch_user", role);
  }
};

// UI Notifications (Toast)
function showToast(message, type = "success") {
  const containerId = "toast-container";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.className = "fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-notification flex items-center gap-3 bg-surface-container-high border-l-4 p-4 rounded-xl shadow-2xl glass-card transition-all duration-300 transform translate-y-10 opacity-0 pointer-events-auto max-w-sm";
  
  if (type === "success") {
    toast.classList.add("border-primary");
  } else if (type === "error") {
    toast.classList.add("border-error");
  } else {
    toast.classList.add("border-outline");
  }

  const iconName = type === "success" ? "check_circle" : (type === "error" ? "error" : "info");
  const iconColor = type === "success" ? "text-primary-container" : (type === "error" ? "text-error" : "text-on-surface-variant");

  toast.innerHTML = `
    <span class="material-symbols-outlined ${iconColor}">${iconName}</span>
    <div class="flex-1 text-body-sm font-medium text-on-surface">${message}</div>
    <button class="text-on-surface-variant hover:text-white transition-colors" onclick="this.parentElement.remove()">
      <span class="material-symbols-outlined text-[18px]">close</span>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation frame for CSS transitions
  requestAnimationFrame(() => {
    toast.classList.add("show");
    toast.classList.remove("translate-y-10", "opacity-0");
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("translate-y-10", "opacity-0");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Global Login Modal Handler
function setupLoginModal() {
  const loginBtns = document.querySelectorAll("[data-action='login']");
  if (loginBtns.length === 0) return;

  // Add click listener
  loginBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openLoginModal();
    });
  });
}

function openLoginModal() {
  let modal = document.getElementById("login-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "login-modal";
    modal.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300";
    modal.innerHTML = `
      <div class="glass-card w-full max-w-md p-8 rounded-[32px] transform scale-95 transition-transform duration-300 relative border border-white/10 gold-glow">
        <button class="absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors" id="close-login">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
        <h2 class="font-headline-lg text-headline-lg text-white mb-2 text-center">Login to <span class="text-primary-container">StarLaunch</span></h2>
        <p class="font-body-sm text-body-sm text-on-surface-variant text-center mb-8">Access the cinematic casting engine.</p>
        
        <div class="flex flex-col gap-4">
          <button class="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-label-caps text-label-caps font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-container/10" id="login-as-actor">
            <span class="material-symbols-outlined">person</span> LOGIN AS ACTOR
          </button>
          
          <button class="w-full border border-white/20 text-white hover:bg-white/5 py-4 rounded-xl font-label-caps text-label-caps font-bold active:scale-95 transition-all flex items-center justify-center gap-3" id="login-as-casting">
            <span class="material-symbols-outlined">movie</span> LOGIN AS CASTING DIRECTOR
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("close-login").addEventListener("click", closeLoginModal);
    document.getElementById("login-as-actor").addEventListener("click", () => {
      StarLaunchDB.setCurrentUser("actor");
      window.location.href = "actor-dashboard.html";
    });
    document.getElementById("login-as-casting").addEventListener("click", () => {
      StarLaunchDB.setCurrentUser("casting_director");
      window.location.href = "casting-director-dashboard.html";
    });
  }

  modal.classList.remove("pointer-events-none");
  modal.classList.add("opacity-100");
  modal.querySelector(".glass-card").classList.remove("scale-95");
  modal.querySelector(".glass-card").classList.add("scale-100");
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.classList.add("pointer-events-none");
    modal.classList.remove("opacity-100");
    modal.querySelector(".glass-card").classList.add("scale-95");
    modal.querySelector(".glass-card").classList.remove("scale-100");
  }
}

// Share function
function setupShareButton() {
  const shareBtns = document.querySelectorAll("[data-action='share']");
  shareBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dummyUrl = window.location.href;
      navigator.clipboard.writeText(dummyUrl).then(() => {
        showToast("Profile link copied to clipboard!");
      }).catch(() => {
        showToast("Failed to copy link.", "error");
      });
    });
  });
}

// Export functions to window
window.StarLaunchDB = StarLaunchDB;
window.showToast = showToast;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.setupLoginModal = setupLoginModal;
window.setupShareButton = setupShareButton;

// Main initializer on load
document.addEventListener("DOMContentLoaded", () => {
  setupLoginModal();
  setupShareButton();
  
  // Custom redirects for dashboard anchors
  const joinBtns = document.querySelectorAll("[data-action='join']");
  joinBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openLoginModal();
    });
  });
});
