# BRD - Burnout Risk Dashboard - Student Wellness Tracker

## Description
Burnout Risk Dashboard is a full-stack web application designed to help students track early signs of academic burnout using simple daily inputs.

Students enter key metrics such as: 
- Sleep Hours
- Stress level (1-10)
- Study Hours
- Mood Score (1-10)

The application calculates a Burnout Indecn and displays trends to help users recognize patterns and take action before burnout becomes severe.

------

## Purpose
Many students experience burnout but don't realize it until it negatively affects their performance and mental health.

This app focuses specifically on academic burnout, unlike genreal wellness apps, by:
- Providing a clear burnour score
- Tracking academic-related habits
- Visualizing trens over time

------

## Core MVP Features
- User authentication (signup/login)
- Daily wellness data input form
- Burnout Index calculation
- Dashboard displaying risk level (Low / Moderate / High)
- Weekly trend visualization (charts)
- Responsive design (mobile + desktop)

------

## Burnout Index Logic (MVP)
The Burnout Score is calculated using a simple point system:

- Sleep < 6 hours → +2 points  
- Stress > 7 → +2 points  
- Study hours > 8 → +1 point  
- Mood < 4 → +2 points  

**Risk Levels:**
- 0–2 → Low  
- 3–5 → Moderate  
- 6+ → High  

---

## Tech Stack (Planned)
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Charts: Chart.js

---

## Installation & Setup
This project is a front-end based web application and does not require any special installation.
### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git

---

## Screenshots (To Be Added)
<!-- TODO:
- Login page
- Dashboard
- Input form
- Charts
-->

---

## Demo (To Be Added)
<!-- TODO:
- 1–2 minute demo video link
-->

---

## Future Development
- AI-based burnout prediction
- Push notifications
- Personalized recommendations
- Integration with campus counseling
- Admin dashboard (anonymized data trends)

---

## Contributors 
- Samiya Naseer (smn5914@psu.edu)
- Sumedha Pol (smp6989@psu.edu)

---



