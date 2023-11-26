const File = ({file_name}) => {
  return <div className="file_container">
        <div><img className="file_img" src="https://th.bing.com/th/id/R.f9bfc997b0b982fd418f21938c69a3f4?rik=JxdpJcGPNfLCnw&pid=ImgRaw&r=0" alt="" /></div>
        <div className="file_name">{file_name}</div>
  </div>;   
};

export default File;
