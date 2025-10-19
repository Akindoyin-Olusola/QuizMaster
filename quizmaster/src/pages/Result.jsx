export default function Result({ record, onRetake, questions }) {
return (
<div>
<h2 className="text-xl font-semibold">Results</h2>
<div className="mt-4 p-4 rounded border bg-gray-50">
<div className="text-lg">Score: {record.score} / {record.total}</div>
<div className="mt-4">
<button onClick={onRetake} className="px-4 py-2 rounded bg-blue-600 text-white">Back to Home</button>
</div>
</div>
 


<div className="mt-6">
<h3 className="font-medium mb-2">Review</h3>
<ul className="space-y-3">
{questions.map((q, i) => (
<li key={i} className="p-3 border rounded bg-white">
<div className="font-medium">{i + 1}. {q.question}</div>
<div className="mt-2 text-sm">Your answer: <strong>{q.user_answer ?? "—"}</strong></div>
<div className="text-sm">Correct answer: <strong>{q.correct_answer}</strong></div>
</li>
))}
</ul>
</div>
</div>
);
}