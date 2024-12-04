import * as ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'
import { RESULTS } from '../../../common/constants/constants'

export const downloadSimulationExcelFile = async (data, scenarioId) => {
  if (!data || !data.length) {
    console.error('No data to export.')
    return
  }

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')

  // Define the order of columns and their display names
  const columnMapping = {
    bidId: 'BID ID',
    preAEPEnrollment: RESULTS.preAep,
    postAEPEnrollment: RESULTS.postAep,
    simulatedResult: RESULTS.simulatedPostAep,
    simulatedPostAEPDifference: RESULTS.simulatedChangePostAep,
  }

  const headerRow = worksheet.addRow(Object.values(columnMapping))
  headerRow.eachCell((cell, index) => {
    cell.font = {
      bold: true,
      color: { argb: '78338B' }, // Font color
    }
  })

  // Add data rows
  data.forEach((row) => {
    const values = Object.keys(columnMapping).map((key) => {
      // Concatenate values with commas for specified columns
      if (['preAEPEnrollment', 'postAEPEnrollment', 'simulatedResult', 'simulatedPostAEPDifference'].includes(key)) {
        return row[key].toLocaleString('en-US')
      }
      return row[key]
    })

    const dataRow = worksheet.addRow(values)

    // Set font color for simulatedPostAEPDifference column
    const simulatedPostAEPDifferenceCell = dataRow.getCell('E') // Assuming 'E' is the column index for simulatedPostAEPDifference
    const simulatedPostAEPDifferenceValue = row['simulatedPostAEPDifference']

    if (simulatedPostAEPDifferenceValue < 0) {
      simulatedPostAEPDifferenceCell.font = { color: { argb: 'FF0000' } } // Red for negative values
    } else if (simulatedPostAEPDifferenceValue > 0) {
      simulatedPostAEPDifferenceCell.font = { color: { argb: '008000' } } // Green for positive values
    }
  })
  ;['B', 'C', 'D', 'E'].forEach((column) => {
    worksheet.getColumn(column).alignment = { horizontal: 'right' }
  })

  // css modifications
  worksheet.columns = [
    { width: 15 }, // Column 1 width
    { width: 30 }, // Column 2 width
    { width: 30 }, // Column 3 width
    { width: 45 },
    { width: 55 },
    // Add more columns and widths as needed
  ]

  // Create a buffer from the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    // Save the buffer as an Excel file
    FileSaver.saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `${scenarioId} - Simulation Result.xlsx`
    )
  })
}
