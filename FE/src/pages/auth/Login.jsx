export function Login() {
  return (
    <>
      <div className="h-screen grid grid-cols-3 justify-center items-center bg-gray-200">
        <div className="brand col-span-2 relative h-screen overflow-hidden rounded-e-[20em]">
          {/* Background Image */}
          <div className="absolute  inset-0 bg-login bg-cover bg-center brightness-50 blur-sm"></div>

          {/* Konten di atasnya */}
          <div className="relative z-10 text-white flex flex-col items-center justify-center h-full">
            <img src="/icon/icon-dms.png" className="w-28" alt="" />
            <h1 className="text-4xl font-bold mt-4 tracking-wide">KLOUDIA</h1>
            <p className="mt-2 text-lg font-semibold italic">
              Revolutionizing the Way You Manage Documents
            </p>
            <p className="mt-1 text-sm">A secure, smart, and scalable DMS</p>
            <p className="mt-1 text-sm">
              Crafted with care by PT Padama Bahtera Labelindo
            </p>

            <hr className="my-4 w-1/2 border-gray-300/30" />

            <p className="text-sm opacity-90">
              Say goodbye to paper chaos, and hello to intelligent archiving.
            </p>
            <p className="text-sm opacity-90">
              Organize, access, and share files — anytime, anywhere.
            </p>
            <p className="text-sm opacity-90">
              Designed to empower your workflow with precision and speed.
            </p>

            <p className="mt-4 text-xs italic opacity-70">
              “Your documents deserve more than just storage — they deserve
              clarity.”
            </p>
          </div>
        </div>
        <div className="box-login p-10 flex justify-center">
          <h1>LOGIN</h1>
        </div>
      </div>
    </>
  );
}
