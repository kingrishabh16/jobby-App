import {AiOutlineStar} from 'react-icons/ai'
import './index.css'

const SimilarJobsItem = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobsDetails

  return (
    <li className="similar-job-item">
      <img
        src={companyLogoUrl}
        className="similar-job-image"
        alt="similar job company logo"
      />
      <p className="similar-job-title">{title}</p>
      <AiOutlineStar />
      <p className="rating">{rating}</p>
      <h1 className="desc">Description</h1>
      <p className="">{jobDescription}</p>
      <p className="location">{location}</p>
      <p className="">{employmentType}</p>
    </li>
  )
}

export default SimilarJobsItem
