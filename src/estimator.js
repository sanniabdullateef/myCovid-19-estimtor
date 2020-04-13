// Default Configuration given below for input 
/ eslint-disable max-len /
/ eslint-disable no-unused-vars /
/ eslint-disable no-undef /
const input = {
        region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
        },

        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
};
const covid19ImpactEstimator = (data) => {
    const data = input;
const { reportedCases, periodType, totalHospitalBeds} = data;
let {timeToElapse} = data;
const {avgDailyIncomeInUSD, avgDailyIncomePopulation} = data.region;

const currentlyInfected = reportedCases * 10;
const severeCurrentlyInfected = reportedCases * 50;

if(periodType === "weeks"){
    timeToElapse *=7;
} else if (periodType === "months"){
    timeToElapse *=30;
};

// Cases for Impact of covid-19 Estimator Calculations

const infectionsByRequestedTime = severeCurrentlyInfected (2 * (Math.trunc(timeToElapse / 3)));
const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
const hospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - severeCasesByRequestedTime);
const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
const dollarsInFlight = Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);

// Cases for severeImpact of covid-19 Estimator Calculations

const severeInfectionsByRequestedTime = severeCurrentlyInfected (2 * (Math.trunc(timeToElapse / 3)));
const severeSevereCasesByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.15);
const severeHospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - severeCasesByRequestedTime);
const severeCasesForICUByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.05);
const severeCasesForVentilatorsByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.02);
const severeDollarsInFlight = Math.trunc((severeInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);
           
           return {
            data,
            impact: {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByRequestedTime,
            casesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime,
            dollarsInFlight
        },

        severeImpact: {
            currentlyInfected: severeCurrentlyInfected,
            infectionsByRequestedTime: severeInfectionsByRequestedTime,
            casesByRequestedTime: severeSevereCasesByRequestedTime,
            hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
            casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime: severeCasesForVentilatorsByRequestedTime,
            dollarsInFlight: severeDollarsInFlight
        } 
  };
};

export default covid19ImpactEstimator;