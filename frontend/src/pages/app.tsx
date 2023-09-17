import { useEffect, useState } from "react"; // Import useEffect to play the video
import { Rnd } from "react-rnd";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [videoName, setVideoName] = useState("fragment_22.mp4");
  const [muted, setMuted] = useState(true);
  const [response, setResponse] = useState();
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const video = document.getElementById("background-video");
    if (video) {
      video.src = videoName; 
      video.load(); 
      video.play();
    }
  }, [videoName]);

  const getResponses = async () => {
    setLoading(true);

    const videoIndices = [0, 1, 2, 3, 4]; // Indices to iterate through
  setLoading(true);

  try {
    for (const index of videoIndices) {
      const response = await fetch("http://127.0.0.1:2000/api/branch", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `query=${question}`,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      if (data.results && data.results[index]) {
        const videoFileName = data.results[index]["File Name"].replace('mov', 'mp4');
        setVideoName(videoFileName);
        console.log(data.results[index]);
        setResponse(data.summary[1]);
        setLoading(false);

        // Wait for 20 seconds before playing the next video
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
    }
  } catch (e) {
    console.error("Error playing videos:", e);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <video
        id="background-video"
        autoPlay
        loop
        muted={muted}
        className="fixed top-0 left-0 min-w-full min-h-full object-cover"
      >
        <source src={"/" + videoName} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "16px",
          color: "#666666",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={() => setMuted(!muted)}
      >
        {muted ? "Unmute" : "Mute"}
      </button>

      <main className="relative z-10">
        <Rnd
          default={{
            x: 10,
            y: 10,
            width: 320,
            height: 500,
          }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            color: "black",
            padding: "25px 25px",
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
      </main>
    </div>
  );
}
