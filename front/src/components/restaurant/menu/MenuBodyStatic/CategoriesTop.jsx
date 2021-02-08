// import React from 'react'
// import { Link } from 'react-router-dom'

// const Title = props => 
// <Link to={props.link} className="category-title">
//     <span>{props.title}</span>
//     {props.titledefault !== props.title && <span>{props.titledefault}</span>}
// </Link>

// const CategoriesTop = props => {

//     const {categories, currentIndex, slug, menu_id } = props 

//     const baseRoot = `/${slug}/${menu_id}/`;

//     const prev1 = categories[currentIndex-2]
//     const prev2 = categories[currentIndex-1]

//     const cat   = categories[currentIndex]

//     const next1 = categories[currentIndex+1]
//     const next2 = categories[currentIndex+2]
    
//     return (
//         <div className="category-top">
//             <div className="side left">
//                 <div className="frame">
//                     {prev1 && <Title {...prev1} link={`${baseRoot}${prev1.id}`} />}
//                     {prev2 && <Title {...prev2} link={`${baseRoot}${prev2.id}`} />}
//                 </div>
//             </div>

//             <div className="category-title active">
//                 <span>{cat.title}</span>
//                 {cat.title!== cat.titledefault && <span>{cat.titledefault}</span>}
//             </div>
//             <div className="side right">
//                 <div className="frame">
//                     {next1 && <Title {...next1} link={`${baseRoot}${next1.id}`} />}
//                     {next2 && <Title {...next2} link={`${baseRoot}${next2.id}`} />}
//                 </div>
//             </div>
            
//         </div>
//     )

// };

// export default CategoriesTop;
