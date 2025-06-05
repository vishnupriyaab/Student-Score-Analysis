import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { StudentScore } from '../../core/models/studentScore';

Chart.register(...registerables);

@Component({
  selector: 'app-gender-chart',
  standalone: true,
  imports: [],
  templateUrl: './gender-chart.html',
  styleUrl: './gender-chart.css',
})
export class GenderChart implements OnChanges, AfterViewInit, OnDestroy {
  @Input() studentScore: StudentScore[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private _chart: Chart | null = null;
  private _chartNeedsUpdate = false;

  genderStats = {
    female: {
      count: 0,
      avg: 0,
      min: 0,
      max: 0,
    },
    male: {
      count: 0,
      avg: 0,
      min: 0,
      max: 0,
    },
    '0-20': {
      female: 0,
      male: 0,
      total: 0,
    },
    '21-40': {
      female: 0,
      male: 0,
      total: 0,
    },
  };

  ngOnChanges(changes: SimpleChanges) {
      if (changes['studentScore']) {
      this.calculateGenderStats();
      if (this.chartCanvas) {
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

  private calculateGenderStats() {
    const females = this.studentScore.filter((s) => s.gender === 'F');
    const males = this.studentScore.filter((s) => s.gender === 'M');

    const femaleScores = females.map((s) => s.score);
    const maleScores = males.map((s) => s.score);

    const average = (arr: number[]) =>
      arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

    const female_0_20 = females.filter(
      (s) => s.score >= 0 && s.score <= 20
    ).length;
    const female_21_40 = females.filter(
      (s) => s.score > 20 && s.score <= 40
    ).length;

    const male_0_20 = males.filter((s) => s.score >= 0 && s.score <= 20).length;
    const male_21_40 = males.filter(
      (s) => s.score > 20 && s.score <= 40
    ).length;

    const total_0_20 = female_0_20 + male_0_20;
    const total_21_40 = female_21_40 + male_21_40;

    this.genderStats.female = {
      count: females.length,
      avg: average(femaleScores),
      min: Math.min(...femaleScores),
      max: Math.max(...femaleScores),
    };

    this.genderStats.male = {
      count: males.length,
      avg: average(maleScores),
      min: Math.min(...maleScores),
      max: Math.max(...maleScores),
    };

    this.genderStats['0-20'] = {
      female: female_0_20,
      male: male_0_20,
      total: total_0_20,
    };
    this.genderStats['21-40'] = {
      female: female_21_40,
      male: male_21_40,
      total: total_21_40,
    };
  }

  private createChart(): void {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const data = {
      labels: ['F', 'M', 'Total'],
      datasets: [
        {
          label: 'Female',
          data: [this.genderStats['0-20'].female, this.genderStats['0-20'].male, this.genderStats['0-20'].total],
          backgroundColor: '#8B7DD8',
          borderColor: '#8B7DD8',
          borderWidth: 1,
          barThickness: 60,
        },
        {
          label: 'Male',
          data: [this.genderStats['21-40'].female, this.genderStats['21-40'].male, this.genderStats['21-40'].total],
          backgroundColor: '#6BB6A3',
          borderColor: '#6BB6A3',
          borderWidth: 1,
          barThickness: 60,
        },
      ],
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
              weight: 'normal',
            },
            color: '#374151',
            padding: {
              bottom: 20,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 14,
                weight: 'normal',
              },
              color: '#374151',
            },
          },
          y: {
            beginAtZero: true,
            max: 40,
            ticks: {
              stepSize: 9,
              callback: function (value) {
                if (
                  value === 0 ||
                  value === 9 ||
                  value === 18 ||
                  value === 27 ||
                  value === 36
                ) {
                  return value;
                }
                return '';
              },
              color: '#6B7280',
              font: {
                size: 12,
              },
            },
            grid: {
              color: '#E5E7EB',
              lineWidth: 1,
            },
          },
        },

        layout: {
          padding: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          },
        },
      },
    };

    this._chart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    if (this._chart) {
      this._chart.destroy();
    }
  }
}
