export function generatePortfolio(profile?: string) {
    if (profile === "Conservador") {
      return [
        {
          name: "Renda Fixa",
          percentage: 70,
        },
        {
          name: "Fundos Imobiliários",
          percentage: 15,
        },
        {
          name: "Ações",
          percentage: 10,
        },
        {
          name: "Internacional",
          percentage: 5,
        },
      ];
    }
  
    if (profile === "Moderado") {
      return [
        {
          name: "Renda Fixa",
          percentage: 40,
        },
        {
          name: "Fundos Imobiliários",
          percentage: 20,
        },
        {
          name: "Ações",
          percentage: 30,
        },
        {
          name: "Internacional",
          percentage: 10,
        },
      ];
    }
  
    return [
      {
        name: "Renda Fixa",
        percentage: 20,
      },
      {
        name: "Fundos Imobiliários",
        percentage: 15,
      },
      {
        name: "Ações",
        percentage: 50,
      },
      {
        name: "Internacional",
        percentage: 15,
      },
    ];
  }