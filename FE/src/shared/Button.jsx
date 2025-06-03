export function Button({ onClick, children, className, type = "button" }) {
  return (
    <>
      <button
        type={type}
        onClick={(e) => onClick(e)}
        className={`px-4 py-3 dark:text-white ${className}`}
      >
        {children}
      </button>
    </>
  );
}
