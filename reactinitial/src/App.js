import React, { useEffect, useState } from "react"
import LoadingMask from "./components/LoadingMask"
import Character from "./components/Character"
import Subscription from "./components/Subscription"

const App = () => {
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSubscription, setShowSubscription] = useState(false);

  const url = "https://demoapi.com/api/series/howimetyourmother"

  const getApiData = async () => {
    const response = await fetch(url).then((response) => response.json());
    setApiData(response)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubscription(true);
    }, 10000);

    getApiData();
    setIsLoading(false);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div>
      <h1>Series Api</h1>
      {isLoading ? <LoadingMask /> :
        apiData.map((data, index) => (
          <Character key={index} data={data} />
        ))}
        {showSubscription && <Subscription />}
    </div>
  )
}

export default App
