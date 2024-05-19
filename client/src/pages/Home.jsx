import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Link to="/about">
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-orange-500 to-rose-600 ">
        <div className="text-center">
          <h1
            className="text-9xl font-bold mb-4 text-white"
            style={{ fontFamily: "Molle, cursive" }}
          >
            Welcome!
          </h1>
          <h2 className="text-2xl text-white">Click to get started!</h2>
        </div>
      </div>
    </Link>
  );
};

export default Home;
