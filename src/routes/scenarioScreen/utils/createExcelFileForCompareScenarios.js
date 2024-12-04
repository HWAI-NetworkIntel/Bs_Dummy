import * as ExcelJS from 'exceljs'
import * as FileSaver from 'file-saver'

export const downloadExcelFileForCompareScenarios = async (data) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')
  let firstName = ''

  {
    let obj = data.Filters[0]
    const columns = []
    let firstColumn = {
      header: 'Plan Filters',
      key: 'planFilters',
      width: 30,
    }
    let firstColumnEmpty = { header: '', key: 'planFilters', width: 30 }
    columns.push(firstColumn)
    columns.push(firstColumnEmpty)

    Object.keys(obj)?.forEach((key, index) => {
      let column
      if (key != 'group' && key != 'index_a' && key != 'index_b') {
        if (index == 0) {
          column = { header: key, key: index + 1, width: 50 }
        } else {
          column = { header: key, key: index + 2, width: 50 }
        }
        columns.push(column)
      }
    })
    firstName = columns[2]?.header || ''
    worksheet.columns = columns
  }

  //adding filters data
  {
    data.Filters.forEach(function (item, index) {
      let obj = []
      Object.keys(item)?.forEach((key, index) => {
        if (key != 'group') {
          obj.push(item[key])
        }
      })
      let m = worksheet.addRow(obj)
      m.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      }
    })
  }
  //adding benefit information header
  {
    let newRow = []
    Object.keys(data.BenefitInfo[0])?.forEach((key, index) => {
      if (key != 'group' && key != 'index_b') {
        if (key == 'index_a') {
          let string = newRow.push('Benefit Group', 'Benefit')
        } else {
          newRow.push(data.BenefitInfo[0][key])
        }
        // obj.push(item[key])
      }
    })
    let row2 = worksheet.addRow(newRow)
    row2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'f4f4f4' },
    }
    row2.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    }
    row2.font = {
      size: 11,
      bold: true,
      color: { argb: '78338b' },
    }
  }
  //adding benefit information
  {
    let newRowI = []
    let i = 0
    for (i in data.Benefit) {
      Object.keys(data.Benefit[i])?.forEach((key, index) => {
        if (key != 'group') {
          if (key == 'index_a') {
            let string =
              // newRowI.push(data.Benefit[i]["index_a"] + "," + data.Benefit[i]["index_b"])
              newRowI.push(data.Benefit[i]['index_a'])
            newRowI.push(data.Benefit[i]['index_b'])
          }
          if (key != 'index_b' && key != 'index_a') {
            newRowI.push(data.Benefit[i][key])
          }
          // obj.push(item[key])
        }
      })
      let row3 = worksheet.addRow(newRowI)
      newRowI = []
      row3.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      }
    }
  }
  //adding simulation output header
  {
    let row4 = worksheet.addRow(['Simulation Output Details'])
    row4.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'f4f4f4' },
    }
    row4.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    }
    row4.font = {
      size: 11,
      bold: true,
      color: { argb: '78338b' },
    }
  }

  //adding simulation output
  {
    data.Output.forEach(function (item, index) {
      let objRow = []
      Object.keys(item)?.forEach((key, index) => {
        if (key != 'group') {
          objRow.push(item[key])
        }
      })
      let last = worksheet.addRow(objRow)
      last.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      }
    })
  }
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    if (rowNumber < 2) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f4f4f4' },
      }
      row.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      }
      row.font = {
        size: 11,
        bold: true,
        color: { argb: '78338b' },
      }
    }
  })
  const buffer = await workbook.xlsx.writeBuffer()
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const blob = new Blob([buffer], { type: fileType })
  FileSaver(blob, firstName + '_CompareScenarios')
}
