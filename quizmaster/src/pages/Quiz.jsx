import { useEffect, useState } from "react";

export default function Quiz({ question, index, total, onSelect, onNext, score }) {
  const [selected, setSelected] = useState(question.user_answer || null);

  useEffect(() => {
    setSelected(question.user_answer || null);
  }, [question]);

  function handleChoose(ans) {
    setSelected(ans);
    onSelect(ans);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Question {index + 1} / {total}
        </div>
        <div className="text-sm">Score: {score}</div>
      </div>

      <div className="p-4 rounded-md border bg-gray-50">
        <div
          className="font-medium mb-3"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.all_answers.map((ans, i) => {
            const isSelected = selected === ans;
            return (
              <button
                key={i}
                onClick={() => handleChoose(ans)}
                className={`text-left rounded-md p-3 border transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "bg-white hover:bg-gray-100"
                }`}
                dangerouslySetInnerHTML={{ __html: ans }}
              />
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onNext}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            {index + 1 === total ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
