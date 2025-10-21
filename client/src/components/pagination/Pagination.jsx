import "./pagination.css"

export default function Pagination() {
    return (
        <div className="pagination">
            <div className="page previous">Previous</div>
            {Array.from({ length: 5 }, (_, index) => index + 1).map((page) => (
                <div className="page" key={page}>
                    {page}
                </div>
            ))}
            <div className="page next">Next</div>
        </div>
    );
}
