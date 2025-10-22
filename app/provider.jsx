"use client"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Provider({children}) {
    const {user} = useUser();
    const [userDetails, setUserDetails] = useState()
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    useEffect(()=>{
        user&&CreateNewUser()
    },[user])
    const CreateNewUser=async()=>{
        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        })
        console.log(result.data)
        setUserDetails(result.data)
    }
  return (
    <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>

      <SelectedChapterIndexContext.Provider value={{selectedChapterIndex, setSelectedChapterIndex}}>
      <div>
      {children}
    </div>
    </SelectedChapterIndexContext.Provider>
    </UserDetailsContext.Provider>
    
  )
}

export default Provider
