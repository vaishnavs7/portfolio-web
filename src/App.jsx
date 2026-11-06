import React, { useState, useEffect, useRef, useCallback } from 'react';

// Custom CSS for the retro font, pixel-art effects, and CRT scanlines
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  .font-retro {
    font-family: 'Press Start 2P', cursive;
    line-height: 1.5;
  }

  .pixel-border {
    box-shadow: 
      inset -4px -4px 0px 0px rgba(0,0,0,0.5),
      inset 4px 4px 0px 0px rgba(255,255,255,0.8);
    border: 4px solid #fff;
  }
  
  .pixel-border-blue {
    border: 4px solid #3b82f6;
    box-shadow: 
      inset -4px -4px 0px 0px rgba(0,0,0,0.5),
      inset 4px 4px 0px 0px rgba(147,197,253,0.8);
  }

  .pixel-border-green {
    border: 4px solid #22c55e;
    box-shadow: 
      inset -4px -4px 0px 0px rgba(0,0,0,0.5),
      inset 4px 4px 0px 0px rgba(134,239,172,0.8);
  }

  .pixel-border-gold {
    border: 4px solid #eab308;
    box-shadow: 
      inset -4px -4px 0px 0px rgba(0,0,0,0.5),
      inset 4px 4px 0px 0px rgba(253,224,71,0.8);
  }

  .pixel-border-purple {
    border: 4px solid #a855f7;
    box-shadow: 
      inset -4px -4px 0px 0px rgba(0,0,0,0.5),
      inset 4px 4px 0px 0px rgba(216,180,254,0.8);
  }
  
  .pixel-border-red {
    border: 4px solid #ef4444;
    box-shadow: 
      inset -4px -4px 0px 0px rgba(0,0,0,0.5),
      inset 4px 4px 0px 0px rgba(252,165,165,0.8);
  }

  .hover-float:hover {
    transform: translateY(-4px);
  }

  .blink {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% { opacity: 0; }
  }

  /* CRT Scanline Effect */
  .crt::before {
    content: " ";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 100;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
    border-left: 2px solid #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border: 2px solid #000;
  }
