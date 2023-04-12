import React from 'react'

export const SortProducts: React.FC = () => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            // value={filterBy}
            // onChange={({ target }) => onChangeFilterBy(target.value as FilterBy)}
          >
            <option value='alphabetic'>Alphabetic</option>
            <option value='count'>Count</option>
            {/* <option value='complete'>Completed</option> */}
          </select>
        </span>
      </p>
    </form>
  )
}
