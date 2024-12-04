import { useSelector } from 'react-redux'
import { individualBenefitMapper, individualBenefitMapperForOldValues, mapSubBenefitsAsPerUiTypeForUIFourteen } from '../../../../utils/Benefits'

const PackageBenefits = ({ arr, packageNo }) => {
  const { benefitsToShow } = useSelector(({ fifteen }) => fifteen)
  let a = [...arr]
    ?.filter((singleItem) => singleItem.benefitDataType === 'multi select')[0]
    ?.child?.map((item) => ({ ...item, benefitGroupUIType: 6 }))
  let b = []
  a?.forEach((aa) => {
    if (aa.benefitGroupUIType === 6 && aa.child?.length > 0) {
      b.push({ ...aa, benefitGroup: aa.BenefitGroupInner })
      aa.child.forEach((aaa) => {
        b.push({ ...aaa, benefitGroup: aaa.BenefitGroupInner })
      })
    } else {
      b.push({ ...aa, benefitGroup: aa.BenefitGroupInner })
    }
  })
  let c = mapSubBenefitsAsPerUiTypeForUIFourteen([...b])

  return (
    <>
      {benefitsToShow[packageNo]?.map((key) => (
        <div className="flex flex-col w-full">
          <div className="w-full px-2">
            <div className="w-full  h-9 flex gap-x-1 items-center rounded-sm font-semibold justify-center text-[#333] border border-[#E9E8E8] bg-[#d6d0da]">
              {' '}
              {key}{' '}
            </div>
          </div>
          <div className="w-full">{individualBenefitMapperForOldValues(c[key]?.subBenefits, c[key]?.uiType)}</div>
        </div>
      ))}
    </>
  )
}
export default PackageBenefits
