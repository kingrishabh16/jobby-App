import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import JobsHeader from '../JobsHeader'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentId: [],
    searchInput: '',
    activeSalaryId: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentId, searchInput, activeSalaryId} = this.state
    const newEmploymentId = activeEmploymentId.join()
    const apiUrl = `https://apis.ccbp.in/jobs&employment_type=${newEmploymentId}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onClickDelete = () => {
    this.setState({searchInput: ''}, this.getJobs)
  }

  changeSalary = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobs)
  }

  changeEmployment = activeCategory => {
    const {activeEmploymentId} = this.state
    this.setState(
      {activeEmploymentId: [...activeEmploymentId, activeCategory]},
      this.getJobs,
    )
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onRetry = () => {
    this.getJobs()
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

  renderJobsListView = () => {
    const {jobsList, searchInput} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs-container">
        <JobsHeader
          searchInput={searchInput}
          onClickSearch={this.onClickSearch}
          onClickDelete={this.onClickDelete}
          changeSearchInput={this.changeSearchInput}
        />
        <ul className="jobs-list">
          {jobsList.map(eachJob => (
            <JobCard jobData={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentId, searchInput, activeSalaryId} = this.state

    return (
      <div className="all-jobs-section">
        <FiltersGroup
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          activeEmployment={activeEmploymentId}
          activeSalaryId={activeSalaryId}
          changeEmployment={this.changeEmployment}
          changeSalary={this.changeSalary}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default AllJobSection
