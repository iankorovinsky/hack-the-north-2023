import React from 'react';

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: 'url("landing.jpeg")', // Replace with your image path
  };

  const blurOverlayStyle = {
    backdropFilter: 'blur(5px)', // Adjust the blur value as needed
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the background color and opacity as needed
  };



  // Function to handle the button click and redirect to /app
  const redirectToApp = () => {
    window.location.href = '/app'; // Redirect to /app
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <video
        id="background-video"
        autoPlay
        loop
        className="fixed top-0 left-0 min-w-full min-h-full object-cover"
      >
        <source src={"/fragment_15.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Blur Overlay */}
      <div
        className="absolute inset-0"
        style={blurOverlayStyle}
      ></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">your memories reimagined.</h1>
          <p className="mt-4 text-lg">
            no more deja vu. relive your memories in real time, with a simple search.
          </p>
          {/* White Button */}
          <button
            className='bg-white text-black px-4 py-2 rounded-lg mt-6 hover:bg-slate-100'
            onClick={redirectToApp}
          >
            Start now!
          </button>
        </div>
      </div>
    </div>
  );
}
