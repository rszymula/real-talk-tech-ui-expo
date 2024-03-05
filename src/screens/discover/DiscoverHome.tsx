import React from 'react';
import { DiscoverGrid } from './DiscoverGrid';


export function DiscoverHome(props){
  console.log("REND_DISCOVER_HOME_")
  return (
    <>
      <DiscoverGrid {...props}/>
    </>
  )
}