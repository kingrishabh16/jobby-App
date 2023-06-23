import Profile from '../Profile'
import './index.css'

const FiltersGroup = props => {
  const renderSalaryFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {changeSalary, activeSalaryId} = props
      const onClickSalaryItem = () => changeSalary(salary.salaryRangeId)

      const salaryClassName =
        activeSalaryId === salary.salaryRangeId
          ? `and-up active-salary`
          : `and-up`

      return (
        <li
          className="salary-item"
          key={salary.salaryRangeId}
          onClick={onClickSalaryItem}
        >
          <input
            className={salaryClassName}
            type="radio"
            id={salary.salaryRangeId}
            name="salary"
            value={salary.label}
          />
          <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
          <br />
        </li>
      )
    })
  }

  const renderSalaryFilters = () => (
    <div>
      <h1 className="Salary-heading">Salary Range</h1>
      <ul className="ratings-list">{renderSalaryFiltersList()}</ul>
    </div>
  )

  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {changeEmployment, activeEmployment} = props
      const onClickEmployItem = () =>
        changeEmployment(employment.employmentTypeId)
      const isActive = employment.employmentTypeId === activeEmployment
      const employClassName = isActive
        ? `employ-name active-employ-name`
        : `employ-name`

      return (
        <li
          className="employ-item"
          key={employment.employmentTypeId}
          onClick={onClickEmployItem}
        >
          <input
            type="checkbox"
            className={employClassName}
            id={employment.employmentTypeId}
            name={employment.label}
            value={employment.label}
          />
          <label htmlFor={employment.employmentTypeId}>
            {' '}
            {employment.label}
          </label>
          <br />
        </li>
      )
    })
  }

  const renderJobCategories = () => (
    <>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list">{renderEmploymentList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      <Profile />
      {renderJobCategories()}
      {renderSalaryFilters()}
    </div>
  )
}

export default FiltersGroup
