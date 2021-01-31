import React, { useRef, useLayoutEffect } from 'react'
import Chart from 'chart.js'

interface PokemonStatsChartProps {
  title: string
  labels: string[] | string[][]
  values: number[]
}

export const CHART_MIN_VALUE = 0

const PokemonStatsChart = ({ title, labels, values }: PokemonStatsChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
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
              suggestedMin: 5,
              suggestedMax: 15
            }
          },
          responsive: false
        },
      })
    }
    return () => {
      if (radioChart) radioChart.destroy()
    }
  }, [])

  return (
    <canvas ref={canvasRef} width="320" height="320" style={{ margin: '0 auto' }} />
  )
}

export default PokemonStatsChart
