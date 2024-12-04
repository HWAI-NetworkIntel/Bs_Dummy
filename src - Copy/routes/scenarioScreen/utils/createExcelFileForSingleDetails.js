import * as ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'

export const downloadExcelFileFromSingleDetails = async (data) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')
  Object.keys(data)?.forEach((key) => {
    let m = worksheet.addRow([key.split('_').join(' '), 'Values'])
    m.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'f4f4f4' },
    }
    m.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    }
    m.font = {
      size: 11,
      bold: true,
      color: { argb: '78338b' },
    }

    data[key]?.forEach((item) => {
      Object.keys(item)?.forEach((key1, i) => {
        let k = worksheet.addRow([key1.split('_').join(' '), item[key1]])
        // k.fill = {
        //   type: 'pattern',
        //   pattern: 'solid',
        //   fgColor: { argb: i % 2 === 0 ? 'f4f4f4' : 'f4f4f4' },
        // }
        k.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        }
      })
    })
  })
  worksheet.columns = [
    { header: 'Basic Details', width: 55 },
    { header: 'Values', width: 65 },
  ]
  const buffer = await workbook.xlsx.writeBuffer()
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const fileExtension = `${data['Basic_Details'][0]['Scenario_ID']}_ScenarioDetails`
  const blob = new Blob([buffer], { type: fileType })
  FileSaver(blob, fileExtension)
}
