import React from 'react'
import BookingCard from './BookingCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../auth/Loading'
import { handleGettingBookingDetails } from '../../redux/reducers/booking/bookingSlice'

const BookingDetails = () => {
  const dispatch = useDispatch()
  const loading = useSelector((s) => s.bookings?.loading);
  const booking = useSelector((s) => s.bookings?.bookingDetails);
  const {id} = useParams()
  React.useEffect(()=>{
    dispatch(handleGettingBookingDetails(id));
  },[])

  if(loading){
    return <Loading/>
  }
  return (
    <div className='px-10 py-10'>
      <BookingCard {...booking}/>
    </div>
  )
}

export default BookingDetails
