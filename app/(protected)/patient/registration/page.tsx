import NewPatient from '@/components/ui/new-patient'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Registration = async () => {
    const {userId}=await auth()
    const data=null
    // const {data}=await getPatientDataByUserId(userId)
  return (
    <div className='py-6 px-3 flex justify-center'>
      <NewPatient data={data!} type={!data? "create" :"update"}/>
    </div>
  )
}

export default Registration
