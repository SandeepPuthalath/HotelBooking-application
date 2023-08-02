import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetUsersAllBookings, resetState } from '../redux/reducers/booking/bookingSlice'
import { Typography } from '@material-tailwind/react'

const BookingsPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(s => s.bookings?.loading);
  const data = useSelector(s => s.bookings?.data);
  const error = useSelector(s => s.bookings?.error)
  const applicantId = useSelector((state) => state?.user?.data?.applicantId);
  
  React.useEffect(() =>{
    dispatch(resetState())
    dispatch(handleGetUsersAllBookings(applicantId))
  },[])

  if(loading){
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Typography variant="h3">Loading......</Typography>
      </div>
    )
  }


  if(error){
    <div className='h-screen w-screen flex justify-center items-center'>
        <Typography variant="h3">Somthing Went wrong</Typography>
      </div>
  }

  return (
    <div>
      <h1>booking page</h1>
    </div>
  )
}

export default BookingsPage
