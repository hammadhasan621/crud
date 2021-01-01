import React from 'react';
import './style.css';

const Pagination = ({ postsPerPage, totalPosts, paginate , search, cpage}) => {
  const pageNumbers = [];

  if(!search){
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
  }

  return (
    <nav>
      <ul className="pagination">
      {(cpage > 1 && !search)?
        <li class="page-item">
          <a class="page-link" onClick={() => paginate(cpage - 1)} >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        :""
      }
        {pageNumbers.length > 1
          ? pageNumbers.map((number) => (
                <li key={number} className={(cpage === number)?"page-item activeli":"page-item"}>
                    <a onClick={() => paginate(number)} className="page-link">
                        {number}
                    </a>
                </li>
            ))
          : ""}
          {(cpage < pageNumbers.length)?
            <li class="page-item">
                <a class="page-link" onClick={() => paginate(cpage + 1)} >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>    
            :""
          }
        
      </ul>
    </nav>
  );
};

export default Pagination;