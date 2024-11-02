import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { StatisticService } from '../Service/statistic.service';

@Component({
  selector: 'app-stat-compo',
  templateUrl: './stat-compo.component.html',
  styleUrls: ['./stat-compo.component.css']
})
export class StatCompoComponent implements OnInit {
  apiCounts: { structureName: string, apiCount: number }[] = [];
  userCounts: { structureName: string, userCount: number }[] = [];
  demandeCounts: { userName: string, userCount: number }[] = []; // Changed key name to userCount

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.ApiStructureChart();
    this.UserStructureChart();
    this.DemandeStructureChart();
  }

  UserStructureChart() {
    this.statisticService.getUserStatistics().subscribe(data => {
      console.log('User Statistics Data:', data);
      this.userCounts = Object.entries(data).map(([structureName, userCount]) => ({ structureName, userCount: Number(userCount) }));
      this.renderPieChart();
    }, error => {
      console.error('Error fetching user statistics:', error);
    });
  }

  DemandeStructureChart() {
    this.statisticService.getDemandeStatistics().subscribe(data => {
      console.log('Données des statitiques demande :', data);
      this.demandeCounts = Object.entries(data).map(([userName, userCount]) => ({ userName, userCount: Number(userCount) })); // Changed key name to userCount
      this.renderDonutChart(); // Call the correct function to render the donut chart
    }, error => {
      console.error('Error fetching demande statistics:', error);
    });
  }

  ApiStructureChart() {
    this.statisticService.getApiStatistics().subscribe(data => {
      console.log('API Statistics Data:', data);
      this.apiCounts = Object.entries(data).map(([structureName, apiCount]) => ({ structureName, apiCount: Number(apiCount) }));
      this.renderBarChart();
    }, error => {
      console.error('Error fetching API statistics:', error);
    });
  }

  renderPieChart() {
    const categories = this.userCounts.map(item => item.structureName);
    const data = this.userCounts.map(item => item.userCount);

    const options = {
      series: data,
      chart: {
        height: 350,
        type: 'pie',
      },
      labels: categories,
      title: {
        text: '',
        align: 'center'
      },
      dataLabels: {
        enabled: true
      },
    };

    const chart = new ApexCharts(document.querySelector("#userChart"), options);
    chart.render();
  }

  renderBarChart() {
    const categories = this.apiCounts.map(item => item.structureName);
    const data = this.apiCounts.map(item => item.apiCount);

    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#F33FFF', '#FF33A1', '#33FFA1', '#A133FF',
      '#FFA133', '#33A1FF', '#A1FF33', '#FF5733', '#33FF57'
    ];

    const options = {
      series: [{
        name: 'API Count',
        data: data
      }],
      chart: {
        height: 350,
        type: 'bar',
      },
      colors: colors,
      xaxis: {
        categories: categories,
      },
      title: {
        text: '',
        align: 'left'
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        bar: {
          distributed: true, // This will make each bar a different color
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  renderDonutChart() {
    const categories = this.demandeCounts.map(item => item.userName);
    const data = this.demandeCounts.map(item => item.userCount);

    const options = {
      series: data,
      chart: {
        height: 350,
        type: 'donut',
      },
      labels: categories,
      title: {
        text: '',
        align: 'left'
      },
      dataLabels: {
        enabled: true
      },
      colors: ['#FF5733', '#33FF57', '#3357FF', '#F33FFF', '#FF33A1', '#33FFA1', '#A133FF']
    };

    const chart = new ApexCharts(document.querySelector("#demandeChart"), options);
    chart.render();
  }
}
