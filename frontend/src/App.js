import {useState} from "react"
import './App.css';

function App() {
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState(false)
  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5002/create', {
      method: 'POST',
      body: formData,
    })
    if (response) {
      setStatus(false)
      alert("Success")
    }
    else setStatus(true)
    setLoading(false)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  return (
    <div className='App'>
      {
        loading === true ? <p>Loading... | Please Wait </p>
        : (
        <>
          <h1>Upload to server</h1>
         
          <form onSubmit={handleSubmit}>
            <input type='file' name='file' onChange={handleFileChange}></input>
            <button type='submit'>Submit</button>
          </form>
        </>
        )
      }
      {status === true ? <p>Upload failed</p> : <></>}
      
    </div>
  )
}

export default App;
