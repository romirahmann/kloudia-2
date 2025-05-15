import { router } from "../routes/Routes";

/* eslint-disable no-unused-vars */
export function ErrorPage() {
  const handleBack = () => {
    router.navigate({ to: "/" });
  };
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <img src="/icon/404.svg" className="w-[50em]" alt="" />
        <button
          onClick={() => handleBack()}
          className="bg-primary hover:bg-dark-primary px-3 py-2 rounded-xl text-white font-medium mt-3"
        >
          Go Back!
        </button>
      </div>
    </>
  );
}
