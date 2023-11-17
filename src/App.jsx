import "./App.css";
import React from 'react'


function Arama({aramaMetni,onSearch}) {
  function handleChange(event){
    console.log(event);
    onSearch(event); 
  };
  return (
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={handleChange}
       value={aramaMetni}/>
     
    
    </div>
  );
}
function Yazi({url,baslik,yazar,yorum_sayisi,puan,id}){
  return(
    <li key={id}>
    <span>
      <a href={url}>{baslik}</a>,
    </span>
    <span>
      <b>Yazar:</b> {yazar},{" "}
    </span>
    <span>
      <b>Yorum Sayısı:</b> {yorum_sayisi},{" "}
    </span>
    <span>
      <b>Puan:</b> {puan}
    </span>
  </li>
  )
}
function Liste(props) {
  return (
    <ul>
      {props.yazilar.map(function (yazi) {
        return (
        <Yazi key={yazi.id} {...yazi}/>
        );
      })}{" "}
    </ul>
  );
}
function App() {
  const [aramaMetni,setAramaMetni] =React.useState(localStorage.getItem("aranan") || "React");

  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },
    {
      baslik: "Android Programlama",
      url: "https://www.android.com",
      yazar: "Berke Kaymaz",
      yorum_sayisi: 7,
      puan: 4,
      id: 2,
    },
    {
      baslik: "Websitesi Nasıl yapılmamalı",
      url: "https://berkekaymaz.vercel.app",
      yazar: "Berke Kaymaz",
      yorum_sayisi: 3,
      puan: 2,
      id: 3,
    },
    {
      baslik: "java for dummies (favorim)",
      url: "https://www.amazon.com.tr/Java-Dummies-7th-Barry-Burd/dp/1119235553",
      yazar: "Barry A. Burd",
      yorum_sayisi: 777,
      puan: 5,
      id: 4,
    },
  ];
  
  const arananYazilar = yaziListesi.filter(function (yazi) {
    const kucukHarfAramaMetni = aramaMetni.toLowerCase();
    const kucukHarfYazar = yazi.yazar.toLowerCase();
    const kucukHarfBaslik = yazi.baslik.toLowerCase();
    return (
      kucukHarfYazar.includes(kucukHarfAramaMetni) ||
      kucukHarfBaslik.includes(kucukHarfAramaMetni)
    );
  });

/*  const arananYazilar=yaziListesi.filter(
      function(yazi){
      return yazi.yazar.includes(aramaMetni)||yazi.baslik.includes(aramaMetni);
  }
);
*/

  React.useEffect(() => {
    localStorage.setItem("aranan",aramaMetni);
  },[aramaMetni]);


  //1. aşama callback handler metodu oluşturma
function handleSearch(event){
  console.log(event.target.value);
  setAramaMetni(event.target.value);
}

  return (
    <React.Fragment>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch} />  
      <p>
        <strong>{aramaMetni} aranıyor...</strong>
      </p>
      <hr />
      <Liste yazilar={arananYazilar}/>
    </React.Fragment>
  );
}
export default App;