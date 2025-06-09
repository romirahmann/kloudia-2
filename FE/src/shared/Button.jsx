export function Button({ onClick, children, className, type = "button" }) {
  return (
    <>
      <button
        type={type}
        onClick={(e) => onClick(e)}
        className={` dark:text-white ${className}`}
      >
        {children}
      </button>
    </>
  );
}
