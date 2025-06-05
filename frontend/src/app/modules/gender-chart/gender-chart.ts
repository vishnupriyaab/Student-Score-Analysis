import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-gender-chart',
  standalone: true,
  imports: [],
  templateUrl: './gender-chart.html',
  styleUrl: './gender-chart.css'
})
export class GenderChart implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const data = {
      labels: ['F', 'M'],
      datasets: [
        {
          label: 'Count',
          data: [36, 32],
          backgroundColor: '#8B7DD8', 
          borderColor: '#8B7DD8',
          borderWidth: 1,
          barThickness: 60
        },
        {
          label: 'Average Score',
          data: [16, 5],
          backgroundColor: '#6BB6A3', 
          borderColor: '#6BB6A3',
          borderWidth: 1,
          barThickness: 60
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Performance by Gender',
            font: {
              size: 16,
              weight: 'normal'
            },
            color: '#374151',
            padding: {
              bottom: 20
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14,
                weight: 'normal'
              },
              color: '#374151'
            }
          },
          y: {
            beginAtZero: true,
            max: 40,
            ticks: {
              stepSize: 9,
              callback: function(value) {
                if (value === 0 || value === 9 || value === 18 || value === 27 || value === 36) {
                  return value;
                }
                return '';
              },
              color: '#6B7280',
              font: {
                size: 12
              }
            },
            grid: {
              color: '#E5E7EB',
              lineWidth: 1
            }
          }
        },
        
        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}