import { useEffect, useState } from "react"; // Import useEffect to play the video
import { Rnd } from "react-rnd";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(true);
  const [response, setResponse] = useState();
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const video = document.getElementById("background-video"); // Get the video element
    if (video) {
      // @ts-ignore
      video.play();
    }
  }, []);

  const getResponses = async () => {
    setLoading(true);
    // do some processing....

    const fake_response = "Wow, you are so cool!";
    // @ts-ignore
    setResponse(fake_response);
    console.log(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Video element covering the entire screen */}
      <video
        id="background-video"
        autoPlay
        loop
        muted={muted}
        className="fixed top-0 left-0 min-w-full min-h-full object-cover"
      >
        <source src="/test.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Your content */}
      <main className="relative z-10">
        <Rnd
          default={{
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            width: 320,
            height: 320,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            color: "black",
            padding: "0 10px",
          }}
        >
          {loading && <div>Loading...</div>}

          {!loading && response && <div>{response}</div>}
          {!loading && !response && <div>Ask me a question!</div>}
        </Rnd>

        <Rnd
          enableResizing={false}
          default={{
            x: 0,
            y: 0,
            width: 320,
            height: 40,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "0 10px",
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              width: "80%",
              height: "100%",
              fontSize: "16px",
              background: "transparent",
              color: "black",
            }}
          />
          <button
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              color: "#666666",
            }}
            onClick={getResponses}
          >
            Search
          </button>
        </Rnd>

        {/* ... your existing content ... */}
      </main>
    </div>
  );
}
