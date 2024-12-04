import * as ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import { saveAs } from 'file-saver'
import { getModifiedObjectForRendering } from './scenarioDetailsAndCompare'
import { RESULTS } from '../../../common/constants/constants'

export const downloadExcelFileFromSingleDetailss = async (data, scenarioId) => {
  let modifieddata = getModifiedObjectForRendering({ [scenarioId]: data })

  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet(`${scenarioId}- Scenario Details`)
  const boldTitles = ['Basic Details', 'Filters Applied', 'Plans Selected', 'Benefits Altered', 'Simulation Results']
  const rightAligned = [RESULTS.postAep, RESULTS.preAep, RESULTS.simulatedPostAep, RESULTS.simulatedChangePostAep]

  modifieddata.forEach((section) => {
    Object.keys(section).forEach((title) => {
      let modifiedTitle = title
      if (title === 'S NPType') {
        modifiedTitle = 'SNP Type'
      }
      const values = section[title][0]
      const rowValues = [modifiedTitle, ...values.map((value) => (value === 'em' ? '' : value))]
      const row = sheet.addRow(rowValues)
      row.eachCell((cell) => {
        if (boldTitles.includes(modifiedTitle)) {
          cell.font = { bold: true, color: { argb: 'FF68228B' }, size: 11 }
          if (cell.value && typeof cell.value === 'string') {
            cell.value = cell.value.toUpperCase()
          }
        }
      })
    })
  })

  sheet.views = [
    {
      state: 'frozen',
      xSplit: 1,
      ySplit: 0,
      topLeftCell: 'B1',
      activePane: 'bottomRight',
    },
  ]

  sheet.columns.forEach((column) => {
    column.width = 70
  })

  sheet.eachRow((row) => {
    row.height = null
  })

  sheet.eachRow((row) => {
    row.alignment = { wrapText: true, vertical: 'top' }
  })
  sheet.eachRow((row) => {
    row.eachCell((cell, index) => {
      const textLength = cell.value ? String(cell.value).length : 0
      const wrappedTextLength = Math.ceil(textLength / 70)
      const defaultHeight = 15
      const optimalHeight = textLength >= 17705 ? 3200 : defaultHeight * wrappedTextLength
      if (optimalHeight > row.height) {
        row.height = optimalHeight
      }
      if (rightAligned.includes(cell.value)) {
        for (let i = index + 1; i <= row.cellCount; i++) {
          const nextCell = row.getCell(i)
          if (nextCell && nextCell?._value?.model?.value != 'Not changed') {
            nextCell.alignment = { horizontal: 'right' }
          }
        }
      }
    })
  })

  workbook.xlsx
    .writeBuffer()
    .then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(blob, `${scenarioId}- Scenario Details.xlsx`)
    })
    .catch((err) => {
      console.error('Error occurred while writing Excel file:', err)
    })
}
