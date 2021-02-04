import React, {
  FunctionComponent,
  useRef,
  useLayoutEffect,
} from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Chart from 'chart.js'

interface PokemonStatsChartProps {
  title: string
  labels: string[] | string[][]
  values: number[]
}

const useGraphStyles = makeStyles((theme) => (
  createStyles({
    container: {
      height: 320,
      width: 320,
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        height: 256,
      },
    },
    canvas: {
      width: "100%",
      height: "100%"
    },
  })
));

export const CHART_MIN_VALUE = 0

const PokemonStatsChart: FunctionComponent<PokemonStatsChartProps> = ({
  title,
  labels,
  values
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const classes = useGraphStyles()

  useLayoutEffect(() => {
    const canvasContext = canvasRef?.current?.getContext("2d")
    let radioChart: Chart


    if (canvasContext) {
      radioChart = new Chart(canvasContext, {
        type: 'radar',
        data: {
          labels,
          datasets: [{
            label: title,
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointBackgroundColor: [
              '#ef476f',
              '#ffd166',
              '#06d6a0',
              '#118ab2',
              '#073b4c',
              '#9b5de5'
            ]
          }]
        },
        options: {
          scale: {
            gridLines: {
              color: '#00b4d8'
            },
            angleLines: {
              display: false
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 120,
              stepSize: 30,
            },
            pointLabels: {
              fontSize: 14
            },
          },
          responsive: false,
          tooltips: {
            callbacks: {
              title: (tooltipItem, data) => {
                const defaultIndex = 0
                const selectedIndex = tooltipItem[0].index ?? defaultIndex
                if (selectedIndex !== undefined && selectedIndex >= 0 && data?.labels) {
                  return `${data.labels[selectedIndex]}`
                }
                return ''
              },
            }
          }
        },
      })
    }
    return () => {
      if (radioChart) radioChart.destroy()
    }
  }, [])

  return (
    <div className={classes.container}>
      <canvas
        ref={canvasRef}
        className={classes.canvas}
      />
    </div>
  )
}

export default PokemonStatsChart
