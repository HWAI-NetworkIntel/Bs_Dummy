import * as ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import { saveAs } from 'file-saver'
import { camelToNormal } from './Allscenarios'
import { getModifiedObjectForRendering } from './scenarioDetailsAndCompare'
import { RESULTS } from '../../../common/constants/constants'

export const downloadExcelFileForCompare = async (data, scenarioId) => {
  let modifieddata = getModifiedObjectForRendering(data)
  const flattenNestedArrays = (arr) => {
    let flattened = []
    arr.forEach((subArray) => {
      if (Array.isArray(subArray)) {
        flattened.push(...subArray.map((value) => (value === 'em' ? '' : value)))
      } else if (subArray === 'em') {
        flattened.push('')
      } else {
        flattened.push(subArray)
      }
    })
    return flattened
  }
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet(`sheet`)
  const boldTitles = ['Basic Details', 'Filters Applied', 'Plans Selected', 'Benefits Altered', 'Simulation Results']
  const rightAligned = [RESULTS.postAep, RESULTS.preAep, RESULTS.simulatedPostAep, RESULTS.simulatedChangePostAep]
  modifieddata.forEach((section) => {
    Object.keys(section).forEach((title) => {
      let modifiedTitle = title
      if (title === 'S NPType') {
        modifiedTitle = 'SNP Type'
      }
      const values = section[title]
      const flattenedValues = flattenNestedArrays(values)
      const rowValues = [modifiedTitle, ...flattenedValues]
      const row = sheet.addRow(rowValues)
      if (boldTitles.includes(title)) {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.font = { bold: true, color: { argb: 'FF68228B' }, size: 11 }
          if (cell.value && typeof cell.value === 'string') {
            cell.value = cell.value.toUpperCase()
          }
        })
      }
    })
  })

  sheet.columns.forEach((column) => {
    column.width = 50
  })

  sheet.eachRow((row) => {
    row.height = null
  })

  sheet.eachRow((row) => {
    row.alignment = { wrapText: true, vertical: 'top' }
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
  sheet.eachRow((row) => {
    row.eachCell((cell, index) => {
      const textLength = cell.value ? String(cell.value).length : 0
      const wrappedTextLength = Math.ceil(textLength / 50)
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
      saveAs(blob, `Comparsion details.xlsx`)
    })
    .catch((err) => {
      console.error('Error occurred while writing Excel file:', err)
    })
}
