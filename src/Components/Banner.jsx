import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white h-80 flex items-center justify-center">
      {/* Banner Content */}
      <div className="text-center" data-aos="fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome to Task Management
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Organize your tasks, stay productive, and achieve more!
        </p>
        <button
          className="mt-6 bg-cyan-700 hover:bg-cyan-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
          data-aos="zoom-in"
        >
          Get Started
        </button>
      </div>

      {/* Optional Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('')",
        }}
        data-aos="fade-in"
      />
    </section>
  );
};

export default Banner;