`;

const techQuestions = [
  // --- Existing Questions ---
  { q: "What is the default scope of a Spring Bean?", options: ["Prototype", "Singleton", "Request", "Session"], ans: 1 },
  { q: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Just Virtual Memory", "Java Visual Machine"], ans: 0 },
  { q: "Which HTTP method is typically used to create a resource?", options: ["GET", "PUT", "POST", "DELETE"], ans: 2 },
  { q: "In Java, which keyword is used to inherit a class?", options: ["implements", "inherits", "extends", "super"], ans: 2 },
  { q: "What is the time complexity of searching in a Balanced BST?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], ans: 2 },
  { q: "Which of these is NOT a valid SQL join?", options: ["INNER JOIN", "LEFT JOIN", "TOP JOIN", "FULL OUTER JOIN"], ans: 2 },
  { q: "In Kubernetes, what is the smallest deployable computing unit?", options: ["Container", "Node", "Pod", "Cluster"], ans: 2 },
  { q: "Which microservices pattern is used to manage distributed transactions across multiple services?", options: ["API Gateway", "Circuit Breaker", "Bulkhead", "Saga Pattern"], ans: 3 },
  { q: "What is the primary purpose of a Kafka Consumer Group?", options: ["To encrypt messages", "Parallel consumption of a topic", "To produce messages faster", "To store topic partitions"], ans: 1 },
  { q: "Which GraphQL operation is specifically used to modify server-side data?", options: ["Query", "Mutation", "Subscription", "Fragment"], ans: 1 },
  { q: "Which Spring Boot annotation is used to handle exceptions globally across all controllers?", options: ["@ControllerAdvice", "@ExceptionHandler", "@GlobalError", "@WebFilter"], ans: 0 },
  { q: "In Java 8 Streams, which intermediate operation is used to transform data into another object?", options: ["filter()", "reduce()", "map()", "forEach()"], ans: 2 },
  { q: "Which Apigee policy is typically used to protect backend services against severe traffic spikes?", options: ["OAuthV2", "VerifyJWT", "Spike Arrest", "JSONThreatProtection"], ans: 2 },
  { q: "What is the core benefit of the Circuit Breaker pattern in microservices?", options: ["Faster database queries", "Preventing cascading failures", "Routing traffic to endpoints", "Encrypting API responses"], ans: 1 },
  { q: "Which design pattern restricts the instantiation of a class to one 'single' instance?", options: ["Factory", "Observer", "Singleton", "Decorator"], ans: 2 },
  { q: "In Docker, what file contains the instructions to build an image?", options: ["docker-compose.yml", "Dockerfile", ".dockerignore", "image.json"], ans: 1 }
];

const StartScreen = ({ onStart }) => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-retro text-white p-4 text-center">
    <h1 className="text-4xl md:text-6xl text-yellow-400 mb-8 blink drop-shadow-[4px_4px_0_rgba(220,38,38,1)]">
      VAISHNAV S
    </h1>
    <h2 className="text-xl md:text-2xl text-blue-400 mb-12 leading-relaxed">JAVA BACKEND DEVELOPER</h2>
    
    <button 
      onClick={onStart}
      className="mt-8 px-8 py-4 bg-red-600 text-white text-xl pixel-border hover:bg-red-500 active:bg-red-700 transition-colors"
    >
      PRESS START
    </button>
    <p className="mt-8 text-gray-400 text-xs md:text-sm">CLICK ITEMS & EXPLORE TO LEVEL UP</p>
  </div>
);

const HUD = ({ score, level, isMuted, toggleMute }) => {
  const xpForNextLevel = level * 500;
  const progress = Math.min(100, Math.floor((score / xpForNextLevel) * 100));
  
  return (
    <div className="sticky top-0 z-40 w-full bg-black/95 border-b-4 border-white p-4 flex flex-col font-retro text-white gap-4 backdrop-blur-sm">
      <div className="w-full text-center text-yellow-300 text-[10px] md:text-xs blink border-b border-gray-700 pb-2">
        ACTIVE QUEST: Defeat the Legacy Monolith & Deploy to Production
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-yellow-400 text-[10px]">SCORE</span>
            <span className="text-xl">{score.toString().padStart(5, '0')}</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-cyan-400 text-[10px]">LVL</span>
            <span className="text-xl">{level}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={toggleMute}
            className="text-lg hover:scale-110 transition-transform cursor-pointer mr-2"
            title={isMuted ? "Unmute Music" : "Mute Music"}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <span className="text-green-400 text-xs whitespace-nowrap">EXP:</span>
          <div className="w-full md:w-64 h-6 border-2 border-white bg-gray-800 p-0.5 relative">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Collectible = ({ item, onCollect, points, type = 'skill', onViewDetails }) => {
  const [collected, setCollected] = useState(false);

  const handleClick = () => {
    if (!collected) {
      setCollected(true);
      onCollect(points);
    }
    if (onViewDetails) {
      onViewDetails(item);
    }
  };

  const getStyle = () => {
    if (type === 'skill') return 'bg-blue-900 text-blue-100 pixel-border-blue';
    if (type === 'exp') return 'bg-green-900 text-green-100 pixel-border-green';
    if (type === 'main-quest') return 'bg-yellow-900 text-yellow-100 pixel-border-gold';
    if (type === 'side-quest') return 'bg-purple-900 text-purple-100 pixel-border-purple';
    if (type === 'charisma') return 'bg-red-900 text-red-100 pixel-border-red';
    return 'bg-gray-800 text-white pixel-border';
  };

  return (
    <button
      onClick={handleClick}
      disabled={collected && !onViewDetails}
      className={`
        p-4 text-left font-retro text-xs md:text-sm transition-all duration-300 w-full
        ${getStyle()}
        ${collected ? 'opacity-75 cursor-pointer transform scale-95 border-gray-600' : 'hover-float cursor-pointer hover:brightness-110'}
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="leading-snug">
          {collected && <span className="text-green-400 mr-2">✓</span>}
          {item.title}
        </div>
        {!collected && <span className="text-yellow-400 text-[10px] whitespace-nowrap">+{points}</span>}
      </div>
      {item.tech && (
        <div className="text-[9px] text-cyan-300 mb-2">[{item.tech}]</div>
      )}
      {item.description && (
        <div className="text-[10px] text-gray-300 leading-relaxed line-clamp-2">
          {item.description}
        </div>
      )}
      {item.details && (
        <div className="text-[8px] text-yellow-500 mt-3 blink">CLICK FOR LOGS</div>
      )}
    </button>
  );
};

const DetailsModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <div className="bg-black pixel-border-blue p-6 max-w-2xl w-full font-retro text-white max-h-[80vh] overflow-y-auto shadow-[0_0_20px_rgba(59,130,246,0.5)]">
        <div className="flex justify-between items-start mb-6 border-b-2 border-gray-700 pb-4">
          <h2 className="text-yellow-400 text-lg md:text-xl leading-relaxed pr-4">{item.title}</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-400 text-2xl font-bold bg-gray-900 px-3 py-1 pixel-border">X</button>
        </div>
        {item.tech && <div className="text-cyan-400 text-xs md:text-sm mb-6">TECH EQUIPPED: [{item.tech}]</div>}
        <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
          {item.details ? (
            <ul className="list-disc pl-6 space-y-4 text-left">
              {item.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
            </ul>
          ) : (
            <p>{item.description}</p>
          )}
        </div>
        <div className="mt-8 text-center pt-4 border-t-2 border-gray-700">
          <button onClick={onClose} className="px-8 py-3 bg-blue-900 text-white pixel-border hover:bg-blue-800 transition-colors">ACKNOWLEDGE</button>
        </div>
      </div>
    </div>
  );
};

