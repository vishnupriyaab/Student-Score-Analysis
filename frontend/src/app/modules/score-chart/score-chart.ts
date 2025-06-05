import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { ScoreStatItem, StudentScore } from '../../core/models/studentScore';

Chart.register(...registerables);

@Component({
  selector: 'app-score-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-chart.html',
  styleUrl: './score-chart.css',
})
export class ScoreChart implements OnChanges, AfterViewInit, OnDestroy {
  @Input() studentScores: StudentScore[] = [];
  @ViewChild('pieChart', { static: false })
  pieChart!: ElementRef<HTMLCanvasElement>;

  private _chart: Chart | null = null;
  private _chartNeedsUpdate = false;

  totalStudents = 0;

  scoreStats: ScoreStatItem[] = [
    {
      name: 'Excellent',
      range: '35-40',
      count: 0,
      color: '#90C695',
    },
    {
      name: 'Good',
      range: '30-34',
      count: 0,
      color: '#F4A460',
    },
    {
      name: 'Average',
      range: '25-29',
      count: 0,
      color: '#9B87C4',
    },
    {
      name: 'Below Average',
      range: '<25',
      count: 0,
      color: '#FF6B35',
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentScores']) {
      this.calculateScoreStats();
      if (this.pieChart) {
        this.createChart();
      } else {
        this._chartNeedsUpdate = true;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this._chartNeedsUpdate) {
      this.createChart();
      this._chartNeedsUpdate = false;
    }
  }

  private calculateScoreStats() {
    this.scoreStats.forEach((stat) => (stat.count = 0));
    this.totalStudents = this.studentScores?.length;

    if (!this.studentScores || this.totalStudents === 0) return;

    this.studentScores.forEach((student) => {
      const score = student.score;
      if (score >= 35) {
        this.scoreStats[0].count++;
      } else if (score >= 30) {
        this.scoreStats[1].count++;
      } else if (score >= 25) {
        this.scoreStats[2].count++;
      } else {
        this.scoreStats[3].count++;
      }
    });
  }

  private createChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
    const ctx = this.pieChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: this.scoreStats.map((stat) => `${stat.name} (${stat.range})`),
        datasets: [
          {
            data: this.scoreStats.map((stat) => stat.count),
            backgroundColor: this.scoreStats.map((stat) => stat.color),
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
                const percentage = ((value / this.totalStudents) * 100).toFixed(
                  1
                );
                return `${label}: ${value} students (${percentage}%)`;
              },
            },
          },
        },
      },
    };

    this._chart = new Chart(ctx, config);
  }

  ngOnDestroy() {
    if (this._chart) {
      this._chart.destroy();
    }
  }
}
