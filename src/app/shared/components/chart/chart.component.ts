import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef; // Use ! assertion modifier


  private chart!: Chart; // Use ! assertion modifier

  constructor() { }

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    const ctx = this.chartCanvas.nativeElement;
    this.chart = new Chart(ctx, {
      type: 'bar', // Change the chart type as needed
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
        datasets: [
          {
            label: 'Sample Data',
            data: [10, 20, 15, 25], // Replace with your data
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Change colors as needed
            borderColor: 'rgba(75, 192, 192, 1)', // Change colors as needed
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
