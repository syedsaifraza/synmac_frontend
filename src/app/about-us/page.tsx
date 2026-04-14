'use client'
import AboutPage from '@/components/AboutPage'
import CerrierLife from '@/components/CerrierLife'
import Header from '@/components/Header'
import SynmacTeam from '@/components/SynamcTeams'
import SynmacQualityPolicy from '@/components/SynmacQualityPolicy'
import WhoWeAre from '@/components/WhoWeAre'
import WorkingWithSynmac from '@/components/WorkingWithSynmac'


const page = () => {


  return (
    <div>
      <Header title={"About Us"} />
      <div className='text-black'>
        {/* 
     
        <SynmacTeam/>
         */}
      
        <WhoWeAre />
        <CerrierLife />
           <AboutPage />
        <SynmacQualityPolicy/>
          <WorkingWithSynmac/>
      </div>
    </div>
  )
}

export default page