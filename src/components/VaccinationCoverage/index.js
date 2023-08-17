// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {VaccinationCoverageDetails} = props

  const DataFormatter = number => {
    if (number > 1500) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="VaccinationCoverage-container">
      <h1 className="vaccination-description">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={VaccinationCoverageDetails}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
