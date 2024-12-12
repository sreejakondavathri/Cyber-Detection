import React from 'react';
import yourImage from '../assets/p1.png';

export default function Home() {
  return (
    <div>
      <img src={yourImage} alt="Cyber Detection Logo" className='logo'/>
      <style jsx>{`
        .logo {
          width: 350px;
          height: 350px;
          border-radius: 10px;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  )
}




// import React from 'react';
// import yourImage1 from '../assets/p1.png';
// import yourImage2 from '../assets/p2.png';

// export default function Home() {
//   return (
//     <div className="container">
//       <img src={yourImage1} alt="Cyber Detection Logo1" className="logo1"/>
//       <img src={yourImage2} alt="Cyber Detection Logo2" className="logo2"/>
      
//       <style jsx>{`
//         .logo1 {
//           position: absolute;
//           top: 28%;
//           left: 6%;
//           width: 350px;
//           height: 350px;
//         }

//         .logo2 {
//           position: absolute;
//           top: 28%;
//           right: 6%;
//           width: 350px;
//           height: 350px;
//         }
//       `}</style>
//     </div>
//   );
// }





