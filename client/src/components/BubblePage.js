import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
// import {axiosWithAuth} from '../utils/axiosWithAuth'
import {fetchBubble} from '../api/fetchBubble'

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=>{
    fetchBubble()
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => console.log(err))
    }, [colorList.length])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
