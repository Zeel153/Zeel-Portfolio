// DATE IN NAVBAR
document.getElementById('nav-date').textContent =
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();


// PROGRESS BAR
window.addEventListener('scroll', () => {
  const pct =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight) *
    100;

  document.getElementById('progress').style.width = pct + '%';
});


// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.slide').forEach(slide => {
  observer.observe(slide);
});

document.getElementById('slide-hero').classList.add('visible');


// AI DEMO CHAT
const msgBox = document.getElementById('msgs');
const input = document.getElementById('inp');
const sendBtn = document.getElementById('sendbtn');
const typing = document.getElementById('typing');


// PREWRITTEN RESPONSES
const replies = {
  direction:
    "Zeel is building toward a professional direction that combines Information Technology, automation, web systems, and applied AI tools. The focus is on practical AI workflows rather than hype.",

  projects:
    "The portfolio includes both completed work and realistic future project concepts such as the Echoes of Antiquity museum project, an IT helpdesk ticket classifier, and a RAG study assistant.",

  ai:
    "AI was used throughout the workflow for research, planning, writing refinement, debugging, design iteration, and organizing professional direction. Final decisions and revisions were made intentionally by Zeel.",

  skills:
    "Current skills include Python, HTML, CSS, JavaScript, Linux, networking fundamentals, APIs, SQL, GitHub, and AI-assisted workflows.",

  internship:
    "Zeel is actively building skills and projects related to IT systems, automation, web development, and AI-forward engineering opportunities."
};


// ADD MESSAGE TO SCREEN
function addMessage(role, text) {
  const div = document.createElement('div');

  div.className =
    'tmsg tmsg-' + (role === 'user' ? 'user' : 'ai');

  div.innerHTML = `
    <div class="tmsg-label">
      ${role === 'user' ? 'visitor' : 'assistant'}
    </div>

    <div class="tmsg-bubble">
      ${text}
    </div>
  `;

  msgBox.appendChild(div);

  msgBox.scrollTop = msgBox.scrollHeight;
}


// QUICK BUTTONS
function quickSend(text) {
  input.value = text;
  sendMsg();
}


// ENTER KEY
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    sendMsg();
  }
});


// SEND MESSAGE
function sendMsg() {

  const text = input.value.trim();

  if (!text || sendBtn.disabled) return;

  addMessage('user', text);

  input.value = '';

  sendBtn.disabled = true;

  typing.classList.add('on');

  // SIMULATED THINKING
  setTimeout(() => {

    typing.classList.remove('on');

    let response =
      "This portfolio demonstrates Zeel's direction toward AI-forward engineering, combining IT foundations with practical AI workflows and project-based learning.";

    const lower = text.toLowerCase();

    if (
      lower.includes('direction') ||
      lower.includes('goal') ||
      lower.includes('future')
    ) {
      response = replies.direction;
    }

    else if (
      lower.includes('project') ||
      lower.includes('build')
    ) {
      response = replies.projects;
    }

    else if (
      lower.includes('ai') ||
      lower.includes('workflow') ||
      lower.includes('chatgpt')
    ) {
      response = replies.ai;
    }

    else if (
      lower.includes('skill') ||
      lower.includes('python') ||
      lower.includes('technology')
    ) {
      response = replies.skills;
    }

    else if (
      lower.includes('hire') ||
      lower.includes('internship') ||
      lower.includes('job')
    ) {
      response = replies.internship;
    }

    addMessage('ai', response);

    sendBtn.disabled = false;

    input.focus();

  }, 1000);
}
