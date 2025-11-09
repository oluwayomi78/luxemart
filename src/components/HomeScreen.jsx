import React from 'react'
import Hero from './Hero'
import Collection  from './Collections'
import SeasonalDeals from './SeasonalDeals'
import Handpicked from './Handpicked'

const HomeScreen = () => {
  return (
    <div>
      <Hero/>
      <Collection/>
      <SeasonalDeals/>
      <Handpicked/>
    </div>
  )
}

export default HomeScreen