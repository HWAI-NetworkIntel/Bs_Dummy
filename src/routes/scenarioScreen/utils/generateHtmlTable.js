import { RESULTS } from '../../../common/constants/constants'
import { getModifiedObjectForRendering } from './scenarioDetailsAndCompare'

let header = `<!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  #customers th {
    padding: 8px;
  }
  #customers td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  #scenario_details td {
    vertical-align: top !important;
  }

  #customers tr:nth-child(even){background-color: #f2f2f2;}
  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #9776a2;
    color: white;
    width:220px;
  }
</style>
</head>
<body>
<p>Hi,
<br>
Please find the  shared scenario details:- </p>`
let footer = `<br>
<p>Regards,
<br>
HealthWorksAI
</p>
</body>
</html>`
export const generateTable = (bindu) => {
  let mainTitles = ['Plans Selected', 'Filters Applied', 'Simulation Results', 'Benefits Altered', 'Basic Details']
  const rightAlignTitles = [RESULTS.preAep, RESULTS.postAep, RESULTS.simulatedPostAep, RESULTS.simulatedChangePostAep]
  const tableString = `
<div style="width: 100%; font-size: small; border: 1px solid #5C276E; height: 100%; overflow: auto;">
  ${bindu
    .map(
      (item) => `
    ${Object.keys(item)
      .map((title, i) => {
        const modifiedTitle = title === 'S NPType' ? 'SNP Type' : title
        return `
      <div style="width: 100%; display: flex;">
        <div style="min-width: 460px; font-size: small; ${
          mainTitles.includes(modifiedTitle) ? 'color: #7D7D7D; font-weight: bold;' : ''
        } padding-top: 1px;padding-bottom:1px; padding-left:4px;padding-right:4px; border-top: 1px solid ${
          mainTitles.includes(modifiedTitle) ? '#5C276E' : ''
        }">
          ${modifiedTitle}
        </div>
        <div style="display: flex; ${item[title].length > 1 ? '' : item[title][0].length > 1 ? '' : 'width: 100%;'}">
          ${item[title]
            ?.map(
              (arr) => `
            <div style="display: flex; ${item[title].length > 1 ? '' : item[title][0].length > 1 ? '' : 'width: 100%;'}">
              <div style="width: 1px; background-color: #5C276E; height: 100%;"></div>
              ${arr
                ?.map(
                  (key) => `
                <div style="${
                  item[title].length > 1 ? 'width: 300px;' : item[title][0].length > 1 ? 'width: 300px;' : 'min-width: 300px; width: 100%;'
                } max-height: 108px; overflow: auto; border-right: 1px solid; ${
                    i === 0 ? 'color: #7D7D7D; font-weight: bold;' : ''
                  } padding-top: 1px;padding-bottom:1px; padding-left:4px;padding-right:4px; border-top: 1px solid ${
                    mainTitles.includes(modifiedTitle) ? '#5C276E' : ''
                  }; ${rightAlignTitles.includes(modifiedTitle) && key !== 'Not changed' && 'display:flex;justify-content:flex-end;'}">
                   ${key === 'em' ? '' : key} 
                </div>
              `
                )
                .join('')}
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `
      })
      .join('')}
  `
    )
    .join('')}
</div>
`

  return tableString
}

const generateHtml = (bindu) => {
  let mainContent = ''
  mainContent = generateTable(bindu)
  return `${header} ${mainContent} ${footer}`
}

export const mainHtmlGeneratorForSingleDetails = async (scenarioId, data1) => {
  let filteredData = { [scenarioId]: data1 }
  let bindu = getModifiedObjectForRendering(filteredData)
  let finalGeneratedString = generateHtml(bindu)
  return finalGeneratedString
}
