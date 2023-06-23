import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedProfile = fetchedData.profile_details.map(eachItem => ({
        name: eachItem.name,
        profileImageUrl: eachItem.profile_image_url,
        shortBio: eachItem.short_bio,
      }))
      this.state({
        profileList: updatedProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.state({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsListView = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="" />
        <h1 className="profile">{name}</h1>
        <p className="profile-des">{shortBio}</p>
      </div>
    )
  }

  onRetryProfile = () => {
    this.getProfile()
  }

  renderFailureView = () => (
    <button type="button" onClick={this.onRetryProfile}>
      Retry
    </button>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
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
    return this.renderProfile()
  }
}

export default Profile
