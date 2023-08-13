import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import BannerCard from './bannerCard'
import { useNavigate } from 'react-router-dom'

const BannerList = () => {
    const navigate = useNavigate()
  return (
    <div>
       <div className="flex items-center justify-between mx-2 my-2 md:mx-5 md:my-5">
        <Typography variant="h4">Banner Management</Typography>
        <Button onClick={() => navigate("add-banner")} size="sm" className="shadow-none hover:shadow-none">Add Banner</Button>
      </div>
      <section className="parent-section grid md:grid-cols-2 gap-y-5">
        <BannerCard />
        <BannerCard />
        <BannerCard />
        <BannerCard />
      </section>
    </div>
  )
}

export default BannerList
