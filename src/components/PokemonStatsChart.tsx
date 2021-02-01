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
    <canvas ref={canvasRef} width="320" height="320" style={{ margin: '0 auto' }} />
  )
}

export default PokemonStatsChart
