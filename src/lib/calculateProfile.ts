type CalculateProfileProps = {
  objective: string;
  riskProfile: string;
  timeHorizon: string;
  incomeRange: string;
  emergencyReserve: string;
  investmentExperience: string;
  netWorthRange: string;
  incomeStability: string;
};

export function calculateProfile({
  objective,
  riskProfile,
  timeHorizon,
  incomeRange,
  emergencyReserve,
  investmentExperience,
  netWorthRange,
  incomeStability,
}: CalculateProfileProps) {
  let score = 0;

  const explanations: string[] = [];

  if (objective === "crescimento") {
    score += 30;
    explanations.push(
      "Objetivo focado em crescimento patrimonial"
    );
  }

  if (objective === "independencia") {
    score += 40;
    explanations.push(
      "Busca independência financeira"
    );
  }

  if (objective === "renda_passiva") {
    score += 20;
    explanations.push(
      "Busca geração de renda passiva"
    );
  }

  if (riskProfile === "moderado") {
    score += 20;
    explanations.push(
      "Aceita risco moderado"
    );
  }

  if (riskProfile === "arrojado") {
    score += 40;
    explanations.push(
      "Aceita alta volatilidade"
    );
  }

  if (timeHorizon === "medio") {
    score += 15;
    explanations.push(
      "Possui horizonte de médio prazo"
    );
  }

  if (timeHorizon === "longo") {
    score += 30;
    explanations.push(
      "Possui horizonte de longo prazo"
    );
  }

  if (incomeRange === "10k_30k") {
    score += 10;
    explanations.push(
      "Possui renda mensal elevada"
    );
  }

  if (incomeRange === "30k_plus") {
    score += 20;
    explanations.push(
      "Possui alta capacidade financeira"
    );
  }

  if (emergencyReserve === "nenhuma") {
    score -= 30;
    explanations.push(
      "Ainda não possui reserva de emergência"
    );
  }

  if (emergencyReserve === "ate_3_meses") {
    score -= 10;
    explanations.push(
      "Reserva ainda abaixo do ideal"
    );
  }

  if (emergencyReserve === "3_a_6_meses") {
    score += 10;
    explanations.push(
      "Possui reserva equilibrada"
    );
  }

  if (emergencyReserve === "mais_6_meses") {
    score += 20;
    explanations.push(
      "Possui reserva sólida"
    );
  }

  if (investmentExperience === "iniciante") {
    score -= 10;
    explanations.push(
      "Ainda possui pouca experiência em investimentos"
    );
  }

  if (investmentExperience === "intermediario") {
    score += 10;
    explanations.push(
      "Possui experiência intermediária"
    );
  }

  if (investmentExperience === "avancado") {
    score += 20;
    explanations.push(
      "Possui experiência avançada"
    );
  }

  if (netWorthRange === "100k_500k") {
    score += 10;
    explanations.push(
      "Possui patrimônio relevante"
    );
  }

  if (netWorthRange === "500k_plus") {
    score += 20;
    explanations.push(
      "Possui patrimônio elevado"
    );
  }

  if (incomeStability === "instavel") {
    score -= 20;
    explanations.push(
      "Possui renda instável"
    );
  }

  if (incomeStability === "moderada") {
    score += 5;
    explanations.push(
      "Possui estabilidade moderada de renda"
    );
  }

  if (incomeStability === "estavel") {
    score += 15;
    explanations.push(
      "Possui renda estável"
    );
  }

  let profile = "Conservador";

  if (score > 30 && score <= 70) {
    profile = "Moderado";
  }

  if (score > 70) {
    profile = "Arrojado";
  }

  return {
    profile,
    score,
    explanations,
  };
}