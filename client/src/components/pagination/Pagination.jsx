import "./pagination.css"

export default function Pagination({page , totalPages , setPage}) {
    return (
        <div className="pagination">

            <button 
            className="page previous"
            onClick={() => setPage(prev => prev - 1)}
            disabled= {page === 1}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((currPage) => (
                <div 
                    onClick={() => setPage(currPage)} 
                    className={page === currPage ? "page active" : "page"} 
                    key={currPage}
                    >
                        {currPage}
                </div>
            ))}
            <button onClick={() => setPage(prev => prev + 1)} disabled={page === totalPages} className="page next">Next</button>
        </div>
    );
}
