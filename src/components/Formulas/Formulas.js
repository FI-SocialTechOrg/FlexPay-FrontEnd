// De Tasa Nominal a Tasa Efectiva
// Leyenda:
// PTN = Plaza de Tasa Nominal      Ejem: 30, 60, 90, 180, 360
// TN = Tasa Nominal                Ejem: 10, 20, 30, 40, 50
// PC = Periodo de Capitalización   Ejem: 30, 60, 90, 180, 360
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
function nominalAEfectiva(PTN, TN, PC, PTE) {
    return (1+((TN/100)/(PTN/PC)))**(PTN/PTE)-1; // Retorna en decimal la tasa efectiva
}

// Valor Futuro con Tasa Efectiva
// Leyenda:
// VP = Valor Presente              Ejem: 1000, 2000, 3000, 4000, 5000
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
// TE = Tasa Efectiva               Ejem: 10, 20, 30, 40, 50
// T = Tiempo en dias               Ejem: 30, 60, 90, 180, 360
function valorFuturoTE(VP, PTE, TE, T) {
    return VP*(1+(TE/100))**(T/PTE);
}

// Valor Futuro con Tasa Nominal
// Leyenda:
// PTN = Plaza de Tasa Nominal      Ejem: 30, 60, 90, 180, 360
// TN = Tasa Nominal                Ejem: 10, 20, 30, 40, 50
// PC = Periodo de Capitalización   Ejem: 30, 60, 90, 180, 360
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
// VP = Valor Presente
// T = Tiempo en dias
function valorFuturoTN(PTN, TN, PC, PTE, VP, T) {
    var TE = nominalAEfectiva(PTN, TN, PC, PTE);
    return VP*(1+TE)**(T/PTE);
}

// Anualidad o Cuota Vencida, conociendo el Valor Presente

// Con Tasa Nominal

// Con Tasa Efectiva
// Leyenda:
// VP = Valor Presente              Ejem: 1000, 2000, 3000, 4000, 5000
// CI = Cuota Inicial               Ejem: 100, 200, 300, 400, 500
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
// TE = Tasa Efectiva               Ejem: 10, 20, 30, 40, 50
// N = Numero de Cuotas             Ejem: 1, 2, 3, 4, 5
// F = Frecuencia de Pago           Ejem: 30, 60, 90, 180, 360
function anualidadVVPTE(VP, CI, PTE, TE, N, F) {
    var TErF = (1+(TE/100))**(F/PTE)-1;
    return (VP-CI)*(TErF/(1-(1+TErF)**-N));
}