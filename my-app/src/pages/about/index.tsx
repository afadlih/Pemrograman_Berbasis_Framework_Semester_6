const About = () =>{
  const nama = "Ahmad Fadlih Wahyu Sardana";
  const nim = "2341720069";
  const kelas = "TI 3F";
  const absen = "04";

  return (
    <div>
      <h1>{nama}</h1>
      <p>NIM: {nim}</p>
      <p>Program Studi: {kelas}</p>
      <p>Absen: {absen}</p>
        <button className="btn btn-secondary" onClick={() => window.location.href = "/"}>Home</button>
    </div>
  );
};

export default About;
