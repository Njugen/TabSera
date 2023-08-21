import Image from 'next/image'
import Folder from './components/folder'

export default function Home() {

  return (
    <div id="root" className="none:container h-screen w-screen bg-tbfColor-lightgrey">
      <div id="header" className="none:container mx-auto flex justify-center items-center w-full h-32 white border-b bg-white border-tbfColor-lgrey">
        test
      </div> 
      <div id="navbar" className="flex justify-center items-center h-24 mx-auto p-10">
        <a href="#" id="current-nav-link" className=" font-semibold underline mx-8 text-tbfColor-darkpurple">
          Folders
        </a>
        <a href="#" id="nav-link">
          Settings
        </a>

        
      </div>
      <div id="folders-section" className="container w-7/12 mx-auto my-10">
        <h1 className="text-4xl text-tbfColor-darkpurple font-light my-10">
          Folders
        </h1>
        <Folder type="contracted" />
      </div>
      
    </div>
  )
}