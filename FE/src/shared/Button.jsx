export function Button({ funct, children, style, type = "submit" }) {
  return (
    <>
      <button
        type={type}
        onClick={() => funct()}
        className={`px-4 py-3  ${style}`}
      >
        {children}
      </button>
    </>
  );
}