const EncounterModal = ({ encounter, onResolve }) => {
  if (!encounter) return null;

  const handleAnswer = (idx) => {
    if (idx === encounter.ans) {
      onResolve(100, "CORRECT! +100 XP");
    } else {
      onResolve(0, "WRONG! The encounter faded away.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-black pixel-border-red p-6 max-w-lg w-full font-retro text-white animate-pulse-fast shadow-[0_0_20px_rgba(220,38,38,0.5)]">
        <h2 className="text-red-500 mb-4 text-lg md:text-xl blink">! RANDOM ENCOUNTER !</h2>
        <p className="text-xs md:text-sm mb-6 leading-relaxed">{encounter.q}</p>
        <div className="flex flex-col gap-3">
          {encounter.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="p-3 text-left bg-gray-900 pixel-border hover:bg-gray-700 transition-colors text-xs md:text-sm leading-snug"
            >
              {idx + 1}. {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 font-retro text-xs md:text-sm bg-black pixel-border p-4 text-yellow-400 animate-bounce shadow-lg">
      {message}
    </div>
  );
};

// --- MINI GAME LOGIC ---
const TILE_SIZE = 30;
const COLS = 20;
const ROWS = 10;

const LEVELS = [
  [ // Level 1 (Localhost)
    "####################",
    "#                  #",
    "#          C       #",
    "#         ###      #",
    "#                  #",
    "#      ###         #",
    "#                  #",
    "# P *          *D  #",
    "#####   ###  ######",
    "####################",
  ],
  [ // Level 2 (Dev)
    "####################",
    "#                  #",
    "#   C        C     #",
    "#  ###      ###    #",
    "#                  #",
    "#        *         #",
    "#       ###        #",
    "# P  *       *   D #",
    "#### ####### ##### #",
    "####################",
  ],
  [ // Level 3 (Staging)
    "####################",
    "#                  #",
    "#         C        #",
    "#         #        #",
    "#   C           C  #",
    "#  ##          ##  #",
    "#                  #",
    "# P *  *   *  *  D #",
    "### #  #   #  #  ###",
    "####################",
  ],
  [ // Level 4 (Production)
    "####################",
    "#                  #",
    "#  C        C    C #",
    "# ##       ##   ## #",
    "#                  #",
    "#    #  *  #       #",
    "#   ########       #",
    "# P *   *   *    D #",
    "### #   #   #  #####",
    "####################",
  ]
];

const levelSpecificDeathReasons = {
  0: ["Port 8080 already in use!", "Docker daemon not running!", "Missing application-local.yml!", "Works on my machine!"],
  1: ["Kafka broker connection refused!", "SonarQube quality gate failed!", "JPA ObjectMappingException!", "Merge conflict in pom.xml!"],
  2: ["Missing config on Helms!", "Apigee Gateway routing failed!", "Failed UAT due to unfeasible user story!", "Integration tests failed!"],
  3: ["OOMKilled: Pod Memory Exceeded!", "SWIFT integration timeout!", "Merge Conflict in Prod!", "Microservice latency spiked to 5000ms!"]
};

const levelNames = ["Localhost", "Dev", "Staging", "Production"];

const DangerousDeployer = ({ onAddScore, setIsGameActive }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAME_OVER, VICTORY
  const [currentLevel, setCurrentLevel] = useState(0);
  const [deathReason, setDeathReason] = useState("");
  
  const engine = useRef({
     player: { x: 50, y: 50, vx: 0, vy: 0, w: 16, h: 30, speed: 4, jump: -10, grounded: false, facingLeft: false },
     walls: [], bugs: [], commits: [], door: null,
     reqCommits: 0, colCommits: 0,
     state: 'START',
     level: 0
  }).current;

  const keys = useRef({});
  const reqRef = useRef();

  const loadLevel = useCallback((lvl) => {
     engine.walls = []; engine.bugs = []; engine.commits = []; 
     engine.reqCommits = 0; engine.colCommits = 0;
     const map = LEVELS[lvl];
     for(let r=0; r<ROWS; r++){
        for(let c=0; c<COLS; c++){
           const tile = map[r][c];
           const x = c * TILE_SIZE;
           const y = r * TILE_SIZE;
           if(tile === '#') engine.walls.push({x,y,w:TILE_SIZE,h:TILE_SIZE});
           if(tile === '*') engine.bugs.push({x,y:y+15,w:TILE_SIZE,h:15}); // Half height for bugs
           if(tile === 'C') { engine.commits.push({x:x+5,y:y+5,w:20,h:20,active:true}); engine.reqCommits++; }
           if(tile === 'D') engine.door = {x,y,w:TILE_SIZE,h:TILE_SIZE};
           if(tile === 'P') engine.player = { x: x+5, y: y, vx: 0, vy: 0, w: 16, h: 30, speed: 4, jump: -10, grounded: false, facingLeft: false };
        }
     }
  }, [engine]);

  const checkColl = (r1, r2) => {
     return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
  };

  const loop = useCallback(() => {
     if (engine.state !== 'PLAYING') {
         draw();
         reqRef.current = requestAnimationFrame(loop);
         return;
     }

     // Physics & Input
     let p = engine.player;
     if (keys.current['ArrowLeft'] || keys.current['KeyA']) {
         p.vx = -p.speed;
         p.facingLeft = true;
     } else if (keys.current['ArrowRight'] || keys.current['KeyD']) {
         p.vx = p.speed;
         p.facingLeft = false;
     } else p.vx = 0;

     if ((keys.current['ArrowUp'] || keys.current['KeyW'] || keys.current['Space']) && p.grounded) {
        p.vy = p.jump;
        p.grounded = false;
     }

     p.vy += 0.5; // Gravity
     
     // X Collision
     p.x += p.vx;
     for (let w of engine.walls) {
        if (checkColl(p, w)) {
           if (p.vx > 0) p.x = w.x - p.w;
           else if (p.vx < 0) p.x = w.x + w.w;
           p.vx = 0;
        }
     }
     
     // Y Collision
     p.y += p.vy;
     p.grounded = false;
     for (let w of engine.walls) {
        if (checkColl(p, w)) {
           if (p.vy > 0) { p.y = w.y - p.h; p.grounded = true; } 
           else if (p.vy < 0) { p.y = w.y + w.h; }
           p.vy = 0;
        }
     }
     
     const triggerGameOver = () => {
        engine.state = 'GAME_OVER';
        setGameState('GAME_OVER');
        setIsGameActive(false);
        const reasons = levelSpecificDeathReasons[engine.level] || ["Unknown Server Error!"];
        setDeathReason(reasons[Math.floor(Math.random() * reasons.length)]);
     };

     // Death Conditions
     if (p.y > ROWS * TILE_SIZE) triggerGameOver();
     for (let b of engine.bugs) {
        if (checkColl(p, b)) triggerGameOver();
     }
     
     // Commit Collection
     for (let c of engine.commits) {
        if (c.active && checkColl(p, c)) {
           c.active = false;
           engine.colCommits++;
           onAddScore(50);
        }
     }
     
     // Door / Win Condition
     if (engine.door && checkColl(p, engine.door) && engine.colCommits >= engine.reqCommits) {
        if (engine.level >= LEVELS.length - 1) {
           engine.state = 'VICTORY';
           setGameState('VICTORY');
           setIsGameActive(false);
        } else {
           engine.level++;
           engine.state = 'START'; 
           setCurrentLevel(engine.level);
           setGameState('START');
           setIsGameActive(false);
        }
     }

     draw();
     reqRef.current = requestAnimationFrame(loop);
  }, [engine, onAddScore, setIsGameActive]);

  const draw = () => {
     const ctx = canvasRef.current?.getContext('2d');
     if (!ctx) return;
     ctx.clearRect(0, 0, COLS*TILE_SIZE, ROWS*TILE_SIZE);
     
     // Draw Walls
     ctx.fillStyle = '#1e293b'; 
     engine.walls.forEach(w => {
         ctx.fillRect(w.x, w.y, w.w, w.h);
         ctx.strokeStyle = '#334155';
         ctx.strokeRect(w.x, w.y, w.w, w.h);
     });
     
     // Draw Bugs (Green Pixel Art)
     engine.bugs.forEach(b => {
         ctx.fillStyle = '#10b981'; // body
         ctx.fillRect(b.x + 6, b.y + 4, 18, 10);
         ctx.fillStyle = '#ef4444'; // eyes
         ctx.fillRect(b.x + 8, b.y + 6, 3, 3);
         ctx.fillRect(b.x + 19, b.y + 6, 3, 3);
         ctx.fillStyle = '#047857'; // legs
         ctx.fillRect(b.x + 2, b.y + 6, 4, 2); 
         ctx.fillRect(b.x + 24, b.y + 6, 4, 2);
     });
     
     // Draw Door
     ctx.fillStyle = '#d946ef'; // magenta
     if (engine.door) {
         ctx.globalAlpha = (engine.colCommits >= engine.reqCommits) ? 1.0 : 0.3;
         ctx.fillRect(engine.door.x, engine.door.y, engine.door.w, engine.door.h);
         ctx.globalAlpha = 1.0;
         
         // Door Details
         ctx.fillStyle = '#4a044e';
         ctx.fillRect(engine.door.x + 5, engine.door.y + 5, engine.door.w - 10, engine.door.h - 5);
     }

     // Draw Commits (Yellow Coins)
     ctx.fillStyle = '#eab308'; // yellow
     engine.commits.forEach(c => {
        if (c.active) {
            ctx.beginPath();
            ctx.arc(c.x + c.w/2, c.y + c.h/2, c.w/2, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(c.x + c.w/2 - 2, c.y + c.h/2 - 2, c.w/4, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = '#eab308';
        }
     });
     
     // Draw Player (Dave Clone)
     ctx.save();
     ctx.translate(engine.player.x + engine.player.w / 2, engine.player.y + engine.player.h / 2);
     if (engine.player.facingLeft) ctx.scale(-1, 1);
     ctx.translate(-engine.player.w / 2, -engine.player.h / 2);
     
     // Hat (red)
     ctx.fillStyle = '#ef4444';
     ctx.fillRect(2, 0, 10, 4); 
     ctx.fillRect(2, 4, 14, 4);
     // Face (skin)
     ctx.fillStyle = '#fcd34d';
     ctx.fillRect(4, 8, 8, 8);
     // Eye (black)
     ctx.fillStyle = '#000';
     ctx.fillRect(8, 10, 2, 2);
     // Shirt (red)
     ctx.fillStyle = '#ef4444';
     ctx.fillRect(3, 16, 10, 8);
     // Pants (blue)
     ctx.fillStyle = '#2563eb';
     ctx.fillRect(3, 24, 10, 4);
     // Shoes (brown)
     ctx.fillStyle = '#78350f';
     ctx.fillRect(2, 28, 5, 2);
     ctx.fillRect(8, 28, 5, 2);
     
     ctx.restore();
  };

  useEffect(() => {
     const handleKD = (e) => { 
         keys.current[e.code] = true; 
         // Prevent default scrolling for game keys if game is active
         if (engine.state === 'PLAYING' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
     };
     const handleKU = (e) => { keys.current[e.code] = false; };
     window.addEventListener('keydown', handleKD, { passive: false });
     window.addEventListener('keyup', handleKU);
     
     reqRef.current = requestAnimationFrame(loop);
     
     return () => {
         window.removeEventListener('keydown', handleKD);
         window.removeEventListener('keyup', handleKU);
         cancelAnimationFrame(reqRef.current);
     };
  }, [loop, engine.state]);

  const startGame = () => {
     if (engine.state === 'GAME_OVER' || engine.state === 'VICTORY') {
         engine.level = 0;
         setCurrentLevel(0);
     }
     loadLevel(engine.level);
     engine.state = 'PLAYING';
     setGameState('PLAYING');
     setIsGameActive(true);
  };

  return (
    <section className="pixel-border-red bg-black p-6 md:p-8 relative mt-16 border-4 border-red-600 text-center flex flex-col items-center">
      <div className="absolute -top-4 left-4 bg-black px-2 text-red-500 border-2 border-red-500 text-xs md:text-sm">
        DANGEROUS DEPLOYER
      </div>
      
      <h2 className="text-xl md:text-2xl text-red-500 mb-2 mt-4">DANGEROUS DEPLOYER</h2>
      <p className="text-[10px] md:text-xs text-gray-400 mb-4 max-w-lg leading-relaxed">
        WASD/Arrows to Move & Jump. Collect all yellow Commits to unlock the Magenta Deploy Door. Avoid Green Bugs!
      </p>
      
      <div className="relative inline-block border-4 border-gray-700 w-full max-w-[600px] aspect-[2/1] bg-gray-900 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
         <canvas 
           ref={canvasRef} 
           width={COLS * TILE_SIZE} 
           height={ROWS * TILE_SIZE} 
           className="block w-full h-full" 
           style={{imageRendering: 'pixelated'}} 
         />
         
         {gameState !== 'PLAYING' && (
             <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center font-retro p-4 text-center z-10">
                 {gameState === 'START' && (
                     <>
                         <h3 className="text-white mb-2 text-sm md:text-base">LEVEL {currentLevel + 1}</h3>
                         <h4 className="text-cyan-400 mb-6 text-xs md:text-sm">{levelNames[currentLevel]}</h4>
                         <button onClick={startGame} className="px-4 py-3 bg-blue-600 text-white pixel-border hover:bg-blue-500 text-xs md:text-sm transition-colors">START DEPLOYMENT</button>
                     </>
                 )}
                 {gameState === 'GAME_OVER' && (
                     <>
                         <h3 className="text-red-500 blink mb-4 text-sm md:text-base">PROD ISSUE! GAME OVER</h3>
                         <p className="text-yellow-400 text-[10px] md:text-xs mb-6 max-w-[80%] leading-relaxed">{deathReason}</p>
                         <button onClick={startGame} className="px-4 py-3 bg-red-600 text-white pixel-border hover:bg-red-500 text-xs md:text-sm transition-colors">RETRY</button>
                     </>
                 )}
                 {gameState === 'VICTORY' && (
                     <>
                         <h3 className="text-green-400 blink mb-4 text-sm md:text-base">ALL ENVIRONMENTS DEPLOYED!</h3>
                         <p className="text-white text-[10px] md:text-xs mb-6">Zero downtime achieved.</p>
                         <button onClick={startGame} className="px-4 py-3 bg-green-600 text-white pixel-border hover:bg-green-500 text-xs md:text-sm transition-colors">PLAY AGAIN</button>
                     </>
                 )}
             </div>
         )}
      </div>
    </section>
  );
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [encounter, setEncounter] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Audio State and Ref
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Inject global styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  // Safe Audio Playback Effect
  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Autoplay was prevented:", error);
          showToast("Audio autoplay blocked by browser. Check console.");
        });
      }
    }
  }, [started]);

  // Update level when score changes
  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      showToast(`LEVEL UP! YOU ARE NOW LEVEL ${newLevel}`);
    }
  }, [score, level]);

  // Random Encounter Logic (Interval-based)
  useEffect(() => {
    if (!started || encounter || isGameActive) return;
    
    // Random interval between 45s and 60s
    const delay = Math.floor(Math.random() * (60000 - 45000 + 1)) + 45000;
    
    const timer = setTimeout(() => {
      const q = techQuestions[Math.floor(Math.random() * techQuestions.length)];
      setEncounter(q);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [started, encounter, isGameActive]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleCollect = (points) => {
    setScore(prev => prev + points);
    showToast(`COLLECTED +${points} XP`);
  };

  const handleEncounterResolve = (points, msg) => {
    setEncounter(null);
    if (points > 0) {
      setScore(prev => prev + points);
    }
    showToast(msg);
  };

  // Handle Game Start - simply update state, useEffect will handle audio
  const handleStart = () => {
    setStarted(true);
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    const nextMutedState = !isMuted;
    setIsMuted(nextMutedState);
    if (audioRef.current) {
      audioRef.current.muted = nextMutedState;
    }
  };

  // --- RESUME DATA ---
  const experience = [
    {
      title: "Tech Associate (Backend) | Acabes",
      tech: "Sep 2023 - Present",
      description: "Architect enterprise Java/Spring Boot microservices for Arab Bank.",
      details: [
        "Architect enterprise-grade Java/Spring Boot microservices for Arab Bank, serving 300K+ active users across MENA and Europe.",
        "Lead a 4-member backend squad delivering high-availability microservices for corporate and retail banking.",
        "Improved transaction processing speed by 30% by implementing Kafka event-driven architecture.",
        "Integrated legacy banking systems via SOAP/XML and modernized them into RESTful layers using Apigee.",
        "Led backend architecture for Arab Bank Jordan SME Onboarding, integrating government APIs.",
        "Built secure payment infrastructure for Arab National Bank, facilitating $200M+ in transactions within 3 months.",
        "Configured Apigee policies (traffic throttling, OAuth 2.0 security, transformation) for 50+ microservices."
      ]
    },
    {
      title: "Research Intern | Aster Medicity",
      tech: "Sep 2022 - Aug 2023",
      description: "Built a VR life-skills training kit for children with autism.",
      details: [
        "Built a VR life-skills training kit for children with autism using C# and Unity, delivering 5+ interactive scenarios.",
        "Collaborated with medical professionals to translate clinical requirements into technical specifications."
      ]
    }
  ];

  const skills = [
    { title: "FRONTEND CORE", tech: "React, HTML5, CSS3, Tailwind", description: "Building interactive, responsive user interfaces." },
    { title: "UI/UX DESIGN", tech: "Figma, User Research", description: "Crafting intuitive and accessible user experiences." },
    { title: "LANGUAGES", tech: "Java (8-21), JS/TS, Python, C#", description: "Polyglot programming for diverse systems." },
    { title: "BACKEND STACK", tech: "Spring Boot, Spring Batch, Node.js", description: "Developing robust, scalable microservices." },
    { title: "DATABASES (SQL)", tech: "PostgreSQL, Oracle, MySQL", description: "Relational data modeling and optimization." },
    { title: "NOSQL & SEARCH", tech: "MongoDB, Elasticsearch", description: "Handling document stores and search indices." },
    { title: "DEVOPS & CLOUD", tech: "Docker, K8s, Jenkins", description: "Containerization and CI/CD pipelines." },
    { title: "ARCHITECTURE", tech: "Microservices, Kafka, Apigee API, GraphQL", description: "Designing event-driven and secure gateways, utilizing GraphQL to optimize frontend data management and orchestrate multiple service calls." },
    { title: "GAME DEV", tech: "Unity, Blender, Canvas 2D", description: "Creating immersive 3D/2D interactive experiences." }
  ];

  const leadership = [
    {
      title: "Public Speaker & Secretary",
      tech: "IEEE SSIT Kerala Chapter",
      description: "Organize & speak at meetups, hackathons, and workshops for 500+ members."
    },
    {
      title: "Global Vice Chair",
      tech: "IEEE SSIT Global Student Activities",
      description: "Managed 25+ international volunteers for global conferences."
    },
    {
      title: "Tech Mentor",
      tech: "IEEE Kerala Section",
      description: "Supervise interns in scalable web architecture and guide project development."
    }
  ];

  const mainQuests = [
    { 
      title: "Arab Bank Iraq - Digital Core", 
      tech: "Spring Boot, Apigee, Kafka, PostgreSQL",
      description: "Engineered customer onboarding workflow, RBAC, and payment orchestration.",
      details: [
        "Engineered an end-to-end customer onboarding module driven by a custom workflow engine and BPM automation.",
        "Designed a User Management System with role-based access control (RBAC) and high-concurrency credential provisioning.",
        "Built a payment orchestration engine supporting real-time transactions and high-volume data validation.",
        "Developed Beneficiary Management integrated with cross-border SWIFT payments and regulatory compliance screening."
      ]
    },
    { 
      title: "Arab Bank Europe - Mobile App & Internet Banking", 
      tech: "Apigee, Spring Boot, Kafka, MongoDB",
      description: "Architected high-throughput gateway for real-time SEPA/cross-border flows.",
      details: [
        "Developed microservices for Internet Banking rollout: salary processing, beneficiary management and card systems.",
        "Architected a high-throughput Instant Payments gateway for real-time SEPA/cross-border flows with sub-second clearing latency.",
        "Built bulk payment rails, NPS survey modules, push notification services and cross-channel data synchronization."
      ]
    },
    { 
      title: "Arabi Next - SME Onboarding", 
      tech: "Spring Batch, Kafka, MongoDB",
      description: "Built automated instant loan decision engine and backend data processing platform.",
      details: [
        "Engineered backend for a fully digital onboarding platform using Spring Batch for high-volume data processing.",
        "Secured APIs on Apigee with Spike Arrest and OAuth 2.0 policies; integrated government SOAP APIs and OCR extraction for entity verification.",
        "Built an automated instant loan decision engine using CRIF data and internal credit policies."
      ]
    },
    { 
      title: "Arab Bank Mobile App Revamp", 
      tech: "Spring Boot, Apigee, MongoDB, SOAP, GraphQL",
      description: "Developed backend modules for e-vouchers and P2P payments.",
      details: [
        "Developed backend modules for e-vouchers, loyalty points transfer and peer-to-peer (P2P) payments.",
        "Designed high-concurrency Instant Loan and Credit Card Issuance services with real-time credit checks.",
        "Implemented GraphQL endpoints for dashboard reporting, reducing frontend API calls."
      ]
    },
    { 
      title: "OMNIFY - BaaS", 
      tech: "Spring Boot, Apigee, Kafka, Virtual IBANs",
      description: "Developed bulk payment engine supporting Virtual IBANs.",
      details: [
        "Developed a bulk payment processing engine for UAE/Jordan markets supporting Virtual IBANs, with cross-border logic and SWIFT transaction screening."
      ]
    }
  ];

  const sideQuests = [
    { 
      title: "Thonnal / Maathra", 
      tech: "Node.js, Flutter",
      description: "Developed a mobile date-planning app featuring vibe quizzes, 3-act narrative plans, and spot recommendations." 
    },
    { 
      title: "Phishing Link Analyzer", 
      tech: "Java, Spring Boot, Redis",
      description: "Built a browser plugin backend with field-level PII encryption and asynchronous antivirus scanning." 
    },
    { 
      title: "VR Autism Training Kit", 
      tech: "C#, Unity, Blender",
      description: "Created 5+ interactive VR life-skills scenarios to aid children with autism spectrum disorder." 
    },
    {
      title: "MelodyMuse",
      tech: "JavaScript",
      description: "A music recommendation add-on created for Google Chrome. It uses Javascript and last.fm api for the operation."
    },
    {
      title: "email-ms",
      tech: "Java Backend",
      description: "Email service which sends HTML Email in which template is stored in db with dynamic support."
    },
    {
      title: "uam",
      tech: "Java",
      description: "User Access Management service in Java."
    },
    {
      title: "dms",
      tech: "Java",
      description: "Document Management System service in Java."
    },
    {
      title: "flappybird",
      tech: "Python",
      description: "Python clone of the classic Flappy Bird game."
    },
    {
      title: "PasswordGenerator",
      tech: "JavaScript",
      description: "A JavaScript tool to generate secure passwords."
    },
    {
      title: "Personal-Information-System",
      tech: "PHP",
      description: "A PHP personal information management system."
    }
  ];

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/retro-bgm.mp3" 
        loop 
        preload="auto" 
        muted={isMuted} 
        style={{ display: 'none' }}
      />

      {!started ? (
        <div className="crt min-h-screen bg-black">
          <StartScreen onStart={handleStart} />
        </div>
      ) : (
        <div className="crt min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black text-white font-retro pb-20 relative">
          
          <HUD score={score} level={level} isMuted={isMuted} toggleMute={toggleMute} />
          
          <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-16 mt-8 relative z-10">
            
            {/* HERO SECTION */}
            <section className="pixel-border bg-gray-900 p-6 md:p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-red-500 border-2 border-red-500 text-xs md:text-sm">
                HERO STATS
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6 border-4 border-double border-green-500 p-4 bg-black/80">
                <img 
                  src="/avatar.jpg" 
                  alt="Vaishnav S Pixel Avatar" 
                  className="w-32 h-40 md:w-48 md:h-64 object-cover border-4 border-yellow-400 pixelated"
                />
                <div className="flex-1 space-y-4 text-xs md:text-sm w-full">
                  <div className="flex justify-between border-b-2 border-gray-700 pb-2">
                    <span className="text-gray-400">NAME:</span>
                    <span className="text-white">Vaishnav S</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-700 pb-2">
                    <span className="text-gray-400">CLASS:</span>
                    <span className="text-cyan-400">Backend Wizard & UI/UX</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-700 pb-2">
                    <span className="text-gray-400">FACTION:</span>
                    <span className="text-red-400">Java Guild</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-gray-700 pb-2">
                    <span className="text-gray-400">SPECIALTY:</span>
                    <span className="text-green-400">Fintech, Core Banking, Game Dev</span>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section className="pixel-border-gold bg-yellow-950 p-6 md:p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-yellow-400 border-2 border-yellow-400 text-xs md:text-sm">
                PROFESSIONAL EXPERIENCE
              </div>
              <p className="text-[10px] text-gray-400 mb-6 mt-4">Corporate Guild Contributions (Click for details)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.map((exp, idx) => (
                  <Collectible 
                    key={idx} 
                    item={exp} 
                    points={300} 
                    onCollect={handleCollect}
                    onViewDetails={setSelectedItem}
                    type="main-quest"
                  />
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section className="pixel-border-blue bg-blue-950 p-6 md:p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-blue-400 border-2 border-blue-400 text-xs md:text-sm">
                SKILLS INVENTORY
              </div>
              <p className="text-[10px] text-gray-400 mb-6 mt-4">Equip tools to build your arsenal.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, idx) => (
                  <Collectible 
                    key={idx} 
                    item={skill} 
                    points={50} 
                    onCollect={handleCollect}
                    onViewDetails={setSelectedItem}
                    type="skill"
                  />
                ))}
              </div>
            </section>

            {/* LEADERSHIP & SPEAKING */}
            <section className="pixel-border-red bg-red-950 p-6 md:p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-red-400 border-2 border-red-400 text-xs md:text-sm">
                LEADERSHIP & SPEAKING
              </div>
              <p className="text-[10px] text-gray-400 mb-6 mt-4">Charisma Checks - Community Roles</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leadership.map((item, idx) => (
                  <Collectible 
                    key={idx} 
                    item={item} 
                    points={120} 
                    onCollect={handleCollect}
                    onViewDetails={setSelectedItem}
                    type="charisma"
                  />
                ))}
              </div>
            </section>

            {/* MAIN QUESTS (INDUSTRIAL) */}
            <section className="pixel-border-gold bg-yellow-950 p-6 md:p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-yellow-400 border-2 border-yellow-400 text-xs md:text-sm">
                MAIN QUESTS
              </div>
              <p className="text-[10px] text-gray-400 mb-6 mt-4">Industrial Projects (Click for details)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mainQuests.map((quest, idx) => (
                  <Collectible 
                    key={idx} 
                    item={quest} 
                    points={200} 
                    onCollect={handleCollect}
                    onViewDetails={setSelectedItem}
                    type="main-quest"
                  />
                ))}
              </div>
            </section>

            {/* SIDE QUESTS (HOBBY & GITHUB) */}
            <section className="pixel-border-purple bg-purple-950 p-6 md:p-8 relative">
              <div className="absolute -top-4 left-4 bg-black px-2 text-purple-400 border-2 border-purple-400 text-xs md:text-sm">
                SIDE QUESTS
              </div>
              <p className="text-[10px] text-gray-400 mb-6 mt-4">Hobby Projects & GitHub Repositories (Click for details)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sideQuests.map((quest, idx) => (
                  <Collectible 
                    key={idx} 
                    item={quest} 
                    points={100} 
                    onCollect={handleCollect}
                    onViewDetails={setSelectedItem}
                    type="side-quest"
                  />
                ))}
              </div>
            </section>

            {/* DANGEROUS DEPLOY MINI GAME */}
            <DangerousDeployer 
              onAddScore={handleCollect} 
              setIsGameActive={setIsGameActive}
            />

            {/* CONTACT TERMINAL */}
            <section className="pixel-border-green bg-green-950 p-6 md:p-8 relative mt-16 mb-8 text-center">
              <div className="absolute -top-4 left-4 bg-black px-2 text-green-400 border-2 border-green-400 text-xs md:text-sm">
                LEVEL 5: CONNECT
              </div>
              <p className="text-[10px] md:text-xs text-gray-400 mb-8 mt-4">Initialize connection protocol... Secure comm channels open.</p>
              <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
                <a href="https://github.com/vaishnavs7" target="_blank" rel="noreferrer" className="px-4 py-3 bg-gray-900 text-white pixel-border hover:bg-gray-800 transition-colors hover-float flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-lg">🐙</span> GITHUB
                </a>
                <a href="https://linkedin.com/in/vaishnav-s" target="_blank" rel="noreferrer" className="px-4 py-3 bg-gray-900 text-white pixel-border hover:bg-gray-800 transition-colors hover-float flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-lg">💼</span> LINKEDIN
                </a>
                <a href="https://leetcode.com/u/vaishnavs7/" target="_blank" rel="noreferrer" className="px-4 py-3 bg-gray-900 text-yellow-500 pixel-border hover:bg-gray-800 transition-colors hover-float flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-lg">⚔️</span> LEETCODE
                </a>
                <a href="https://instagram.com/s_vaishnav7" target="_blank" rel="noreferrer" className="px-4 py-3 bg-gray-900 text-pink-400 pixel-border hover:bg-gray-800 transition-colors hover-float flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-lg">📸</span> INSTAGRAM
                </a>
                <a href="https://wa.me/919074923949" target="_blank" rel="noreferrer" className="px-4 py-3 bg-gray-900 text-green-400 pixel-border hover:bg-gray-800 transition-colors hover-float flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-lg">💬</span> WHATSAPP
                </a>
              </div>
            </section>

          </main>

          {/* Overlays & Modals */}
          <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
          <EncounterModal encounter={encounter} onResolve={handleEncounterResolve} />
          <Toast message={toastMsg} />

        </div>
      )}
    </>
  );
}