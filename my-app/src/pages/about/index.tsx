const About = () =>{
  const nama = "Ahmad Fadlih Wahyu Sardana";
  const nim = "2341720069";
  const programStudi = "TI 3F";

  return (
    <div>
      <h1>{nama}</h1>
      <p>NIM: {nim}</p>
      <p>Program Studi: {programStudi}</p>
        <button className="btn btn-secondary" onClick={() => window.location.href = "/"}>Home</button>
    </div>
  );
};

export default About;
