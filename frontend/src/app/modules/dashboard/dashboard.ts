import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { GenderChart } from "../gender-chart/gender-chart";
import { ScoreChart } from "../score-chart/score-chart";

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [Menu, GenderChart, ScoreChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
