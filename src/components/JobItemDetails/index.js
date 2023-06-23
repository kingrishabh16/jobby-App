import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineStar} from 'react-icons/ai'

import Header from '../Header'
import SimilarJobsItem from '../SimilarJobsItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    JobData: {},
    similarJobData: [],
    skills: [],
    lifeAtCompany: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    imageUrl: data.image_url,
    name: data.name,
    description: data.description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarJobData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedData(eachSimilarJob),
      )
      const updatedSkills = fetchedData.skills.map(eachSkills =>
        this.getFormattedData(eachSkills),
      )
      const updatedLifeAtCompany = fetchedData.life_at_company.map(eachItem =>
        this.getFormattedData(eachItem),
      )
      this.setState({
        JobData: updatedData,
        similarJobData: updatedSimilarJobData,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobData()
  }

  renderFailureView = () => (
    <div className="job-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {JobData, skills, lifeAtCompany, similarJobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = JobData

    return (
      <div className="product-details-success-view">
        <div className="company-profile">
          <img src={companyLogoUrl} alt="job details company logo" />
          <h1 className="company-heading">{title}</h1>
          <AiOutlineStar />
          <p className="rating">{rating}</p>
          <p className="location">{location}</p>
          <p className="">{employmentType}</p>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr />
        <a href={companyWebsiteUrl}>Visit</a>
        <h1 className="desc">Description</h1>
        <p className="para-desc">{jobDescription}</p>
        <h1 className="skills">Skills</h1>
        <ul className="skill-list">
          {skills.map(eachSkills => (
            <li className="skill-li">
              <img src={eachSkills.imageUrl} alt={eachSkills.name} />
              <p>{eachSkills.name}</p>
            </li>
          ))}
        </ul>
        <div>
          <h1>Life at company</h1>
          <p>{lifeAtCompany.description}</p>
          <img src={lifeAtCompany.imageUrl} alt="life at company" />
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobData.map(eachSimilarJob => (
            <SimilarJobsItem
              jobsDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
