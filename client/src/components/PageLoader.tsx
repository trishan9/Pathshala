import loadingSpinner from "@/assets/loader.gif";

export const PageLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#F5F7F6]">
      <img
        src={loadingSpinner}
        className="w-96 h-96 object-cover aspect-square"
        alt="Loading..."
      />
    </div>
  );
};
