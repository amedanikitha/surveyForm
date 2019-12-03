import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
    const questions = [
          {
            "question_id": 1,
            "question": "You consistently deliver working, tested software every 30 days or less.",
            "option_1": "Agree",
            "option_2": "Disagree",
            "option_3": null,
            "option_4": null,
            "option_5": null,
            "survey": 1,
            "question_type_id": 1
        },
        {
            "question_id": 2,
            "question": "Each release is driven by business need.",
            "option_1": "Agree",
            "option_2": "Disagree",
            "option_3": null,
            "option_4": null,
            "option_5": null,
            "survey": 1,
            "question_type_id": 1
        },
        {
            "question_id": 3,
            "question": "Each Sprint you are continuously improving",
            "option_1": "Agree",
            "option_2": "Disagree",
            "option_3": null,
            "option_4": null,
            "option_5": null,
            "survey": 1,
            "question_type_id": 1
        },
        {
            "question_id": 4,
            "question": "Team is having fun and there is a high energy level.",
            "option_1": "Agree",
            "option_2": "Disagree",
            "option_3": null,
            "option_4": null,
            "option_5": null,
            "survey": 1,
            "question_type_id": 1
        },
        {
            "question_id": 5,
            "question": "Team presents their own work during Sprint Review.",
            "option_1": "Agree",
            "option_2": "Disagree",
            "option_3": null,
            "option_4": null,
            "option_5": null,
            "survey": 1,
            "question_type_id": 1
        },
        {
            "question_id": 6,
            "question": "Can you provide your additional comments?",
            "option_1": null,
            "option_2": null,
            "option_3": null,
            "option_4": null,
            "option_5": null,
            "survey": 1,
            "question_type_id": 2
        },
        {
          "question_id": 7,
          "question": "Team is having fun and there is a high energy level.",
          "option_1": "Agree",
          "option_2": "Disagree",
          "option_3": null,
          "option_4": null,
          "option_5": null,
          "survey": 1,
          "question_type_id": 3
      },
      {
          "question_id": 8,
          "question": "Team presents their own work during Sprint Review.",
          "option_1": "Agree",
          "option_2": "Disagree",
          "option_3": null,
          "option_4": null,
          "option_5": null,
          "survey": 1,
          "question_type_id": 1
      }
    ];
    const chartData = {
        "Ad-hoc Agile": 10,
        "Doing Agile": 20,
        "Being Agile": 15,
        "Thinking Agile": 15,
        "Culturally Agile": 40
    }
    return {questions, chartData};
  }

  constructor() { }

}
