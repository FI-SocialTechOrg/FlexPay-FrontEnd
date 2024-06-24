// De Tasa Nominal a Tasa Efectiva
// Leyenda:
// PTN = Plaza de Tasa Nominal      Ejem: 30, 60, 90, 180, 360
// TN = Tasa Nominal                Ejem: 10, 20, 30, 40, 50
// PC = Periodo de Capitalización   Ejem: 30, 60, 90, 180, 360
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
function nominalaEfectiva(PTN, TN, PC, PTE) {
    return (1+((TN/100)/(PTN/PC)))**(PTN/PTE)-1; // Retorna en decimal la tasa efectiva
}

// Valor Futuro con Tasa Nominal
// Leyenda:
// PTN = Plaza de Tasa Nominal      Ejem: 30, 60, 90, 180, 360
// TN = Tasa Nominal                Ejem: 10, 20, 30, 40, 50
// PC = Periodo de Capitalización   Ejem: 30, 60, 90, 180, 360
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
// VP = Valor Presente
// T = Tiempo en dias
function valorFuturoTsNl(PTN, TN, PC, PTE, VP, T) {
    var TE = nominalaEfectiva(PTN, TN, PC, PTE);
    return VP*(1+TE)**(T/PTE);
}

// Valor Futuro con Tasa Efectiva
// Leyenda:
// VP = Valor Presente              Ejem: 1000, 2000, 3000, 4000, 5000
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
// TE = Tasa Efectiva               Ejem: 10, 20, 30, 40, 50
// T = Tiempo en dias               Ejem: 30, 60, 90, 180, 360
function valorFuturoTsEf(VP, PTE, TE, T) {
    return VP*(1+(TE/100))**(T/PTE);
}

// Anualidad o Cuota Vencida, conociendo el Valor Presente con Periodo de Gracia Total
// Con Tasa Nominal
// Leyenda:
// PTN = Plaza de Tasa Nominal      Ejem: 30, 60, 90, 180, 360
// TN = Tasa Nominal                Ejem: 10, 20, 30, 40, 50
// PC = Periodo de Capitalización   Ejem: 30, 60, 90, 180, 360
// VP = Valor Presente              Ejem: 1000, 2000, 3000, 4000, 5000
// CI = Cuota Inicial               Ejem: 100, 200, 300, 400, 500
// PTE = Plazo de Tasa Efectiva     Ejem: 30, 60, 90, 180, 360
// N = Numero de Cuotas             Ejem: 1, 2, 3, 4, 5
// F = Frecuencia de Pago           Ejem: 30, 60, 90, 180, 360
// PGT = Periodo de Gracia Total    Ejem: 30, 60, 90, 180, 360
// TErF = Tasa Efectiva por Frecuencia
// MaF = Monto a Financiar
// MF = Monto Futuro
function anualidadVcVlPteGT(PTN, TN, PC, VP, CI, PTE, N, F, PGT) {
    var TE = nominalaEfectiva(PTN, TN, PC, PTE);
    var TErF = (1+(TE/100))**(F/PTE)-1;
    var MaF = VP-CI;
    if (PGT === 0) {
        return MaF*(TErF/(1-(1+TErF)**-N));
    } else {
        var MF = MaF*(1+TErF)**(PGT/F);
        return MF*(TErF/(1-(1+TErF)**-(N-PGT/F)));
    }
}

// Anualidad o Cuota Vencida, conociendo el Valor Presente con Periodo de Gracia Total
// Con Tasa Efectiva
// Leyenda:
// TE = Tasa Efectiva               Ejem: 0.1, 0.2, 0.3, 0.4, 0.5 (10%, 20%, 30%, 40%, 50%)
// PTE = Plazo de Tasa Efectiva      Ejem: 30, 60, 90, 180, 360
// VP = Valor Presente              Ejem: 1000, 2000, 3000, 4000, 5000
// CI = Cuota Inicial               Ejem: 100, 200, 300, 400, 500
// N = Numero de Cuotas             Ejem: 1, 2, 3, 4, 5
// F = Frecuencia de Pago           Ejem: 30, 60, 90, 180, 360
// PGT = Periodo de Gracia Total    Ejem: 30, 60, 90, 180, 360
// MaF = Monto a Financiar
// MF = Monto Futuro

