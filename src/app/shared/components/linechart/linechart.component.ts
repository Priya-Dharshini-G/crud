import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent {
  @Input() xaxis!: any[];
  @Input() yaxis!: any[];
  @Input() labelsDef!: any;
  @Input() canvaID!: any;
  mychart!: any;
  chartChoice = [{ value: "pie", Label: "Pie" }, { value: "bar", Label: "Bar" }, { value: "line", Label: "Line" }, { value: "doughnut", Label: "doughnut" }];
  chart_type = "line";
  // ngOnInit() {
  //   this.getChart(this.canvaID, this.chart_type);
  // }

  ngAfterViewInit() {
    if (this.yaxis && this.xaxis) {
      this.getChart(this.canvaID, this.chart_type);
    }
  }

  getChart(canvasID: any, type: any) {
    if (this.mychart) {
      this.mychart.destroy();
    }
    this.mychart = new Chart(canvasID, {
      type: type,
      data: {
        labels: this.xaxis,
        datasets: [{
          data: this.yaxis,
          label: this.labelsDef.label,
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: this.labelsDef.text,
            color: 'black'
          }
        }
      }
    });
    this.mychart.update();
  }
  onSelectChart(event: any) {
    this.chart_type = event.value;
    this.getChart(this.canvaID, this.chart_type);
  }
}
