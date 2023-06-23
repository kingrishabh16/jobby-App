import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <img src={companyLogoUrl} alt="company logo" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="rating">{rating}</p>
        <div className="emploment-type">
          <p className="location">{location}</p>
          <p className="employment">{employmentType}</p>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="product-details">
          <p className="desc">Description</p>
          <p className="desc-para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
