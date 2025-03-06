import React from 'react'
import { PiChartBar } from 'react-icons/pi'
import { PieChart } from '@mui/x-charts/PieChart';

function Piechart() {
  return (
    <div>
    <div>
        <PiChartBar 
        type='pie'
        width={1349}
        height={550}
        series={[23,43,50,54,65]}
        options={{

            labels:['nmdi','eng','urdu','math']
        }
        }>

        </PiChartBar>
        <PieChart
  series={[
    {
      data: [ 'zafar' ],
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -45,
      endAngle: 225,
      cx: 150,
      cy: 150,
    }
  ]}
/>
    </div>
          
    </div>
  )
}

export default Piechart