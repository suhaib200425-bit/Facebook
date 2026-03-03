import React from "react";

import './Reel.css'
function Reel() {
 
const reelsData = [
  {
    id: 1,
    username: "Rahul K",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    username: "Anu P",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    username: "Nisha M",
    video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  },
  {
    id: 4,
    username: "Arjun S",
    video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  },
  {
    id: 5,
    username: "Fathima R",
    video: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
  },
  {
    id: 6,
    username: "Vishnu P",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 7,
    username: "Ameen T",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  },
  {
    id: 8,
    username: "Sneha L",
    video: "https://media.w3.org/2010/05/bunny/movie.mp4",
  }
];
// useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;

//           if (entry.isIntersecting) {
//             video.play();
//           } else {
//             video.pause();
//           }
//         });
//       },
//       {
//         threshold: 0.7, // 70% visible ayal mathram play
//       }
//     )
//   });
  return (
    <div className="reels-container">
      {reelsData.map((reel) => (
        <div className="reel" key={reel.id}>
          <video
            src={reel.video}
            autoPlay
            loop
            muted
            controls={false}
            className="reel-video"
          />

          {/* <div className="reel-overlay">
            <div className="reel-user">
              <strong>{reel.username}</strong>
            </div>

            <div className="reel-actions">
              <button>❤️</button>
              <button>💬</button>
              <button>🔄</button>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default Reel;