import logo from "../assets/mm.png"
import {Link} from 'react-router-dom'
import Upload from './upload';
export default function Header(){
    return(
        <div className='pt-3 pb-6 md:pb-8'>
            <div className="contanier flex items-center">
                <div className="flex-grow">
                    <div><a href="/"><img src={logo} alt="muse image" className="my-3 w-17 h-16 mx-3 rounded-md border border-gray-300 shadow-xl"></img></a></div>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="flex items-center space-x-4 font-bold font-mono">
                        <Link className="border-r border-gray-300 pr-4 space-x-2 hover:text-green-900 transition hidden sm:flex" to='/upload' path={<Upload />}><p>Redesign</p></Link>

                        <a className="border-r border-gray-300 pr-4 space-x-2 hover:text-green-900 transition hidden sm:flex" href="https://github.com/dishafaujdar/muse"><p>Github</p></a>
                    </div>  
                </div>
            </div>
        </div>
    )
}