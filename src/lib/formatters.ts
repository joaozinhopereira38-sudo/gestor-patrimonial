export function formatObjective(objective?: string) {
    switch (objective) {
      case "organizar_patrimonio":
        return "Organização Patrimonial";
  
      case "renda_passiva":
        return "Renda Passiva";
  
      case "crescimento":
        return "Crescimento Patrimonial";
  
      case "independencia":
        return "Independência Financeira";
  
      default:
        return "Não definido";
    }
  }
  
  export function formatProfile(profile?: string) {
    switch (profile) {
      case "Conservador":
        return "Perfil Conservador";
  
      case "Moderado":
        return "Perfil Moderado";
  
      case "Arrojado":
        return "Perfil Arrojado";
  
      default:
        return "Perfil não identificado";
    }
  }