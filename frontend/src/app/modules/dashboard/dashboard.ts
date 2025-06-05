import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { GenderChart } from "../gender-chart/gender-chart";
import { ScoreChart } from "../score-chart/score-chart";
import { StudentScore } from '../../core/models/studentScore';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [Menu, GenderChart, ScoreChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  
   public studentScoresList: StudentScore[] = [
  {
    name: "Aisha Abdul Ghani",
    gender: "F",
    isNRI: "Y",
    score: 28
  },
  {
    name: "Aisha Magdy Imam Abdelaleem Taha Mohamed",
    gender: "F",
    isNRI: "Y",
    score: 40
  },
  {
    name: "Alma Mohamed Mahmoid Ahmed Abdelhadi",
    gender: "F",
    isNRI: "Y",
    score: 36
  },
  {
    name: "Anora Nazareth",
    gender: "F",
    isNRI: "Y",
    score: 37
  },
  {
    name: "Aya Hatim Mohamed Mahmoud",
    gender: "F",
    isNRI: "Y",
    score: 38
  },
  {
    name: "Bayan Ahmed Mohamed Ahmed",
    gender: "F",
    isNRI: "Y",
    score: 31
  },
  {
    name: "Bissan Ahmad Khaled Al Jukka",
    gender: "F",
    isNRI: "Y",
    score: 38
  },
  {
    name: "Emaan Kamran Kamran Hussain",
    gender: "F",
    isNRI: "N",
    score: 40
  },
  {
    name: "Emel Ezer",
    gender: "F",
    isNRI: "N",
    score: 23
  },
  {
    name: "Gana Elsayed Kamel Mohamed Elsaid",
    gender: "F",
    isNRI: "N",
    score: 26
  },
  {
    name: "Haya Ahmed Mahmoud Elsayed Mahmoud Ibrahim",
    gender: "M",
    isNRI: "N",
    score: 15  // replaced null
  },
  {
    name: "Jana Nashat Esmail Alsaid Elnagar",
    gender: "M",
    isNRI: "N",
    score: 18
  },
  {
    name: "Juman F N Jallad",
    gender: "M",
    isNRI: "N",
    score: 38
  },
  {
    name: "Laila Moamed Ahmed Medhat Fouad",
    gender: "M",
    isNRI: "N",
    score: 7  // replaced null
  },
  {
    name: "Lujain Hussein Mohmmad Shanaha",
    gender: "M",
    isNRI: "N",
    score: 33
  },
  {
    name: "Malk Mhmoud Mostafa Abdelkader Mohamed",
    gender: "M",
    isNRI: "N",
    score: 33
  },
  {
    name: "Mariam M A Alimoor",
    gender: "M",
    isNRI: "N",
    score: 22  // replaced null
  },
  {
    name: "Maryam Ehab Mohamed Mohamed Hamad",
    gender: "M",
    isNRI: "N",
    score: 39
  },
  {
    name: "Maya Mohammad Almasalmeh",
    gender: "F",
    isNRI: "N",
    score: 32
  },
  {
    name: "Meral Ammar Salem Ammar Salem",
    gender: "F",
    isNRI: "N",
    score: 5  // replaced null
  },
  {
    name: "Rahf Ebrahim Qaid Naji Almuntaser",
    gender: "F",
    isNRI: "N",
    score: 38
  },
  {
    name: "Rania Saleem Muhammad Saleem",
    gender: "F",
    isNRI: "N",
    score: 39
  },
  {
    name: "Reem Adeel Ehsan",
    gender: "F",
    isNRI: "N",
    score: 40
  },
  {
    name: "Roaa Waleed Samir Mahmoud Hanafy",
    gender: "F",
    isNRI: "N",
    score: 40
  },
  {
    name: "Shad Ayman Babiker Mohamed Elbasher",
    gender: "F",
    isNRI: "N",
    score: 39
  }
];
}
