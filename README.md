# 🎵 Synthesia — Spotify Clone

> A modern music streaming web application inspired by Spotify, built using the MERN Stack as part of the WebStack Internship Program.

---

## 🚀 Project Overview

Synthesia replicates the core features of a real-world music streaming platform — dynamic song browsing, album-based navigation, and seamless audio playback.

The main objective was to demonstrate full-stack development skills by integrating a responsive frontend UI, RESTful backend APIs, and database management into a complete working application.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) + CSS Modules + React Router DOM |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| File Handling | Multer (audio and image uploads) |
| Cloud Storage | Cloudinary |
| Audio Playback | HTML Audio API |

---

## 🎧 Features

- Play, pause, seek, and volume control
- Category-based browsing — Workout, Chill, Happy, Relaxing, Rock
- Album view with cover art and full song list
- Dynamic data fetching via REST APIs
- User authentication — Login and Signup
- Edit profile functionality
- Admin panel for managing songs and albums
- Responsive modern dark UI

---

## 📁 Project Structure

```
Project/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary storage config
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── albumController.js     # Album CRUD logic
│   │   ├── songController.js      # Song CRUD logic
│   │   └── userController.js      # User auth and profile logic
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT route protection
│   │   └── multer.js              # File upload config
│   ├── models/
│   │   ├── albumModel.js          # Album schema
│   │   ├── songModel.js           # Song schema
│   │   └── userModel.js           # User schema
│   ├── routes/
│   │   ├── albumRoute.js
│   │   ├── songRoute.js
│   │   └── userRoute.js
│   ├── uploads/                   # Local file upload directory
│   ├── bulk_import.js             # Bulk song import script
│   ├── seed.js                    # Database seed script
│   ├── seed_real_songs.js         # Real songs seed script
│   └── server.js                  # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── Auth.jsx        # Auth wrapper component
    │   │   │   ├── Login.jsx       # Login form
    │   │   │   └── Signup.jsx      # Signup form
    │   │   ├── layout/
    │   │   │   ├── Footer.jsx      # Player footer bar
    │   │   │   ├── MainArea.jsx    # Central content area
    │   │   │   └── SideMenu.jsx    # Left sidebar navigation
    │   │   ├── player/
    │   │   │   ├── ControlArea.jsx # Play/pause/seek/volume controls
    │   │   │   ├── Features.jsx    # Extra player features
    │   │   │   ├── Playlist.jsx    # Playlist view
    │   │   │   ├── SongDetail.jsx  # Now playing song info
    │   │   │   └── SongList.jsx    # Song list display
    │   │   ├── profile/
    │   │   │   └── EditProfile.jsx # Edit user profile
    │   │   ├── search/
    │   │   │   └── SearchBar.jsx   # Search input component
    │   │   └── songs/
    │   │       └── SongGrid.jsx    # Song cards grid layout
    │   ├── context/
    │   │   └── PlayerContext.jsx   # Global player state (current song, play/pause, queue)
    │   ├── css/                    # Component-scoped CSS files
    │   │   ├── auth/               # Auth, Login, Signup, EditProfile styles
    │   │   ├── common/             # Modal styles
    │   │   ├── footer/             # ControlArea, Features, Footer, SongDetail styles
    │   │   ├── mainArea/           # MainArea, Playlist, SongList styles
    │   │   ├── pages/              # Admin, HomePage, EditProfile page styles
    │   │   ├── search/             # SearchBar styles
    │   │   ├── sidemenu/           # SideMenu styles
    │   │   └── songs/              # SongCard, SongGrid styles
    │   ├── pages/
    │   │   ├── Admin.jsx           # Admin panel — manage songs and albums
    │   │   └── Homepage.jsx        # Main landing/home page
    │   ├── App.jsx                 # Root component and routing
    │   └── main.jsx                # React entry point
    └── index.html
```

---

## 🗄️ Database Structure

**Songs Collection**
- Song name, Artist, Album reference
- Image URL, Audio file path, Duration

**Albums Collection**
- Album name, Description
- Background theme, Cover image

**Users Collection**
- Name, Email, Hashed password
- Profile info, Auth tokens

---

## 🏗️ System Architecture

```
Frontend (React)  →  REST API (Express)  →  MongoDB  →  Audio via HTML Audio API
                                ↕
                          Cloudinary (media storage)
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI and Cloudinary credentials
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Seed the Database
```bash
# Seed sample songs and albums
node backend/seed.js

# Or bulk import real songs
node backend/bulk_import.js
```

---

## 📈 Future Enhancements

- Personalized playlists
- Advanced search functionality
- Lyrics integration
- Mobile app version using React Native

---

## 🎓 Internship

This project was built as part of the **WebStack Internship Program**, focusing on practical implementation of full-stack web development concepts using the MERN stack. Submitted for internship evaluation and certification.

---

## 👨‍💻 Author

**Abhiram Mamillapalli**  
Full Stack Web Development Enthusiast
