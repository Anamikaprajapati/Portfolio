# Anamika Prajapati – Portfolio Website

A modern, responsive personal portfolio built with plain **HTML, CSS and JavaScript**. No frameworks, no build step, no backend. It works directly on **GitHub Pages**.

## Features

- Sections: Home, About, Education, Skills, Projects, Internship/Training, Certifications, Contact
- Light and dark theme (remembers the visitor's choice)
- Fully responsive (mobile, tablet, desktop) with a hamburger menu
- Sticky navbar with active-section highlighting
- Smooth scrolling, scroll animations, typing effect (respects "reduce motion")
- Download Resume button (hides itself if `resume.pdf` is missing)
- Contact form that opens the visitor's email app
- Missing images, repo links and certificate links hide automatically – no broken buttons
- Certificates open from the site (PDF or image) and the IBM badge links to Credly

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── bank-management.jpg
│   │   ├── meditrack-ai.jpg
│   │   └── school-management.jpg
│   ├── documents/
│   │   └── resume.pdf
│   └── certificates/
│       ├── plasmid-internship.pdf
│       ├── centum-employability-training.jpg
│       ├── btps-summer-training.jpg
│       └── iit-kanpur-java-training.pdf
└── README.md
```

## 1. Replace photo, project images, resume and certificates

All files are already included. To change one, put a new file in the same folder with the **same name** (or change the name in `index.html`).

| File | Folder | Notes |
|---|---|---|
| `profile.jpg` | `assets/images/` | Square photo works best (about 600×600) |
| `bank-management.jpg`, `meditrack-ai.jpg`, `school-management.jpg` | `assets/images/` | Currently design mock-ups. Replace with real screenshots of your apps when ready (16:9 looks best) |
| `resume.pdf` | `assets/documents/` | Your resume |
| certificate files | `assets/certificates/` | Opened by the "View" buttons |

Note: everything in the repo is public once hosted, including your resume and certificates. Remove any file you do not want public, and remove its "View" button's `href` in `index.html` (the button then hides itself).

## 2. Edit text, skills, projects and certificates

Open `index.html` in any editor (VS Code, Notepad). Every place you may want to change has a comment starting with `EDIT:`. Use **Ctrl + F** and search for `EDIT`.

- **Skills:** add or remove `<li>` items inside the `chips` lists.
- **Projects:** copy a whole `<article class="card project reveal">…</article>` block to add a new project.
- **Certificates:** copy a whole `<article class="card cert reveal">…</article>` block.
- **Project GitHub links:** replace `[PROJECT_REPO_LINK]` with your repository URL, e.g. `https://github.com/Anamikaprajapati/bank-management-system`. The button appears only when the link starts with `http`.
- **Certificate links:** replace `[CERTIFICATE_LINK]` the same way.

## 3. Change colours and fonts

Open `css/style.css`. The first block, **VARIABLES**, controls everything:

- `--accent` – main colour (default indigo `#4f46e5`)
- `--accent-2` – secondary colour
- `--font-head` and `--font-body` – fonts (also change the Google Fonts link in `index.html` if you pick new ones)

There is one set of values for light theme (`:root`) and one for dark (`:root[data-theme="dark"]`).

## 4. Publish on GitHub Pages (step by step)

1. Sign in at [github.com](https://github.com) and click **New repository**.
2. Name it **`Anamikaprajapati.github.io`** (for a main site at `https://anamikaprajapati.github.io/`), or any other name (the site will then be at `https://anamikaprajapati.github.io/REPO-NAME/`). Keep it **Public**.
3. Click **uploading an existing file**. Unzip this project first, then drag **the contents of the `portfolio` folder** (`index.html`, `css`, `js`, `assets`, `README.md`) into the page. `index.html` must be at the top level of the repo.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch **`main`** and folder **`/ (root)`**, then **Save**.
6. Wait 1–2 minutes and open your link. To update later, upload the changed files again and commit.

All paths in the project are relative, so it works in both cases above.

## 5. Checklist before you share the link

- [ ] Replace the three `[PROJECT_REPO_LINK]` values with your GitHub repo links (buttons stay hidden until you do)
- [ ] Replace the project mock-up images with real screenshots
- [ ] Check the resume and certificates are the versions you want public
- [ ] Once MediTrack AI is finished, remove the "In Progress" badge

## 6. Test on your computer

Double-click `index.html` to open it in your browser. (The resume-check only runs on a real web address, so it is skipped locally.)

## Credits

Designed and written for Anamika Prajapati. Fonts: Inter and Poppins (Google Fonts). Icons are inline SVG. You are free to modify this project for your own use.
