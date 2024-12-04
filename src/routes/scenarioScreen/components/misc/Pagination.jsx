import { Pagination } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllScenarios, setCurrentPage, setCurrentSize } from '../../reducer/scenarioSlice'

const TablePagination = ({ total }) => {
  const dispatch = useDispatch()
  const { currentPage, currentSize, allScenarios, displayedScenarios } = useSelector(({ scenarios }) => scenarios)

  const handleChange = (newPage, newSize) => {
    dispatch(setCurrentPage(newPage))

    dispatch(setCurrentSize(newSize))
  }
  useEffect(() => {
    const startIndex = (currentPage - 1) * currentSize
    const endIndex = startIndex + currentSize

    const newScenarios = displayedScenarios.slice(startIndex, endIndex)
    const totalPages = Math.ceil(total / currentSize)
    if (totalPages === 1) {
      dispatch(setCurrentPage(1))
    }

    dispatch(setAllScenarios(newScenarios))
  }, [currentPage, currentSize, displayedScenarios])

  return (
    <div className="py-2 px-2 border-t border-[#E9E8E8]">
      <Pagination
        total={total}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        defaultPageSize={currentSize}
        defaultCurrent={1}
        current={currentPage}
        onChange={handleChange}
        showSizeChanger
      />
    </div>
  )
}

export default React.memo(TablePagination)
