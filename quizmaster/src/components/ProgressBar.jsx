export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-purple-100 rounded-full h-4">
      <div
        className="bg-purple-600 h-4 rounded-full transition-all duration-700"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
