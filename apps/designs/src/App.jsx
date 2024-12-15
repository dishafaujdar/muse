import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
// import Multer from './components/Multer';
import Hero from './components/mainsection';
import About from './components/about';
import TestimonialsSection from './components/reviews';
import Trylink from './components/trylink';
import Upload from './components/upload';

const App = () => {
  return (
    <div className="from-primary to-black my-2 container mx-auto min-h-screen bg-gradient-to-b opacity rounded-md ">
      {/* <Multer /> */}
      <Header />
      {<Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <TestimonialsSection />
              <Trylink />
            </>
          }
        />
        <Route
          path="/upload"
          element={<Upload />}
        />
      </Routes> }

      <Footer />
    </div>
  );
};

export default App;
