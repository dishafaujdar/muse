import {Link} from 'react-router-dom'
import Upload from './upload';


export default function Trylink(){
    return(
        <div className="max-w-6xl mx-auto mb-5">
        <div className="mb-12">
          <span className="text-4xl font-bold text-white">
            GIVE YOUR SPACE A MAGNIFICENT LOOK ✨
          </span>
          <p className="mt-2 font-mono text-base font-semibold">
            Transform anytime in just 2 clicks! < br/>
            <button className="font-mono rounded-lg font-extrabold text-lg shadow-md p-2"><Link to="/upload" path={<Upload />}>Try it</Link> </button>
          </p>
        </div>
        </div>
    )
}