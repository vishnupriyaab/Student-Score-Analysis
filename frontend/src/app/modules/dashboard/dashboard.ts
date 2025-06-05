import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { GenderChart } from '../gender-chart/gender-chart';
import { ScoreChart } from '../score-chart/score-chart';
import { StudentScore } from '../../core/models/studentScore';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Menu, GenderChart, ScoreChart, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  public studentScoresList: StudentScore[] = [];
  public fileUploaded = false;
  public isLoading = false;
  public errorMessage: string | null = null;

  constructor(private _cdRef:ChangeDetectorRef){}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  preventDefault(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private handleFile(file: File): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      this.errorMessage = 'Please upload a CSV or Excel file.';
      this.isLoading = false;
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as ArrayBuffer | string;
        if (fileExtension === '.csv') {
          this.parseCSV(content as string);
        } else {
          this.parseExcel(content as ArrayBuffer);
        }
        this.fileUploaded = true;
        this._cdRef.detectChanges();
      } catch (error) {
        this.errorMessage = 'Error processing file. Please try again.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    };

    reader.onerror = () => {
      this.errorMessage = 'Error reading file.';
      this.isLoading = false;
    };
    
    if (fileExtension === '.csv') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  private parseExcel(data: ArrayBuffer): void {
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    if (jsonData.length < 1) {
      throw new Error('Empty Excel file');
    }

    const headers = jsonData[0].map(header => header?.toString().trim());
    const expectedHeaders = ['Name', 'Gender  (M/F)', 'Is NRI (Y/N)', 'Score  (40 Marks)'];
    
    if (!expectedHeaders.every(header => headers.includes(header))) {
      throw new Error('Invalid Excel format. Please use the correct column headers.');
    }

    this.processStudentData(jsonData.slice(1), headers);
  }

  private parseCSV(csvContent: string): void {
    const lines = csvContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 1) {
      throw new Error('Empty CSV file');
    }

    const headers = lines[0].split(',').map(header => header.trim());
    const expectedHeaders = ['Name', 'Gender  (M/F)', 'Is NRI (Y/N)', 'Score  (40 Marks)'];
    
    if (!expectedHeaders.every(header => headers.includes(header))) {
      throw new Error('Invalid CSV format. Please use the correct column headers.');
    }

    const rows = lines.slice(1).map(line => this.splitCSVLine(line));
    this.processStudentData(rows, headers);
  }

  private processStudentData(rows: any[][], headers: string[]): void {
    const nameIndex = headers.indexOf('Name');
    const genderIndex = headers.indexOf('Gender  (M/F)');
    const nriIndex = headers.indexOf('Is NRI (Y/N)');
    const scoreIndex = headers.indexOf('Score  (40 Marks)');

    const newStudentScores: StudentScore[] = [];
    const nameSet = new Set<string>();

    for (const row of rows) {
      if (!row || row.length < 4) continue;

      const name = row[nameIndex]?.toString().trim();
      if (!name || nameSet.has(name)) continue;
      nameSet.add(name);

      const gender = row[genderIndex]?.toString().trim().toUpperCase();
      const isNRI = row[nriIndex]?.toString().trim().toUpperCase();
      let score = row[scoreIndex];

      if (gender !== 'M' && gender !== 'F') continue;
      if (isNRI !== 'Y' && isNRI !== 'N') continue;

      const parsedScore = score === '' || score === undefined || score === null ?
        Math.floor(Math.random() * 40) + 1 :
        typeof score === 'number' ? score : parseInt(score.toString(), 10);

      if (isNaN(parsedScore)) continue;

      newStudentScores.push({
        name,
        gender: gender as 'M' | 'F',
        isNRI: isNRI as 'Y' | 'N',
        score: parsedScore
      });
    }

    if (newStudentScores.length === 0) {
      throw new Error('No valid student data found in the file');
    }

    this.studentScoresList = newStudentScores;
  }

  private splitCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }
}
