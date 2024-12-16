import { Link } from "@tanstack/react-router";
import notFoundImage from "@/assets/404.png";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="grid place-items-center bg-[#F2F4F7] w-full h-screen">
      <div className="max-w-[450px] text-center flex items-center flex-col flex-wrap">
        <img
          alt="image"
          loading="lazy"
          width="450"
          height="450"
          decoding="async"
          data-nimg="1"
          className="w-11/12 h-auto"
          src={notFoundImage}
        />
        <div className="w-11/12 mx-auto">
          <h6 className="mt-8 font-medium text-2xl">
            Oops! Sorry page not found
          </h6>
          <p className="text-gray-600 mt-2 text-sm">
            The page you're trying to access doesn't exist on our website.
            Please check the URL and try again.
          </p>
        </div>

        <Link to="/">
          <Button className="mt-4 ">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
