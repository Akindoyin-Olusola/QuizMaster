export async function fetchCategories() {
const res = await fetch("https://opentdb.com/api_category.php");
if (!res.ok) throw new Error("Failed to fetch categories");
const data = await res.json();
return data.trivia_categories || [];
}


export async function fetchQuestions({ category, difficulty, amount }) {
const params = new URLSearchParams();
params.set("amount", amount);
if (category) params.set("category", category);
if (difficulty) params.set("difficulty", difficulty);
params.set("type", "multiple");


const res = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
if (!res.ok) throw new Error("Failed to fetch questions");
const data = await res.json();
if (data.response_code !== 0) throw new Error("No questions available");


return data.results.map(q => ({
...q,
question: decodeHtml(q.question),
correct_answer: decodeHtml(q.correct_answer),
all_answers: shuffle([q.correct_answer, ...q.incorrect_answers]).map(decodeHtml),
}));
}


function shuffle(array) {
const a = [...array];
for (let i = a.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[a[i], a[j]] = [a[j], a[i]];
}
return a;
}


function decodeHtml(html) {
const txt = document.createElement("textarea");
txt.innerHTML = html;
return txt.value;
}