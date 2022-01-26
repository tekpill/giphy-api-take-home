import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [giphyData, setGiphyData] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  ///helper function to fetch data from Giphy API and set to the states
  const fetchData = async () => {
    setIsLoading(true);
    const response =  await fetch(process.env.REACT_APP_GIPHY_URL + process.env.REACT_APP_GIPHY_TOKEN);
    console.log(response);
    if(response.status === 200){
      const body = await response.json();
      setGiphyData(body.data);
      setErrorMsg("");
    } else {
      setErrorMsg(`An Error occured while fetching data from API (Code ${response.status})`);
      setGiphyData();
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>GIPHY API Demo</h1>
      
      <p style={{"color":"red"}}>{errorMsg}</p>
      {
        isLoading ? (
          <p>Loading ...</p>
        ) :(
      giphyData && giphyData.length && 
       giphyData.map((data) => (
          <div key={data.id}>
            <p>{data.title}</p>
            <img alt={data.title} src={data.images.original.url} />
          </div>
        )))}
    </div>
  );
}