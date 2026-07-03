
import { ImSpinner2 } from 'react-icons/im'


const Loader = ({text}:any) => {
  return (
   <div>
        
  
          <div className="max-w-6xl mx-auto py-16 text-center flex flex-col items-center justify-center gap-4">
           
            <div className="animate-spin text-[#b62126]">
              <ImSpinner2 size={40} />
            </div>
            <p className="text-gray-600 text-sm">Loading {text}...</p>
          </div>
        </div>
  )
}

export default Loader