function anualidadVcVlPteGTEfectiva(TE, VP, CI, PTE, N, F, PGT){
    var TErF = (1+(TE/100))**(F/PTE)-1;
    var MaF = VP-CI;
    if (PGT === 0) {
        return MaF*(TErF/(1-(1+TErF)**-N));
    } else {
        var MF = MaF*(1+TErF)**(PGT/F);
        return MF*(TErF/(1-(1+TErF)**-(N-PGT/F)));
    }
}

// Valor entregado con Mora
// Leyenda:
// VEsM = Valor Entregado sin Mora
// Im = Interes Moratorio (En porcentaje)
// TIm = Tipo de Interes Moratorio (Nominal o Efectivo)
// PIm = Periodo de Interes Moratorio (En dias)
// Ic = Interes Compensatorio (En porcentaje)
// TIC = Tipo de Interes Compensatorio (Nominal o Efectivo)
// PIc = Periodo de Interes Compensatorio (En dias)
// Tr = Tiempo de Retraso (En dias)
function valorEntregadoConMora(VEsM, Im, TIm, PIm, Ic, TIC, PIc, Tr){
    if (TIm === 0) {
        Im = nominalaEfectiva(PIm, Im, 360, 360);
    } else if (TIm === 1){
        Im = (1+Im/100)**(360/PIm)-1;
    }
    if (TIC === 0) {
        Ic = nominalaEfectiva(PIc, Ic, 360, 360);
    } else if (TIC === 1){
        Ic = (1+Ic/100)**(360/PIc)-1;
    }
    return VEsM+(VEsM*((1+Im)**(Tr/360))-1)+(VEsM*((1+Ic)**(Tr/360))-1);
}

// Pago adelantado de una sola cuota
// Leyenda:
// CP = Cuota a Pagar
// T = Tiempo en dias
// I = Interes (En porcentaje)
// TI = Tipo de Interes (Nominal o Efectivo)
// PI = Periodo de Interes (En dias)
// PC = Periodo de Capitalizacion (En caso de ser Nominal)
// N = Numero de la Cuota(En este caso es 1)
function pagoAdelantadoUnicaCuota(CP, T, I, TI, PI, PC, N) {
    if (TI === 0) {
        I = nominalaEfectiva(PI, I, PC, T);
    } else if (TI === 1){
        I = (1+I/100)**(T/PI)-1;
    }
    return CP/(1+I)^N;
}

// Pago adelantado de varias cuotas
// Leyenda:
// CP = Cuota a Pagar
// T = Tiempo en dias
// I = Interes (En porcentaje)
// TI = Tipo de Interes (Nominal o Efectivo)
// PI = Periodo de Interes (En dias)
// PC = Periodo de Capitalizacion (En caso de ser Nominal)
// N = Numeros de Cuotas
function pagoAdelantadoVariasCuotas(CP, T, I, TI, PI, PC, N) {
    var total = 0;
    if (TI === 0) {
        I = nominalaEfectiva(PI, I, PC, T);
    } else if (TI === 1){
        I = (1+I/100)**(T/PI)-1;
    }
    for (var i = 1; i <= N; i++) {
        total += CP / (1 + I)**i;
    }
    return total;
}

export { nominalaEfectiva, valorFuturoTsNl, valorFuturoTsEf, anualidadVcVlPteGT,  anualidadVcVlPteGTEfectiva, valorEntregadoConMora, pagoAdelantadoUnicaCuota, pagoAdelantadoVariasCuotas };