import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import img5 from '../assets/img5.png'
import {Link } from 'react-router-dom';
// import Upload from './upload'

const Hero = () => {
    return (
      <div className="container mx-auto text-center py-10">
        <div className="text-center text-6xl font-mono font-semibold mb-8">
        <Link to="/upload" className="hover:ease-out"> Muse🪄 </Link>
        </div>
        <div className="flex justify-center items-center gap-6 animate-none">
          <img src={img1} alt="Muse image" className="h-60 w-60 object-cover rounded-lg shadow-lg"/> 
          <img src={img2} alt="Muse image" className="h-60 w-60 object-cover rounded-lg shadow-lg"/>
          <img src={img3} alt="Muse image" className="h-60 w-60 object-cover rounded-lg shadow-lg"/>
          <img src={img4} alt="Muse image" className="h-60 w-60 object-cover rounded-lg shadow-lg"/>
          <img src={img5} alt="Muse image" className="h-60 w-60 object-cover rounded-lg shadow-lg"/>
        </div>
      </div>
    );
  };

export default Hero;