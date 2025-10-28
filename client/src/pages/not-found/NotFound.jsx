import "./not-found.css"
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className='not-found'>
            <div className="not-found-title">404</div>
            <h1 className='not-found-text' > Page Not Found </h1>
            <Link className='not-found-link' to={"/"} >  Go to home page </Link>
        </section>
    )
}
