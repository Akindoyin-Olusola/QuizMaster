**QuizMaster**

A Fun & Interactive Quiz Application
 Built with React, JavaScript, and Tailwind CSS

**Overview**
QuizMaster is a responsive quiz app that allows users to test their knowledge on different topics, view their scores, and track their progress over time.
 It fetches real questions from the Open Trivia Database API, displaying them one at a time in a fun and easy-to-use interface.
The goal of this project is to demonstrate my frontend development skills — from API integration to state management and responsive UI design.

**Features**

 Topic Selection: Choose from a variety of categories (General Knowledge, Science, History, and more).
Difficulty Levels: Select Easy, Medium, or Hard before starting the quiz.
Dynamic Questions: Questions are fetched live from the Open Trivia API.
Score Display: See your total score and review correct answers at the end.
Quiz History: Your past quiz attempts and scores are saved locally.
Search Functionality: Quickly find quiz topics by name.
Responsive Design: Built with Tailwind CSS for a seamless experience on mobile, tablet, and desktop.
Error Handling: Handles network or API issues gracefully with user-friendly messages.

**Tech Stack**

React (Vite) – for fast and modern frontend setup


Tailwind CSS – for responsive and clean UI


JavaScript (ES6) – core logic and interactivity


Open Trivia Database API – quiz data source


localStorage – store quiz history


Netlify / Vercel – deployment platform


**How It Works**

On the Home Page, select your quiz topic, number of questions, and difficulty level.


Click Start Quiz to begin.


Questions appear one at a time — pick an answer and move to the next.


After the final question, your score and review summary are shown.


You can retake the quiz or choose another topic.


**App Structure**
 
src/
├── components/
│   ├── Navbar.jsx
│   ├── TopicSelector.jsx
│   ├── QuestionCard.jsx
│   ├── ScoreCard.jsx
│   ├── Loader.jsx
│   └── ErrorMessage.jsx
├── pages/
│   ├── Home.jsx
│   ├── Quiz.jsx
│   └── Result.jsx
├── utils/
│   └── api.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx



**API Reference**

Base URL: https://opentdb.com/
Function
Endpoint Example
Fetch Categories
https://opentdb.com/api_category.php
Fetch Questions
https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple


UI / Prototype (High-Fidelity Screens)
The prototype includes:
Home Screen – Topic and difficulty selection


Quiz Screen – Question with multiple-choice options


Result Screen – Final score and correct answer summary


(Designed using Figma / Canva with Tailwind-inspired layout)

**Deployment** 
The app will be deployed using Netlify (or Vercel) for easy access.
 Once deployed, the live link will be added below 
🔗 Live Demo: 
 🔗 GitHub Repository: 
 
**Future Improvements**

Add a timer per question


Add dark mode


Allow users to create their own quizzes


Enable social media sharing for scores




