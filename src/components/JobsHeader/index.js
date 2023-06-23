import {AiOutlineClose} from 'react-icons/ai'

import {BsSearch} from 'react-icons/bs'

import './index.css'

const JobsHeader = props => {
  const {searchInput, onClickSearch, onClickDelete, changeSearchInput} = props

  const shouldShowDelete = searchInput.length > 0

  const searchJobs = () => {
    onClickSearch()
  }

  const changeSearch = event => {
    changeSearchInput(event.target.value)
  }

  const deleteSearch = () => {
    onClickDelete()
  }

  return (
    <div className="">
      <input
        className=""
        type="search"
        value={searchInput}
        onChange={changeSearch}
        placeholder="search"
      />
      <button type="button" onClick={searchJobs} data-testid="searchButton">
        <BsSearch className="search-icon" />
      </button>
      {shouldShowDelete && (
        <button type="button" onClick={deleteSearch} data-testid="deleteButton">
          <AiOutlineClose />
        </button>
      )}
    </div>
  )
}

export default JobsHeader
