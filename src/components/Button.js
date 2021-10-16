export default function Button({ className, content, onClick }) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <div className="button__content">
        {content}
      </div>
    </button>
  );
};
