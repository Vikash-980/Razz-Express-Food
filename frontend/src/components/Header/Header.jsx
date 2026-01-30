import React from 'react'
import './Header.css'

// Yahan props mein setMenu ko receive karein
const Header = ({ setMenu }) => {
  return (
    <div className='header'>
      <div className="header-contents">
          <h2>Order your favourite food here</h2>
          <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.</p>
          
          {/* href se scroll hoga aur onClick se navbar state update hogi */}
          <a href='#explore-menu'>
            <button onClick={() => setMenu("menu")}>View Menu</button>
          </a>
      </div>
    </div>
  )
}

export default Header

// import React from 'react'
// import './Header.css'

// const Header = () => {
//   return (
//     <div>
//       <div className='header'>
//         <div className="header-contents">
//             <h2>Order your favourite food here</h2>
//             <p>Choose from a diverse menu featurin a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your dining experience, one delicious meal at a time.</p>
//             <button onClick={()=>setMenu("menu")} >View Menu</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Header
