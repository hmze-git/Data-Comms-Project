import { useContext,useState } from "react"
import AuthContext from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api";
import Swal from "sweetalert2"


const VideoUpload = ()=>{

     const { user} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState();
    const [description, setDescription] = useState("");
    const [uploadComplete,setUploadComplete]=useState(false);
    const [vidId,setVidId]=useState("")
    const [isUploaded,setIsUploaded]= useState(false)

    const userId = user?.id;
    
    

    const handleTitleChange = (e) => {
    setTitle(e.target.value);
    };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  

  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await uploadVid();
      if (data.success) {
        setVidId(data.vidId);
      } else {
        console.log("failed upload vid");
      }
    } catch (error) {
        console.log("REG FAIL ",error); 
    }
  };

  const uploadVid =async ()=>{

    try {
        const vidData = new FormData()

            vidData.append("userId",userId);
            vidData.append("title",title);
            vidData.append("description",description);
            vidData.append("file",file);

            if(!file){
                alert("Insert a file prior to upload");
                return;
            }
    
        const resp = await api.post("/post/video",vidData);

        return resp.data;
    } catch (error) {
        console.log("ERR in Reg due to ",error );
    }



  }
  if (!user) {
  return <div>Loading...</div>;
}

  return(

    <div className="login spad">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="login__form">
                        <h3>Upload Video</h3>
                        <form  onSubmit={handleSubmit}>
                            <div className="input__item">
                                <input type="text" placeholder="Video Title" 
                                onChange={handleTitleChange}
                                required={true}
                                
                                />
                 
                            </div>
                            <div className="description__item">
                              <textarea
                              value={description}
                               onChange={handledescriptionChange}
                            
                                />
                        
                            </div>
                            <div className="input__item input__item--file">
                                      <label htmlFor="vidFile">
                                        <span>{file ? file.name : "Choose video file…"}</span>
                                    </label>
                                <input type="file"        
                                id="vidFile"
                                placeholder="Video File"
                                 onChange={handleFileChange}
                                 required={true}
                                />
                  
                            </div>
                           
                            <button type="submit" className="site-btn" >Upload Video</button>
                        </form>
                    
                    </div>
                </div>
          
            </div>
        </div>
    </div>


  )

}
export default VideoUpload