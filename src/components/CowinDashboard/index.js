// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const ApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: ApiStatusConstants.initial}

  componentDidMount() {
    this.getCovidData()
  }

  getVaccinationCoverageData = data => ({
    dose1: data.dose_1,
    dose2: data.dose_2,
    vaccineDate: data.vaccine_date,
  })

  getVaccinationByAge = data => ({
    age: data.age,
    count: data.count,
  })

  getVaccinationByGender = data => ({
    gender: data.gender,
    count: data.count,
  })

  renderFailureView = () => (
    <div>
      <img
        className="failureView-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  getCovidData = async () => {
    this.setState({apiStatus: ApiStatusConstants.inProgress})

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const formateData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachData =>
          this.getVaccinationCoverageData(eachData),
        ),
        vaccinationByAge: data.vaccination_by_age.map(eachData =>
          this.getVaccinationByAge(eachData),
        ),
        vaccinationByGender: data.vaccination_by_gender.map(eachData =>
          this.getVaccinationByGender(eachData),
        ),
      }

      this.setState({
        vaccinationData: formateData,
        apiStatus: ApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: ApiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="Loader-container">
      <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
    </div>
  )

  renderVaccinationStats = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccinationData

    return (
      <>
        <VaccinationCoverage
          VaccinationCoverageDetails={last7DaysVaccination}
        />
        <VaccinationByGender VaccinationGenderDetails={vaccinationByGender} />
        <VaccinationByAge VaccinationAgeDetails={vaccinationByAge} />
      </>
    )
  }

  renderBasedOnViewStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case ApiStatusConstants.success:
        return this.renderVaccinationStats()
      case ApiStatusConstants.inProgress:
        return this.renderLoader()
      case ApiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="App-container">
        <div className="websiteLogo-container">
          <img
            className="websiteLogo-image"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p className="coVid-heading">Co-WIN</p>
        </div>
        <div className="Vaccination-container">
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderBasedOnViewStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
