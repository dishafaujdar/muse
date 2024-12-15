export default function About() {
  return (
    <div className="container h-min mx-5 mb-5 p-9 flex flex-col items-center">
      <div className="text-center font-semibold mb-4">
      Welcome to Muse – Redesign Your Space, Effortlessly 🌟
      <br />
        Transforming your home has never been this simple. With just three intuitive clicks, MoodMuse guides you to the design you’ve always dreamed of—perfectly tailored to your taste, your lifestyle, and your space. Whether you crave a sanctuary of calm or a statement of bold modernity, we make it easy to bring your vision to life. 
        <br />No guesswork, no hassle—just beautiful design that feels unmistakably you
        <br />
        Let Muse inspire your journey. Ready to begin? Let’s create something extraordinary. 🏡✨
        </div>
      <svg
        width="100%"
        height="100"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="animated-wave"
      >
        <path
          d="M0,50 Q250,0 500,50 T1000,50"
          fill="transparent"
          stroke="white"
          strokeWidth="4"
        />
      </svg>
    </div>

  );
}
