import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { StudentScore } from '../../core/models/studentScore';

Chart.register(...registerables);

@Component({
  selector: 'app-score-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-chart.html',
  styleUrl: './score-chart.css',
})
export class ScoreChart implements OnInit, AfterViewInit {
  @Input() studentScores: StudentScore[] = [];
  @ViewChild('pieChart', { static: false })
  pieChart!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  femaleStndtCount = 0;
  maleStndCount = 0;
  femaleAvrg = 0
  maleAvrg = 0
  
  scoreData = [
    { name: 'Excellent (35-40)', value: 13, color: '#90C695', students: 13 },
    { name: 'Good (30-34)', value: 4, color: '#F4A460', students: 4 },
    { name: 'Average (25-29)', value: 2, color: '#9B87C4', students: 2 },
    { name: 'Below Average (<25)', value: 2, color: '#FF6B35', students: 2 },
  ];

  totalStudents = 0;

ngOnInit() {
  this.totalStudents = this.scoreData.reduce(
    (sum, item) => sum + item.value,
    0
  );
}


  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.pieChart.nativeElement.getContext('2d');

    if (ctx) {
      const config: ChartConfiguration = {
        type: 'pie' as ChartType,
        data: {
          labels: this.scoreData.map((item) => item.name),
          datasets: [
            {
              data: this.scoreData.map((item) => item.value),
              backgroundColor: this.scoreData.map((item) => item.color),
              borderWidth: 2,
              borderColor: '#ffffff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed;
                  const percentage = (
                    (value / this.totalStudents) *
                    100
                  ).toFixed(1);
                  return `${label}: ${value} students (${percentage}%)`;
                },
              },
            },
          },
        },
      };

      this.chart = new Chart(ctx, config);
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
